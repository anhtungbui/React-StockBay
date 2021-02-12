import React from 'react';
import Results from './Results';
import NoResults from './NoResults.jsx';
import Spinner from './Spinner';

// FIXME: NoResults conditional rendering
export default function Main({ query, results, loading }) {
    if (loading) {
        return <Spinner />;
    }

    if (query.length === 0) {
        return null;
    } else if (query.length > 0 && results.length > 0) {
        return <Results results={results} />;
    } else if (query.length > 0 && results.length === 0) {
        // return <NoResults query={query} />;
    }

    return null;
}
