import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        const search = async () => {
            const { data } = await axios.get(
                'https://finnhub.io/api/v1/search',
                {
                    params: {
                        q: query,
                        token: FINNHUB_TOKEN,
                    },
                }
            );
            // console.log(data.result);
            setResults(data.result);
        };

        const timeoutId = setTimeout(() => {
            if (query) {
                search();
            }
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query]);

    return (
        <>
            <header>
                <Navbar className="shadow navbar-light bg-white" expand="lg">
                    <div className="col-2">
                        <div className="navbar__logo">StockBay</div>
                    </div>
                    <div className="col-5">
                        <form
                            className="form-inline"
                            onSubmit={(e) => handleFormSubmit(e)}
                        >
                            <div className="form-group w-100">
                                <input
                                    type="search"
                                    className="form-control navbar__input"
                                    placeholder="Search symbol or company..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                ></input>
                                <button
                                    type="submit"
                                    className="btn btn-primary navbar__button"
                                >
                                    <FaSearch size="17px" />
                                </button>
                            </div>
                        </form>
                    </div>
                </Navbar>
            </header>
        </>
    );
}

export default App;
