import React, {createContext, useContext, useState} from 'react';
import {cn} from '@/lib/utils.ts';
import {CircleX} from 'lucide-react';

interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  render: React.ReactNode;
}

interface LayoutContextType {
  showDialog: (props: DialogProps) => void;
  hideDialog: () => void;
}

const DialogContext = createContext({} as LayoutContextType);

export const DialogProvider = ({children}: { children: React.ReactNode }) => {
  const [dialog, setDialog] = useState<DialogProps>({} as DialogProps);
  const [open, setOpen] = useState(false);

  const showDialog = (props: DialogProps) => {

    setDialog({
      title: props.title || '',
      ...props
    });
    setOpen(true);
  };

  const hideDialog = () => {
    setOpen(false);
    setDialog({} as DialogProps);
  };

  return (
    <DialogContext.Provider value={{showDialog, hideDialog}}>
      <div className="relative">
        {children}

        <div
          className={cn('absolute top-0 left-0 h-screen w-screen place-items-center bg-gray-950 bg-opacity-30 backdrop-blur-sm', {
            'hidden': !open,
            'grid': open
          })}
          onClick={() => hideDialog()}
        >
          <div
            className={cn('min-w-[400px] rounded-lg border shadow-sm bg-background p-4 py-2', dialog.className)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 mb-1">
              <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">{dialog.title}</h2>
              <button onClick={() => hideDialog()}>
                <CircleX size={20} className="text-muted-foreground"/>
              </button>
            </div>
            {dialog.render}
          </div>
        </div>
      </div>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};