const stocksKey = 'gVH10UbR6Q3kn0NggzIzTgdRTrqnj813rn8esH3P';
const newsKey = '5d4b40303f5f4890ad16cd2df1bb4cbb';

let gridElements = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colors = [
    'purple',
    'teal',
    'green',
    'yellow',
    'orange',
    'red',
    'pink',
]

let symbol = null;

async function fetchStock(time = 0) {
    const input = document.getElementById('stockSearch');
    const stockGrid = document.getElementById('stockGrid');
    symbol = input.value;

    let companyName = null;

    

    const today = new Date();
    const yyyy = today.getFullYear();
    const mmNum = today.getMonth() + 1;
    const ddNum = today.getDate();

    let mm = mmNum;
    let dd = ddNum;

    if (mmNum < 10) mm = '0' + mmNum;
    if (ddNum < 10) dd = '0' + ddNum;

    let fullDate = (yyyy - 1) + '-' + mm + '-' + dd;

    switch (time) {
        case 1:
            if (mm > 6) {
                let newMM = (mmNum - 6)
                if (newMM < 10) mm = '0' + newMM;
                fullDate = yyyy + '-' + mm + '-' + dd;
            } else {
                let newMM = (mmNum + 6)
                if (newMM < 10) mm = '0' + newMM;
                fullDate = (yyyy - 1) + '-' + mm + '-' + dd;
            }
            break;
        case 2:
            fullDate = yyyy;
            break;
        case 3:
            fullDate = (yyyy - 2) + '-' + mm + '-' + dd;
            break;
        case 4:
            fullDate = (yyyy - 5) + '-' + mm + '-' + dd;
            break;
        default:
            fullDate = (yyyy - 1) + '-' + mm + '-' + dd;
            break;
    }

     
    

    await fetch(`https://api.stockdata.org/v1/data/eod?symbols=${symbol}&api_token=${stocksKey}&date_from=${fullDate}&sort=asc`)
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