import {useEffect, useRef} from 'react';
import {CloudFile} from '@/types.ts';
import {Input} from '@/components/ui/input.tsx';
import DialogFooter from '@/components/dialogs/DialogFooter.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useDialog} from '@/context/dialog-provider.tsx';

const RenameFileDialog = ({file}: { file: CloudFile }) => {
  const inputRef = useRef(null as HTMLInputElement | null);
  const {hideDialog} = useDialog();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <Input ref={inputRef} value={file.name} aria-label="Rename input"/>
      <DialogFooter>
        <Button variant="secondary" onClick={hideDialog}>
          Cancel
        </Button>
        <Button>
          Rename
        </Button>
      </DialogFooter>
    </div>
  );
};

export default RenameFileDialog;
