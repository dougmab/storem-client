import {useEffect, useState} from 'react';
import {File} from '@/types.ts';
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

interface FileGridProps {
  data: File[];
  loading: boolean;
}

interface SortingOption {
  name: string;
  fn: (a: File, b: File) => number;
}

const sortString = (a: string, b: string) => {
  const extractNumbers = (str: string) => {
    const matches = str.match(/\d+/g);
    return matches ? matches.map(Number) : [];
  };

  const numsA = extractNumbers(a);
  const numsB = extractNumbers(b);

  for (let i = 0; i < Math.max(numsA.length, numsB.length); i++) {
    const numA = numsA[i] ?? 0;
    const numB = numsB[i] ?? 0;
    if (numA !== numB) {
      return numA - numB;
    }
  }

  return a.localeCompare(b);
};

const sortings: {
  [key: string]: SortingOption;
} = {
  nameDesc: {
    name: 'A-Z',
    fn: (a: File, b: File) => sortString(a.name, b.name)
  },
  nameAsc: {
    name: 'Z-A',
    fn: (a: File, b: File) => sortString(b.name, a.name)
  },
  sizeAsc: {
    name: 'Smallest Size',
    fn: (a: File, b: File) => a.size - b.size
  },
  sizeDesc: {
    name: 'Biggest Size',
    fn: (a: File, b: File) => b.size - a.size
  },
  updatedAtAsc: {
    name: 'Last Modified',
    fn: (a: File, b: File) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  },
  updatedAtDesc: {
    name: 'First Modified',
    fn: (a: File, b: File) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  },
};

const FileGrid = ({data: dataProp, loading}: FileGridProps) => {
  const generalSorting = (a: File, b: File) => {
    if (a.type !== b.type)
      return a.type === 'directory' ? -1 : 1;

    return sortings[sorting].fn(a, b);
  };

  const [sorting, setSorting] = useState('nameDesc' as keyof typeof sortings);
  const [data, setData] = useState([...dataProp].sort(generalSorting));

  useEffect(() => {
    setData([...data].sort(generalSorting));
  }, [sorting]);

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
          Array.from({length: 20}).map((_, index) => (
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

              <div>
                {file.name}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default FileGrid;
