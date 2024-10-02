'use client';
import type { ReactNode } from 'react';

export interface CardProps {
  children?: ReactNode;
	className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`mx-auto rounded-lg rounded-tl-3xl rounded-br-3xl shadow-lg
			shadow-black/10 p-2 bg-splatter-200/[7.5%] flex flex-col ${className ?? ''}`}>
			{children}
    </div>
  );
}
