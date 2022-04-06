// ** React Imports
import { useEffect, useState } from 'react';

import { Package } from 'react-feather';

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart';

const OrdersReceived = ({ kFormatter, warning }) => {
    const data = {
        series: [
            {
                name: 'Coupons',
                data: [10, 15, 8, 15, 7, 12, 8],
            },
        ],
        analyticsData: {
            orders: 19070,
        },
    };

    const options = {
        chart: {
            id: 'revenue',
            toolbar: {
                show: false,
            },
            sparkline: {
                enabled: true,
            },
        },
        grid: {
            show: false,
        },
        colors: [warning],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 2.5,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 0.9,
                opacityFrom: 0.7,
                opacityTo: 0.5,
                stops: [0, 80, 100],
            },
        },

        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        tooltip: {
            x: { show: false },
        },
    };

    return data !== null ? (
        <StatsWithAreaChart
            icon={<Package size={21} />}
            color="warning"
            stats={kFormatter(data.analyticsData.orders)}
            statTitle="Minted coupons"
            options={options}
            series={data.series}
            type="area"
        />
    ) : null;
};
export default OrdersReceived;
