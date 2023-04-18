import React from "react";
import '../App.css';
import './news.css';

export function Saved() {
    const [articles, setArticles] = React.useState([]);


    async function fetchSaved() {
        await fetch('/api/saved')
        .then((response) => response.json())
        .then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                setArticles([...data]);
            } else {
                setArticles([]);
            }
        });
    }

    React.useEffect(() => {
        
        fetchSaved();
    
    }, []);

    

    return (
        <main>
            {articles.length ? articles.map((article) => {
                return (
                    <div className="article" key={article.title}>
                        <a href={article.url}>{article.title}</a>
                        <img src={article.urlToImage}></img>
                    </div>
                )
            }) : <p className="none-found">No articles found</p>}
        </main>
    );
}