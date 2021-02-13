import React from 'react';
import Moment from 'moment';
import HighStock from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Spinner from './Spinner';
import { GoArrowUp, GoArrowDown } from 'react-icons/go';

export default function StockPrice({
    profile,
    chartData,
    currentPrice,
    priceDiff,
    priceDiffPercentage,
    loading,
}) {
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

    if (loading) {
        return <Spinner />;
    }

    let priceComparison;
    if (priceDiff >= 0) {
        priceComparison = (
            <span className="h3 text-success">
                +{priceDiff} ({priceDiffPercentage} %)
                <GoArrowUp className="react-icons" size="1.6rem" />
            </span>
        );
    } else {
        priceComparison = (
            <span className="h3 text-danger">
                {priceDiff} ({priceDiffPercentage} %)
                <GoArrowDown className="react-icons" size="1.6rem" />
            </span>
        );
    }

    return (
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
                <div>{priceComparison}</div>
                <small>
                    Data fetched on {Moment().format('MMMM Do YYYY, h:mm a')}
                </small>
                {chartData && (
                    <HighchartsReact
                        highcharts={HighStock}
                        constructorType={'stockChart'}
                        options={options}
                    />
                )}
            </div>
        </div>
    );
}
