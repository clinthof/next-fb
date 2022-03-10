import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/db';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
    try {
        const orderedEntries = await db.collection('entries').orderBy('created').get();
        const orderedData = orderedEntries.docs.map(entry => ({
            id: entry.id,
            ...entry.data()
        }));
        res.status(200).json({ orderedData });
    } catch (e) {
        console.log(`Error: Could not retrieve entries.\n${e}`);
        res.status(400).end();
    }
}

export default handler;