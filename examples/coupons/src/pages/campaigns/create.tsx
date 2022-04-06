import NewCampaign from '@src/app/admin/campaigns/new-campaign';
import PageLayout from '@app/admin/page-layout/PageLayout';

import type { NextPage } from 'next';

const CreateCampaign: NextPage = () => {
    return (
        <>
            <PageLayout pageTitle="Campaigns">
                <NewCampaign />
            </PageLayout>
        </>
    );
};

export default CreateCampaign;
