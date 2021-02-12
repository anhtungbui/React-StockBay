import React from 'react';
import { Link } from 'react-router-dom';

export default function Results({ results }) {
    return (
        <div>
            <ul className="list-group pt-3">
                {results.map((result) => {
                    return (
                        <li
                            className="list-group-item list-group-item-action"
                            key={result.symbol}
                        >
                            <Link to={`/${result.symbol}/`}>
                                <div className="row">
                                    <div className="col-2 font-weight-bolder">
                                        {result.symbol}
                                    </div>
                                    <div className="col-7">
                                        {result.description}
                                    </div>
                                    <div className="col-3">{result.type}</div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
