import { useEffect } from "react";
import { useState } from "react"
import NewsItem from "./NewsItem";

const apiKey = process.env.VITE_API_KEY;
export default function NewsBoard({ category }) {
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            setArticles(data.articles);
        }
        fetchData();
    }, [category])
    return (
        <div>
            <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
            {articles.map((article, index) => {
                return <NewsItem key={index} title={article.title}
                    descption={article.description} src={article.urlToImage} url={article.url} />
            }
            )}
        </div>
    )
}