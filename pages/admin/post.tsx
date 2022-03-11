import { useState, ChangeEvent, ChangeEventHandler } from 'react';
import dashify from 'dashify';
import axios from 'axios';
import Input from '../../components/input';

const Post: React.FC = () => {
    const [content, setContent] = useState({
        title: '',
        body: '',
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setContent(prevState => ({ ...prevState, [name]: value }));
    }

    const onSubmit = async () => {
        const { title, body } = content;
        await axios.post('/api/entry', { title, slug: dashify(title), body });
    }

    return (
        <div>
            <label htmlFor='title'>Title</label>
            <Input
                name='title'
                value={content.title}
                onChange={onChange} // TODO: Fix type error (ts(2322))
            />
            <label htmlFor='body'>Body</label>
            <Input
                type='textarea'
                name='body'
                value={content.body}
                onChange={onChange} // TODO: Fix type error (ts(2322))
            />
            <button onSubmit={onSubmit}>post</button>
        </div>
    )
}