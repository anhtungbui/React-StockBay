import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import StockDetail from './components/StockDetail';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
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
            console.log(data.result);
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
        <Router>
            <header>
                <NavigationBar
                    query={query}
                    handleFormSubmit={handleFormSubmit}
                    handleInputChange={handleInputChange}
                />
            </header>
            <main className="container">
                <Main query={query} results={results} />
                <Switch>
                    <Route path="/:symbol" component={StockDetail} />
                </Switch>
            </main>
        </Router>
    );
}

export default App;
