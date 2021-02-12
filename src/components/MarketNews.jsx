import React from 'react';
import NewsArticle from './NewsArticle';

import Spinner from './Spinner';

export default function MarketNews({ newsArticles, loading }) {
    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="mt-3">
            <h1 className="card-header">Latest Financial & Business News</h1>

            {newsArticles.map((newsArticle) => {
                return (
                    <NewsArticle
                        newsArticle={newsArticle}
                        key={newsArticle.id}
                    />
                );
            })}
        </div>
    );
}
