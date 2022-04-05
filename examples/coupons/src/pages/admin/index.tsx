import { useCallback, useState } from 'react';
import { Button, Toast, ToastContainer } from 'react-bootstrap';
import useSWR from 'swr';

import NewCampaignModal from '../../app/admin/campaigns/new-campaign-modal/NewCampaignModal';
import PageLayout from '../../app/admin/page-layout/PageLayout';

import type { NextPage } from 'next';
import type { Campaign } from '../../app/server/CampaignsStore';

const AdminHomePage: NextPage = () => {
    const [campaignNew, setCampaignNew] = useState<{
        campaign: Campaign | null;
        show: boolean;
    }>({ campaign: null, show: false });
    const { data, error, mutate } = useSWR('/api/campaigns', (key) =>
        fetch(key).then((res) => {
            if (!res.ok) {
                throw {
                    message: `Failed to fetch campaigns. ${res.statusText} - ${res.status}`,
                };
            }
            return res.json();
        })
    );
    const [newVisible, setNewVisible] = useState(false);
    const onHandleShowNewModal = useCallback(() => setNewVisible(true), []);
    const handleClose = useCallback(
        (campaign?: Campaign) => {
            if (campaign) {
                mutate();
                setCampaignNew({ campaign, show: true });
            }
            setNewVisible(false);
        },
        [mutate]
    );
    const handleToastClose = useCallback(
        () => setCampaignNew((state) => ({ ...state, show: false })),
        []
    );
    return (
        <>
            <PageLayout pageTitle="Campaigns">
                <>
                    <Button onClick={onHandleShowNewModal}>New Campaign</Button>
                </>
                <>{JSON.stringify({ data, error })}</>
            </PageLayout>
            <NewCampaignModal isVisible={newVisible} onHide={handleClose} />
            <ToastContainer position="bottom-end" className="p-3">
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
            </ToastContainer>
        </>
    );
};

export default AdminHomePage;
