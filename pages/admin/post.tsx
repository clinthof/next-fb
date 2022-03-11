import { useState, ChangeEvent } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import Input from '../../components/input';

const Post: React.FC = () => {
    const [content, setContent] = useState({
        title: '',
        body: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setContent(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async () => {
        const { title, body } = content;
        await axios.post('/api/entry', { title, slug: dashify(title), body });
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
                name='body'
                value={content.body}
                onChange={e => handleChange(e as ChangeEvent<HTMLInputElement>)} 
            />
            <button onSubmit={handleSubmit}>post</button>
        </div>
    )
}