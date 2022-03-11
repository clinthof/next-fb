interface InputProps {
    name: string,
    type?: string,
    placeholder?: string,
    value: any,
    onChange?: (e?: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Input: React.FC<InputProps> = ({ type = 'text', ...props}) => {
    return type === 'textarea' ? <textarea {...props} /> : <input type={type} {...props} />
}

export default Input;