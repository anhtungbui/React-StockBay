import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileList from './ProfileList';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

const prepareChartData = (data) => {
    console.log(data);
};

export default function StockDetail({ match }) {
    const symbol = match.params.symbol;
    const [profile, setProfile] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCompanyProfile();
        getStockPrice();
    }, []);

    const getCompanyProfile = async () => {
        setLoading(true);
        const { data } = await axios.get(
            'https://finnhub.io/api/v1/stock/profile2?',
            {
                params: {
                    symbol: symbol,
                    token: FINNHUB_TOKEN,
                },
            }
        );
        // console.log(data);
        setProfile(data);
        setLoading(false);
    };

    const getStockPrice = async () => {
        setLoading(true);
        const { data } = await axios.get(
            'https://finnhub.io/api/v1/stock/candle?',
            {
                params: {
                    symbol: symbol,
                    resolution: 'D',
                    from: Date.parse('2021-02-01T00:00:00') / 1000,
                    to: new Date().getTime(),
                    token: FINNHUB_TOKEN,
                },
            }
        );
        // console.log(data);
        prepareChartData(data);
        // setNews(data);
    };

    return (
        <div className="row mt-3">
            <div className="col-4">
                <ProfileList profile={profile} loading={loading} />
            </div>
            <div className="col-8">
                <div className="card">
                    <div className="card-header">Stock Price</div>
                    <div className="card-body"></div>
                </div>
            </div>
        </div>
    );
}
