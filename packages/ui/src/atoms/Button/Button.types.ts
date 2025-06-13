import { ReactNode } from 'react';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  'data-testid'?: string;
  onClick?: () => void;
}
