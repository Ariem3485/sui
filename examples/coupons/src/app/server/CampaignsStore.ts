import cluster from 'cluster';
import { v4 as uuidV4 } from 'uuid';
import { threadId, workerData } from 'worker_threads';

export interface Campaign {
    id: string;
    name: string;
    discount: number;
    emails: string[];
    emailTemplate: string;
}

class CampaignsStore {
    private campaigns = new Map<string, Campaign>();

    public getAll(): Campaign[] {
        return Array.from(this.campaigns.values());
    }

    public get(campaignID: string) {
        return this.campaigns.get(campaignID);
    }

    public addCampaign(campaign: Omit<Campaign, 'id'>): Campaign {
        const id = uuidV4();
        const newCampaign: Campaign = { ...campaign, id };
        this.campaigns.set(id, newCampaign);
        return newCampaign;
    }
}

const store = new CampaignsStore();

export default store;
