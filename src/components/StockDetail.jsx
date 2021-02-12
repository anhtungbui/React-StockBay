import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileList from './ProfileList';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

export default function StockDetail({ match }) {
    const symbol = match.params.symbol;
    const [profile, setProfile] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => {
        // getCompanyProfile();
        // getCompanyNews();
    }, []);

    const getCompanyProfile = async () => {
        const { data } = await axios.get(
            'https://finnhub.io/api/v1/stock/profile2?',
            {
                params: {
                    symbol: symbol,
                    token: FINNHUB_TOKEN,
                },
            }
        );
        console.log(data);
        setProfile(data);
    };

    const getCompanyNews = async () => {
        const { data } = await axios.get(
            'https://finnhub.io/api/v1/company-news?',
            {
                params: {
                    symbol: symbol,
                    from: '2021-01-10',
                    to: '2021-01-11',
                    token: FINNHUB_TOKEN,
                },
            }
        );
        console.log(data);
        // setNews(data);
    };

    return (
        <div className="row mt-3">
            <div className="col-4">
                <ProfileList profile={profile} />
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-header">Company News</div>
                    <div className="card-body"></div>
                </div>
            </div>
        </div>
    );
}
