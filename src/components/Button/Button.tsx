import { type ButtonProps } from './types';

export const Button = ({ text, className, onClick, disabled, type = 'button' }: ButtonProps) => {
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
};
