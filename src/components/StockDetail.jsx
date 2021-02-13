import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighStock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import ProfileList from './ProfileList';

const FINNHUB_TOKEN = process.env.REACT_APP_FINNHUB_TOKEN;

export default function StockDetail({ match }) {
    const symbol = match.params.symbol;
    const [profile, setProfile] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(null);

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

        let chartData = await prepareChartData(data);
        setChartData(chartData);
        // console.log(chartData);
        // setNews(data);
    };

    function prepareChartData(data) {
        // console.log('Hello');
        // console.log(data);
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
        // chart: {
        //     type: 'spline',
        // },
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
                    <div className="card-header">Stock Price</div>
                    <div className="card-body">
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
