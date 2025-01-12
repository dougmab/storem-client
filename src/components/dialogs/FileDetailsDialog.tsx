import {CloudFile} from '@/types.ts';
import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import FileIconFactory from '@/components/FileIconFactory.tsx';
import Avatar from '@/components/Avatar.tsx';
import {Separator} from '@/components/ui/separator.tsx';
import {formatBytes, formatDate} from '@/lib/utils.ts';
import {Button} from '@/components/ui/button.tsx';

const FileDetailsDialog = ({file}: { file: CloudFile }) => {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-2 pr-4">
        <div className="grid place-items-center p-4">
          <FileIconFactory file={file} size={100}/>
        </div>
        <div className="space-y-2">
          <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Who can access</h3>
          <ul className="flex gap-1">
            {file.access.map((user) => (
              <Avatar key={user.id} user={user}/>
            ))}
          </ul>
          <Button variant='outline' className="border-primary text-primary rounded-lg">
            Manage Access
          </Button>
        </div>
        <Separator/>
        <div className="space-y-2">
          <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">Details:</h3>
          <div className="details-prop">
            <h4>Owner</h4>
            <span>You</span>
          </div>
          <div className="details-prop">
            <h4>Size</h4>
            <span>{formatBytes(file.size)}</span>
          </div>
          <div className="details-prop">
            <h4>Modified at</h4>
            <span>{formatDate(file.updatedAt)}</span>
          </div>
          <div className="details-prop">
            <h4>Created at</h4>
            <span>{formatDate(file.updatedAt)}</span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default FileDetailsDialog;
