import {CloudFile} from '@/types.ts';
import DialogFooter from '@/components/dialogs/DialogFooter.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useDialog} from '@/context/dialog-provider.tsx';

const DeleteFileDialog = ({file}: { file: CloudFile }) => {
  const {hideDialog} = useDialog();

  return (
    <div>
      <p>Are you sure you want to delete this {file.type}?</p>

      <DialogFooter>
        <Button variant="secondary" onClick={hideDialog}>
          Cancel
        </Button>
        <Button variant="destructive">
          Delete
        </Button>
      </DialogFooter>
    </div>
  );
};

export default DeleteFileDialog;
