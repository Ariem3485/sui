import CampaignStore from '../../../app/server/CampaignsStore';
import { campaignSchema } from '../../../app/admin/campaigns/validations';

import type { Campaign, Coupon } from '../../../app/server/CampaignsStore';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

type Data = Campaign[] | { error: boolean; message: string } | Coupon[];

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        res.status(200).json(CampaignStore.getCoupons());
    } else if (req.method === 'POST') {
        if (!(await campaignSchema.isValid(req.body))) {
            res.status(400).json({ error: true, message: 'Invalid input' });
            return;
        }
        const newCampaign = CampaignStore.addCampaign(
            campaignSchema.cast(req.body) as Omit<Campaign, 'id'>
        );

        const apiServer = process.env.API_SERVER || 'http://127.0.0.1:5001';
        const apiURL = `${apiServer}/coupon`;
        const apiData = {
            campaign: newCampaign.name,
            display: 'http://adeniyi.com/coupon.jpg',
            discount: newCampaign.discount,
            expiration: newCampaign.expiration.getTime(),
            template: newCampaign.emailTemplate,
            emails: newCampaign.emails.map(
                ({ email, name }) => `${name} <${email}>`
            ),
        };
        try {
            await fetch(apiURL, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });
            console.log(`POST ${apiURL} success`, apiData);
        } catch (e) {
            console.log(`POST ${apiURL} failed`, e, apiData);
        }
        res.status(200).json([newCampaign]);
    }
}
