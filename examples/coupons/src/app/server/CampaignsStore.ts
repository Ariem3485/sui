import { v4 as uuidV4 } from 'uuid';
import { faker } from '@faker-js/faker';

export interface Campaign {
    id: string;
    name: string;
    discount: number;
    emails: { name: string; email: string }[];
    emailTemplate: string;
    expiration: Date;
    created: Date;
}

export type CouponStatus = 'Paid' | 'Downloaded' | 'Sent' | 'Draft';

export type Coupon = {
    id: number;
    status: CouponStatus;
    name: string;
    email: string;
    discount: number;
    mintDate: Date;
    claimed: boolean;
};

class CampaignsStore {
    private campaigns = new Map<string, Campaign>();

    public getAll(): Campaign[] {
        return Array.from(this.campaigns.values());
    }

    public get(campaignID: string) {
        return this.campaigns.get(campaignID);
    }

    public addCampaign(campaign: Omit<Campaign, 'id' | 'created'>): Campaign {
        const id = uuidV4();
        const newCampaign: Campaign = { ...campaign, id, created: new Date() };
        this.campaigns.set(id, newCampaign);
        return newCampaign;
    }

    public getCoupons(): Coupon[] {
        const coupons: Coupon[] = [];
        for (const aCampaign of this.getAll()) {
            for (const anEmail of aCampaign.emails) {
                coupons.push({
                    id: faker.datatype.number(),
                    status: faker.random.arrayElement([
                        'Paid',
                        'Downloaded',
                        'Sent',
                        'Draft',
                    ]),
                    name: anEmail.name,
                    email: anEmail.email,
                    discount: aCampaign.discount,
                    mintDate: aCampaign.created,
                    claimed: faker.datatype.boolean(),
                });
            }
        }
        return coupons;
    }
}

const store = new CampaignsStore();

Array.from({ length: 0 }).forEach(() => {
    store.addCampaign({
        name: faker.lorem.words(2),
        discount: faker.datatype.number({ min: 5, max: 100, precision: 5 }),
        expiration: faker.datatype.datetime({ min: new Date().getTime() }),
        emailTemplate: '',
        emails: Array.from(
            { length: faker.datatype.number({ min: 2, max: 10 }) },
            () => ({
                name: faker.name.findName(),
                email: faker.internet.email(),
            })
        ),
    });
});

export default store;
