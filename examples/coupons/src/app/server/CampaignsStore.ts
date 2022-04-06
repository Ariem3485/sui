import { v4 as uuidV4 } from 'uuid';

export interface Campaign {
    id: string;
    name: string;
    discount: number;
    emails: { name: string; email: string }[];
    emailTemplate: string;
    expiration: Date;
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
