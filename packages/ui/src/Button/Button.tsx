import { ButtonProps } from './Button.types';

export const Button = ({ children, className, onClick, ...rest }: ButtonProps) => {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
