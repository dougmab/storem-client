import React, {useEffect, useRef} from 'react';
import {CloudFile} from '@/types.ts';
import {Input} from '@/components/ui/input.tsx';
import DialogFooter from '@/components/dialogs/DialogFooter.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useDialog} from '@/context/dialog-provider.tsx';
import {useToast} from '@/hooks/use-toast.ts';

interface CreateNewFolderDialogProps {
  setFiles: React.Dispatch<React.SetStateAction<CloudFile[]>>;
  files: CloudFile[];
}

const CreateNewFolderDialog = ({setFiles, files}: CreateNewFolderDialogProps) => {
  const inputRef = useRef(null as HTMLInputElement | null);
  const {hideDialog} = useDialog();
  const {toast} = useToast();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCreateFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFolder = inputRef.current?.value;
    if (!newFolder) {
      return;
    }

    if (files.find(file => file.name === newFolder)) {
      toast({
        title: 'Folder already exists',
        description: 'A folder with that name already exists',
        variant: 'destructive'
      });

      return;
    }

    setFiles((oldFiles: CloudFile[]) => {
      return [...oldFiles, {
        id: Math.random().toString(36).substring(7),
        name: newFolder,
        type: 'directory',
        access: [
          {
            id: '1',
            firstName: 'Douglas',
            lastName: 'Brum',
            email: '',
            avatarColor: 'gray'
          }
        ],
        accessLevel: 'private',
        size: 0,
        updatedAt: new Date().toISOString(),
      } as CloudFile];
    });

    hideDialog();
  };

  return (
    <div>
      <form onSubmit={handleCreateFolder}>
        <Input ref={inputRef} placeholder="New folder" aria-label="Rename input"/>

        <DialogFooter>
          <Button variant="secondary" type="button" onClick={hideDialog}>
            Cancel
          </Button>
          <Button type="submit">
            Create
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default CreateNewFolderDialog;
