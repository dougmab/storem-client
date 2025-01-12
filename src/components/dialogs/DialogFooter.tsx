import React from 'react';
import {cn} from '@/lib/utils.ts';

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DialogFooter = ({children, className}: DialogFooterProps) => {
  return (
    <div className={cn('flex justify-between py-2 mt-2', className)}>
      {children}
    </div>
  );
};
export default DialogFooter;
