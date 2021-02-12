import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import NavigationBar from './components/NavigationBar';
import Main from './components/Main';
import MarketNews from './components/MarketNews';
import StockDetail from './components/StockDetail';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

function App() {
    const [newsArticles, setNewsArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const getNewsArticles = async () => {
            try {
                const { data } = await axios.get(
                    'https://finnhub.io/api/v1/news?',
                    {
                        params: {
                            category: 'general',
                            token: FINNHUB_TOKEN,
                        },
                    }
                );
                console.log(data);
                setNewsArticles(data);
            } catch (error) {
                console.error(error);
            }
        };

        getNewsArticles();
    }, []);

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
                    <Route path="/" exact>
                        <MarketNews newsArticles={newsArticles} />
                    </Route>
                    <Route path="/:symbol" component={StockDetail} />
                </Switch>
            </main>
        </Router>
    );
}

export default App;
