import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import db from '../../utils/db';

const Posts: React.FC = ({ entriesData }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <div>
            <h1>Posts</h1>
            {entriesData.map((entry: any) => (
                <div key={entry.id}>
                    <Link href={`posts/${entry.slug}`}>
                        <a>{entry.title}</a>
                    </Link>
                    <br />
                </div>
            ))}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const entries = await db.collection('entries').orderBy('created', 'desc').get();
    const entriesData = entries.docs.map(entry => ({
        id: entry.id,
        ...entry.data()
    }));
    
    return {
        props: { entriesData },
        revalidate: 10
    }
}

export default Posts;