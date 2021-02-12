import React from 'react';
import Results from './Results';
import NoResults from './NoResults.jsx';
import Spinner from './Spinner';

export default function Main({ query, results }) {
    if (results.length === 0) {
        if (query.length > 0) {
            return <Spinner />;
        }
    }

    if (results.length > 0) {
        return <Results results={results} />;
    } else if (query.length > 0) {
        return <NoResults query={query} />;
    }
    return null;

    // return (
    //     <main className="container">
    //         {query.length > 0 && results.length === 0 ? <Spinner /> : null}
    //         {/* {query.length === 0 && results.length === 0 ? (

    //             ) : null} */}

    //         {results.length > 0 ? (
    //             <Results results={results} />
    //         ) : (
    //             <NoResults query={query} />
    //         )}
    //     </main>
    // );
}
