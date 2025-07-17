import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import NewsItem from './Newsitems';
import Spinner from './Spinner';


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)

    


    const loadingNews = async ()=> {
        props.setProgress(10);
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d98927eb9ca3468c854ef4cbbd9aad06&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        props.setProgress(50);
        console.log(parsedData); 
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${props.category} - News4U`;
        loadingNews();
    },[])

    useEffect(() => {
        loadingNews();
    }, [page]);

    const handlePrevClick = () => {
        setPage(page-1);
    }

    const handleNextClick = () => {
        setPage(page+1);
    }

        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin: '35px 0px'}}>News4U - Top Headlines From {props.category} </h1>
                {loading && <Spinner/>}
                <div className="row"> 
                {!loading && articles.map((element)=>{
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div> 
                })} 
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}> &larr; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    
}
News.defaultProps = {
    country: 'in',
    pageSize: 8, 
    category: 'general',
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number, 
    category: PropTypes.string,
  }

export default News

