// ** React Imports
import { useEffect, useState } from 'react';

// ** Third Party Components
import { Users } from 'react-feather';

// ** Custom Components
import StatsWithAreaChart from '@components/widgets/stats/StatsWithAreaChart';
import { useSelector } from 'react-redux';

const SubscribersGained = ({ kFormatter }) => {
    const { totalUsers } = useSelector((state) => state.invoice);
    const data = {
        series: [
            {
                name: 'Users',
                data: [28, 40, 36, 52, 38, 60, 55],
            },
        ],
        analyticsData: {
            subscribers: totalUsers,
        },
    };

    return data !== null ? (
        <StatsWithAreaChart
            icon={<Users size={21} />}
            color="primary"
            stats={kFormatter(data.analyticsData.subscribers)}
            statTitle="Num of users"
            series={data.series}
            type="area"
        />
    ) : null;
};

export default SubscribersGained;
