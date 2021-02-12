import React from 'react';
import moment from 'moment';

export default function NewsArticle({ newsArticle }) {
    return (
        <div className="card">
            {/* <div className="card-header">
            Latest Financial & Business News
        </div> */}
            <div className="card-body row">
                <div className="col-4">
                    <img
                        className="w-100"
                        src={newsArticle.image}
                        alt={newsArticle.headline}
                    />
                </div>
                <div className="col-8">
                    <div>
                        <span className="badge badge-primary text-uppercase mr-2">
                            {newsArticle.category}
                        </span>
                        <span className="mr-2">{newsArticle.source}</span>
                        <span>
                            • {moment.unix(newsArticle.datetime).fromNow()}
                        </span>
                    </div>
                    <a className="" href={newsArticle.url} target="_blank">
                        <div className="h3">{newsArticle.headline}</div>
                    </a>
                    <p>{newsArticle.summary}</p>
                </div>
            </div>
        </div>
    );
}
