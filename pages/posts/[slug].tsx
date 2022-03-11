import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import db from '../../utils/db';

interface IParams extends ParsedUrlQuery {
    slug: string;
}

const Post: React.FC = ({ entry }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <div>loading...</div>
        )
    } else {
        if (entry) {
            return (
                <div>
                    <h1>{entry.title}</h1>
                    <h3>{entry.created}</h3>
                    <p>{entry.body}</p>
                </div>
            )
        } else {
            return (
                <div>Not found</div>
            )
        }
    }
};

export const getStaticPaths: GetStaticPaths = async () => {
    const entries = await db.collection('entries').get();
    const paths = entries.docs.map(entry => ({
        params: {
            slug: entry.data().slug
        }
    }));
    
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const res = await db.collection('entries').where('slug', '==', slug).get();
    const entry = res.docs.map(entry => entry.data());

    return (entry.length) ? {
            props: {
                entry: entry[0]
            }
        } :
        {
            props: {}
        }
    }
