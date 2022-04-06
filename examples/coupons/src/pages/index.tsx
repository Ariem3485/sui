import type { NextPage } from 'next';

import PageLayout from '@src/app/admin/page-layout/PageLayout';
import DashboardAnalytic from '@app/views/dashboard/analytics';

const Home: NextPage = () => {
    return (
        <PageLayout pageTitle="Analytics Dashboard">
            <DashboardAnalytic />
        </PageLayout>
    );
};

export default Home;
