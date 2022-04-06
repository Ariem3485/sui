import NewCampaign from '@src/app/admin/campaigns/new-campaign';
import PageLayout from '@app/admin/page-layout/PageLayout';

import type { NextPage } from 'next';

const CreateCampaign: NextPage = () => {
    return (
        <>
            <PageLayout pageTitle="Campaigns">
                <NewCampaign />
            </PageLayout>
            {/* <ToastContainer position="bottom-end" className="p-3">
                <Toast
                    show={campaignNew.show}
                    autohide={true}
                    delay={5000}
                    onClose={handleToastClose}
                >
                    <Toast.Header>
                        <div>
                            <strong>Campaign created!</strong>
                        </div>
                    </Toast.Header>
                    {campaignNew.campaign ? (
                        <Toast.Body>
                            Campaign{' '}
                            <strong>{campaignNew.campaign.name}</strong> created
                            with id <strong>{campaignNew.campaign.id}</strong>
                        </Toast.Body>
                    ) : null}
                </Toast>
            </ToastContainer> */}
        </>
    );
};

export default CreateCampaign;
