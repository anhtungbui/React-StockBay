import React from 'react';
import moment from 'moment';
import Spinner from './Spinner';
import { FaGlasses } from 'react-icons/fa';

export default function MarketNews({ newsArticles }) {
    if (newsArticles.length === 0) {
        return <Spinner />;
    }

    return (
        <div className="mt-3">
            <div className="card">
                <div className="card-header">
                    Latest Financial & Business News
                </div>
                <div className="card-body row">
                    <div className="col-4">
                        <img
                            className="w-100"
                            src={newsArticles[0].image}
                            alt={newsArticles[0].headline}
                        />
                    </div>
                    <div className="col-8">
                        <a
                            className="float-right btn btn-outline-primary"
                            href={newsArticles[0].url}
                        >
                            Read <FaGlasses className="ml-2" size="17px" />
                        </a>
                        <div>
                            <span className="badge badge-primary text-uppercase mr-2">
                                {newsArticles[0].category}
                            </span>
                            <span className="mr-2">
                                {newsArticles[0].source}
                            </span>
                            <span>
                                •{' '}
                                {moment
                                    .unix(newsArticles[0].datetime)
                                    .fromNow()}
                            </span>
                        </div>
                        <div className="h3">{newsArticles[0].headline}</div>
                        <p>{newsArticles[0].summary}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
