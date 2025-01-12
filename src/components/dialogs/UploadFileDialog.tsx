import DialogFooter from '@/components/dialogs/DialogFooter.tsx';
import {Button} from '@/components/ui/button.tsx';
import {useDialog} from '@/context/dialog-provider.tsx';
import {CloudUpload, Upload} from 'lucide-react';
import React, {useState} from 'react';
import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import {cn} from '@/lib/utils.ts';

const UploadFileDialog = () => {
  const {hideDialog} = useDialog();
  const [selectedFiles, setSelectedFiles] = useState([] as File[]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArr = Array.from(e.target.files as ArrayLike<File>);
    setSelectedFiles(filesArr);

    console.log(filesArr);
  };

  return (
    <div>
      <p className="font-light mb-2">Click or drag and drop to upload</p>
      <form>
        <div
          className={cn('relative flex flex-col justify-center items-center p-4 border border-2 border-dashed rounded-lg shadow-sm cursor-pointer transition ease-in-out',
            {
              'bg-primary text-primary-foreground': isDraggingOver,
              'border-primary text-primary': selectedFiles.length > 0
            }
          )}
          onDragOver={() => setIsDraggingOver(true)}
          onDragLeave={() => setIsDraggingOver(false)}
          onDrop={() => setIsDraggingOver(false)}
        >
          <CloudUpload size={80}/>
          <input type="file" required multiple
                 className="absolute opacity-0 top-0 right-0 left-0 bottom-0"
                 onChange={handleFileChange}
          />
          <div className="flex flex-col max-h-[80px] overflow-hidden">
            {selectedFiles[0] ? (
              <ScrollArea className="flex-1 overflow-y-auto pr-4"> {/*// Someday I'll fix this scroll area*/}
                {selectedFiles.map((file) => (
                  <div key={file.name} className="text-xs truncate w-40">
                    {file.name}
                  </div>
                ))}
              </ScrollArea>
            ) : (<span className="text-sm">No Files Selected</span>)}
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" type="button" onClick={hideDialog}>
            Cancel
          </Button>
          <Button onClick={hideDialog} type="submit">
            <Upload/>
            Upload
          </Button>
        </DialogFooter>
      </form>
    </div>

  );
};
export default UploadFileDialog;
