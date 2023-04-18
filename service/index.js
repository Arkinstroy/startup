const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

const stocksKey = process.env.STOCKSKEY;
const newsKey = process.env.NEWSKEY;


apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});


const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});


app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

// get stock data
secureApiRouter.post('/stocks', async (req, res) => {
    const url = `https://api.stockdata.org/v1/data/eod?symbols=${req.body.inputVal}&api_token=${stocksKey}&date_from=${req.body.fullDate}&sort=asc`;
    await fetch(url).then((response) => response.json()).then((data) => {
        res.send(data);
    })
});

// get news articles
secureApiRouter.post('/news', async (req, res) => {
    const url = `https://newsapi.org/v2/top-headlines?q=${req.body.company}&apiKey=${newsKey}`;
    await fetch(url).then((response) => response.json()).then((data) => {
        res.send(data);
    })
});

// get saved articles
secureApiRouter.get('/saved', async (req, res) => {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);

    if (user.email) {
        const saved = await DB.getSavedArticles(user.email);
        if (saved) {
            res.send(saved);
            return;
        }
    }
    res.send({msg: 'no articles'});
});

secureApiRouter.post('/save', async (req, res) => {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);

    if (user.email) {
        await DB.saveArticle(user.email, req.body.title, req.body.url, req.body.urlToImage);
    }
    res.status(200).send({msg: 'success'});
});

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);
