import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';

const endpointHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const collectionDoc = db.collection('entries').doc(id as string);

    try {
        if (req.method === 'PUT') {
        await collectionDoc.update({
            ...req.body,
            updated: new Date().toISOString(),
        });
        } else if (req.method === 'GET') {
            const doc = await collectionDoc.get();
            !doc.exists ? res.status(404).end() : res.status(200).json(doc.data());
        } else if (req.method === 'DELETE') {
            await collectionDoc.delete();
        }
        res.status(200).end();
    } catch (e) {
        console.log(`Error: Could not update/retrieve/delete document ${id}.\n${e}`);
        res.status(400).end();
    }
}

export default endpointHandler;