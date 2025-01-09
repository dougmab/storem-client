import DataTable from '@/components/tables/DataTable.tsx';
import fileColumns from '@/components/tables/fileColumns.tsx';
import {useState} from 'react';
import {filesDeleteLater} from '@/lib/utils.ts';
import {ScrollArea} from '@/components/ui/scroll-area.tsx';
import {Button} from '@/components/ui/button.tsx';
import {LayoutGrid, Plus} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb.tsx';
import FileGrid from '@/components/FileGrid.tsx';
import {useLayout} from '@/context/layout-provider.tsx';

const Files = () => {
  const {filesLayout, setFilesLayout} = useLayout();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);

  return (
    <div className="h-full flex flex-col rounded-lg border border-border shadow-md p-4 py-2">
      <div className="flex justify-between items-center gap-2 mb-4">
        <div className="flex-1">
          <Breadcrumb>
            <BreadcrumbList className="text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="/files">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator/>
              <BreadcrumbItem>
                <BreadcrumbLink href="/files">example23</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="space-x-2">
          <Button size="icon" variant="outline" onClick={() => {
            setFilesLayout(filesLayout === 'table' ? 'grid' : 'table'); // I could just make a toggle function or something but whatever
          }}>
            <LayoutGrid/>
          </Button>
          <Button>
            <Plus/>
            Upload
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 overflow-y-auto">
        {filesLayout === 'table' ? (
          <DataTable columns={fileColumns} data={filesDeleteLater} loading={loading}/>
        ) : (
          <FileGrid data={filesDeleteLater} loading={loading}/>
        )}
      </ScrollArea>
    </div>
  );
};

export default Files;
