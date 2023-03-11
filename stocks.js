const stocksKey = 'gVH10UbR6Q3kn0NggzIzTgdRTrqnj813rn8esH3P';
const newsKey = '5d4b40303f5f4890ad16cd2df1bb4cbb';

let gridElements = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

async function fetchStock() {
    const input = document.getElementById('stockSearch');
    const stockGrid = document.getElementById('stockGrid');
    const symbol = input.value;

    let companyName = null;

    const colors = [
        'blue',
        'teal',
        'green',
        'yellow',
        'orange',
        'red',
        'purple',
    ]
    

    await fetch(`https://api.stockdata.org/v1/data/eod?symbols=${symbol}&api_token=${stocksKey}&date_from=2022`)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.data && data.data.length === 0) {
                document.getElementById('companyTicker').innerHTML = 'Cannot find ticker symbol';
                document.getElementById('companyName').innerHTML = '';
                return;
            }
            if (!data || !data.data) {
                document.getElementById('companyTicker').innerHTML = 'Cannot find ticker symbol';
                document.getElementById('companyName').innerHTML = '';
                return;
            }
            gridElements.forEach(element => {
                element.remove();
            })

            document.getElementById('companyTicker').innerHTML = data.meta.ticker;
            document.getElementById('companyName').innerHTML = `(${data.meta.name})`;

            companyName = data.meta.name;

            drawGrid(data.data.map(day => day.close));

        })
        .catch(error => {
            console.log(error);
        });
    
    if (companyName) {
        //await fetchNews('Apple');
    }
}

function drawGrid(points, ...adtlPoints) {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 600);

    let max = 0;
    points.forEach(point => {
        if (point > max) {
            max = point;
        }
    });
    if (adtlPoints) {
        adtlPoints.forEach(dataSet => {
            dataSet.forEach(point => {
                if (point > max) {
                    max = point;
                }
            })
        })
    }
    const modifier = 550 / max;

    drawPath(points, modifier);

    if (adtlPoints) {
        adtlPoints.forEach((dataSet, index) => {
            drawPath(dataSet, modifier, colors[index % colors.length]);
        })
    }
}

function drawPath(points, modifier, color = 'black') {
    const interval = 800 / points.length;
    
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, 600 - points[0] * modifier);
    for (let i = 1; i < points.length; i++) {
        ctx.lineTo(i * interval, 600 - (points[i] * modifier));
    }
    ctx.stroke();
}




async function fetchNews(company) {
    const newsData = document.getElementById('newsData');

    fetch(`https://newsapi.org/v2/top-headlines?q=${company}&apiKey=${newsKey}`)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.status === "ok"
                && Array.isArray(data.articles) && data.articles.length > 0) {
                    data.articles.forEach(article => {
                        const container = document.createElement('div');
                        newsData.appendChild(container);

                        const titleLink = document.createElement('a');
                        titleLink.innerHTML = article.title;
                        titleLink.href = article.url;
                        container.appendChild(titleLink);
                        const image = document.createElement('img');
                        image.src = article.urlToImage;
                        container.appendChild(image);
                    })
            }
        });
}