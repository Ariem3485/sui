import CampaignStore from '../../../app/server/CampaignsStore';
import { campaignSchema } from '../../../app/admin/campaigns/validations';

import type { Campaign } from '../../../app/server/CampaignsStore';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = Campaign[] | { error: boolean; message: string };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === 'GET') {
        res.status(200).json(CampaignStore.getAll());
    } else if (req.method === 'POST') {
        if (!(await campaignSchema.isValid(req.body))) {
            res.status(400).json({ error: true, message: 'Invalid input' });
            return;
        }
        const newCampaign = CampaignStore.addCampaign(req.body);
        // TODO: create transactions and send emails (call API)
        setTimeout(() => res.status(200).json([newCampaign]), 2000);
    }
}
