import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';

const collection = db.collection('entries');

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {

        // Identifier and db entry information
        const { slug } = req.body;
        const entries = await collection.get();
        const entriesData = entries.docs.map(entry => entry.data());

        // End request w/o data if slug matches an existing one, else add it
        if (entriesData.some(entry => entry.slug === slug)) {
            res.status(400).end();
        } else {
            const { id } = await collection.add({
                ...req.body,
                created: new Date().toISOString()
            });
            res.status(200).json({ id });
        }
    } catch (e) {
        res.status(400).end();
    }
}

export default postHandler;