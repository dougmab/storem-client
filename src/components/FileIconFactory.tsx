import {FileIcon, FolderIcon} from 'lucide-react';
import {File} from '@/types.ts';

interface FileIconFactoryProps {
  file: File;
  size?: number;
}

const FileIconFactory = ({file, size = 24}: FileIconFactoryProps) => {
  if (file.type === 'directory') return <FolderIcon size={size} className="text-primary fill-primary"/>;
  return <FileIcon size={size} className="text-primary"/>;
};

export default FileIconFactory;
