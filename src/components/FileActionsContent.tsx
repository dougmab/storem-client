import {DropdownMenuContent, DropdownMenuItem} from '@/components/ui/dropdown-menu.tsx';
import {CircleAlert, Download, Pencil, Trash2, UserPlus} from 'lucide-react';
import {Separator} from '@/components/ui/separator.tsx';
import {File} from '@/types.ts';

const FileActionsContent = ({file: _file}: { file: File }) => {
  // TODO - implement API calls for these actions

  return (
    <DropdownMenuContent align="end" className="min-w-[200px]">
      <DropdownMenuItem>
        <Download/>
        Download
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Pencil/>
        Rename
      </DropdownMenuItem>
      <Separator/>
      <DropdownMenuItem>
        <UserPlus/>
        Share
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CircleAlert/>
        Details
      </DropdownMenuItem>
      <Separator/>
      <DropdownMenuItem className="text-destructive">
        <Trash2/>
        Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};
export default FileActionsContent;
