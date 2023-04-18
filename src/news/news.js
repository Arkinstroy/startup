import React from "react";
import '../App.css';
import './news.css';

export function News() {
    const [inputValue, setInputValue] = React.useState('');
    const [articles, setArticles] = React.useState([]);


    async function fetchNews() {
        await fetch('/api/news', {
            method: 'post',
            body: JSON.stringify({ company: inputValue }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            if (data && data.status === "ok"
                && Array.isArray(data.articles)) {
                    if (data.articles.length > 0) {
                        setArticles([...data.articles]);
                    } else {
                        setArticles([]);
                    }
            }
        });
    }

    async function saveArticle(title, url, urlToImage) {
        await fetch('/api/save', {
            method: 'post',
            body: JSON.stringify({ title: title, url: url, urlToImage: urlToImage }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    return (
        <main>
            <div className="flex stock-content">
                <label htmlFor="stockSearch" className="stock-label">
                    Enter company name
                </label>

                <input
                    className="stock-input"
                    type="text"
                    name="stockSearch"
                    required
                    size="10"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <button className="stock-search" onClick={() => fetchNews()}>
                    Search
                </button>
            </div>
            {articles.length ? articles.map((article) => {
                return (
                    <div className="article" key={article.title}>
                        <a href={article.url}>{article.title}</a>
                        <button
                            className="login-buttons sign-up"
                            onClick={() => saveArticle(article.title, article.url, article.urlToImage)}
                        >save</button>
                        <img src={article.urlToImage} alt={''}></img>
                    </div>
                )
            }) : <p className="none-found">No articles found</p>}
        </main>
    );
}