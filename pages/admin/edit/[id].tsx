import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import dashify from 'dashify';
import axios from 'axios';
import Input from '../../../components/input';

const EditEntry: React.FC = () => {
    const router = useRouter();
    const [content, setContent] = useState({
        title: '',
        body: '',
    });

    /* 
    Since these are admin pages, they are not SSR so using
    useEffect to render on the client is fine. The same is
    evidently not true for the posts due to performance and
    SEO optimization.
    */
    useEffect(() => {
        const fetchData = async () => {
            const { id } = router.query;
            if (id) {
                const res = await axios.get(`/api/entry/${id}`);
                const { title, body } = res.data;
                setContent({
                    title,
                    body
                });
            }
        }
        fetchData();
    }, [router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setContent(prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = async () => {
        const { id } = router.query;
        const { title, body } = content;
        console.log(id, title, body);
        await axios.put(`/api/entry/${id}`, {
            slug: dashify(title),
            title,
            body,
        });
    }

    const handleDelete = async () => {
        const { id } = router.query;
        await axios.delete(`/api/entry/${id}`);
        router.back();
    }

    return (
        <div>
            <label htmlFor='title'>Title</label>
            <Input
                name='title'
                value={content.title}
                onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>)}
            />
            <label htmlFor='body'>Body</label>
            <Input
                type='textarea'
                name='title'
                value={content.body}
                onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>)}
            />
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default EditEntry;