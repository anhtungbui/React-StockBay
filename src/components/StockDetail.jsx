import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HighStock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import ProfileList from './ProfileList';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

export default function StockDetail({ match }) {
    const symbol = match.params.symbol;
    const [profile, setProfile] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [priceDiff, setPriceDiff] = useState(null);
    const [priceDiffPercentage, setPriceDiffPercentage] = useState(null);

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
                    from: Date.parse('2020-02-13T00:00:00') / 1000,
                    to: new Date().getTime(),
                    token: FINNHUB_TOKEN,
                },
            }
        );
        // console.log(data);

        const chartData = prepareChartData(data);
        const {
            _currentPrice,
            _priceDiff,
            _priceDiffPercentage,
        } = getPriceDiff(data);
        setCurrentPrice(_currentPrice);
        setPriceDiff(_priceDiff);
        setPriceDiffPercentage(_priceDiffPercentage);
        setChartData(chartData);
        // console.log(chartData);
        // setNews(data);
    };

    function getPriceDiff(data) {
        const _currentPrice = data.c[data.c.length - 1].toFixed(2);
        const _previousPrice = data.c[data.c.length - 2].toFixed(2);
        const _priceDiff = (_currentPrice - _previousPrice).toFixed(2);
        const _priceDiffPercentage = (
            (_priceDiff / _previousPrice) *
            100
        ).toFixed(2);
        return {
            _currentPrice,
            _previousPrice,
            _priceDiff,
            _priceDiffPercentage,
        };
    }

    function prepareChartData(data) {
        const chartData = [];
        for (let i = 0; i < data.t.length; i++) {
            chartData.push([
                data.t[i] * 1000,
                parseFloat(data.c[i].toFixed(2)),
            ]);
        }
        return chartData;
    }

    const options = {
        title: {
            text: `${profile.name} (${profile.ticker})`,
        },
        rangeSelector: {
            selected: 1,
        },
        series: [
            {
                name: 'Price in ' + profile.currency,
                data: chartData,
                tooltip: {
                    valueDecimals: 2,
                },
            },
        ],
    };

    return (
        <div className="row mt-3">
            <div className="col-lg-4 order-2">
                <ProfileList profile={profile} loading={loading} />
            </div>
            <div className="col-lg-8 order-1 mb-3">
                <div className="card">
                    <div className="card-header">Stock Price History</div>
                    <div className="card-body">
                        <div>
                            <span className="h1 font-weight-bolder">
                                {currentPrice}
                            </span>
                            &nbsp;
                            {profile.currency}
                        </div>
                        <div>
                            <span className="h3 text-success">
                                {priceDiff} ({priceDiffPercentage} %) &nbsp;
                                <GoArrowUp
                                    className="react-icons"
                                    size="1.6rem"
                                />
                                <GoArrowDown
                                    className="react-icons"
                                    size="1.6rem"
                                />{' '}
                            </span>
                        </div>
                        {chartData && (
                            <HighchartsReact
                                highcharts={HighStock}
                                constructorType={'stockChart'}
                                options={options}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
