import React, {useEffect, useState} from 'react';
import {CloudFile} from '@/types.ts';
import FileIconFactory from '@/components/FileIconFactory.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Skeleton} from '@/components/ui/skeleton.tsx';
import {MoreVertical} from 'lucide-react';
import FileActionsContent from '@/components/FileActionsContent.tsx';
import {sortString} from '@/lib/utils.ts';

interface FileGridProps {
  data: CloudFile[];
  setData: React.Dispatch<React.SetStateAction<CloudFile[]>>;
  loading: boolean;
}

interface SortingOption {
  name: string;
  fn: (a: CloudFile, b: CloudFile) => number;
}

const sortings: {
  [key: string]: SortingOption;
} = {
  nameDesc: {
    name: 'A-Z',
    fn: (a: CloudFile, b: CloudFile) => sortString(a.name, b.name)
  },
  nameAsc: {
    name: 'Z-A',
    fn: (a: CloudFile, b: CloudFile) => sortString(b.name, a.name)
  },
  sizeAsc: {
    name: 'Smallest Size',
    fn: (a: CloudFile, b: CloudFile) => a.size - b.size
  },
  sizeDesc: {
    name: 'Biggest Size',
    fn: (a: CloudFile, b: CloudFile) => b.size - a.size
  },
  updatedAtAsc: {
    name: 'Last Modified',
    fn: (a: CloudFile, b: CloudFile) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  },
  updatedAtDesc: {
    name: 'First Modified',
    fn: (a: CloudFile, b: CloudFile) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  },
};

const FileGrid = ({data, setData, loading}: FileGridProps) => {
  const generalSorting = (a: CloudFile, b: CloudFile) => {
    if (a.type !== b.type)
      return a.type === 'directory' ? -1 : 1;

    return sortings[sorting].fn(a, b);
  };

  const [sorting, setSorting] = useState('nameDesc' as keyof typeof sortings);
  const TRUNCATE_SIZE = 20;

  useEffect(() => {
    setData([...data].sort(generalSorting));
  }, [sorting, data]);

  return (
    <div className="pr-4">
      {/* SORTING MENU */}
      <div className="mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort by: {sortings[sorting].name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={sorting as string}
                                    onValueChange={(value) => setSorting(value as keyof typeof sortings)}>
              {Object.entries(sortings).map(([key, {name}]) => (
                <DropdownMenuRadioItem key={key} value={key}>
                  {name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* GRID FILE LAYOUT */}
      <div className="grid grid-cols-8 gap-2">
        {loading ?
          Array.from({length: 32}).map((_, index) => (
            <div key={index}
                 className="border rounded-lg shadow-sm p-4 px-2 flex flex-col justify-center items-center gap-2">
              <Skeleton className="rounded-xl h-[36px] w-1/2"/>
              <Skeleton className="rounded-xl h-[24px] w-full"/>
            </div>
          )) : data.map((file) => (
            <div
              key={file.id}
              className="relative border rounded-lg shadow-sm p-4 px-2 flex flex-col justify-center items-center gap-2"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full absolute top-0 right-0">
                    <MoreVertical/>
                  </Button>
                </DropdownMenuTrigger>
                <FileActionsContent file={file}/>
              </DropdownMenu>

              <FileIconFactory file={file} size={36}/>

              <div className="text-center w-24 break-words" title={file.name}>
                {/*I could use truncate but I needed some logic here to show the file extension*/}
                {file.name.length > TRUNCATE_SIZE ? file.name.slice(0, TRUNCATE_SIZE - 3) + '... ' + (file.type === "file" ? file.name.substring(file.name.lastIndexOf('.')) : '') : file.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default FileGrid;
