import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu.tsx';
import {CircleAlert, Download, Pencil, Trash2, UserPlus} from 'lucide-react';
import {Separator} from '@/components/ui/separator.tsx';
import {CloudFile} from '@/types.ts';
import {useDialog} from '@/context/dialog-provider.tsx';
import FileDetailsDialog from '@/components/dialogs/FileDetailsDialog.tsx';
import RenameFileDialog from '@/components/dialogs/RenameFileDialog.tsx';
import DeleteFileDialog from '@/components/dialogs/DeleteFileDialog.tsx';

const FileActionsContent = ({file}: { file: CloudFile }) => {
  // TODO - implement API calls for these actions

  const {showDialog} = useDialog();

  return (
    <DropdownMenuContent align="start" className="min-w-[200px]">
      <DropdownMenuItem>
        <Download/>
        Download
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => showDialog({
        title: 'Rename ' + file.type,
        render: <RenameFileDialog file={file}/>
      })}>
        <Pencil/>
        Rename
      </DropdownMenuItem>
      <Separator/>
      <DropdownMenuItem>
        <UserPlus/>
        Share
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => showDialog({
        title: file.name,
        render: <FileDetailsDialog file={file}/>
      })}>
        <CircleAlert/>
        Details
      </DropdownMenuItem>
      <Separator/>
      <DropdownMenuItem className="text-destructive" onClick={() => showDialog({
        title: 'Delete ' + file.type + '?',
        render: <DeleteFileDialog file={file}/>
      })}>
        <Trash2/>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default FileActionsContent;
