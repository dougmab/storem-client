import {ColumnDef} from '@tanstack/react-table';
import {File} from '@/types.ts';
import {formatBytes, formatDate, sortFileBy} from '@/lib/utils.ts';
import Avatar from '@/components/Avatar.tsx';
import {MoreHorizontal} from 'lucide-react';
import {DropdownMenu, DropdownMenuTrigger} from '@/components/ui/dropdown-menu.tsx';
import {Button} from '@/components/ui/button.tsx';
import {DataTableColumnHeader} from '@/components/tables/DataTableHeader.tsx';
import FileIconFactory from '@/components/FileIconFactory.tsx';
import FileActionsContent from '@/components/FileActionsContent.tsx';

const fileColumns: ColumnDef<File>[] = [
  {
    accessorKey: 'name',
    header: ({column}) => <DataTableColumnHeader column={column} title="Name"/>,
    cell: ({row}) => {
      return (
        <div className="flex items-center gap-2 line-0">
          <FileIconFactory file={row.original} size={21}/>
          <span>{row.getValue('name')}</span>
        </div>
      );
    },
    sortingFn: sortFileBy('name')
  },
  {
    accessorKey: 'accessLevel',
    header: 'Access',
    cell: ({row}) => {
      const accessLevel = row.getValue('accessLevel') as 'public' | 'private';
      let access = row.original.access;
      if (accessLevel === 'public' || access.length <= 1) return <div
        className="text-muted-foreground">{accessLevel[0].toUpperCase() + accessLevel.slice(1)}</div>;

      // silly workaround to compress displayed users
      let collapsed = false;
      let remaining = 0;
      const limit = 3;

      if (access.length > limit) {
        collapsed = true;
        remaining = access.length - limit;
        const usersToDisplay = Array.from({length: limit}, (_, i) => access[i]);
        access = [...usersToDisplay];
      }

      return <div className="flex relative opacity-80">
        {access.map((user, index) => (
          <div key={user.id} className="relative" style={{left: `${index * -12}px`}}>
            <Avatar user={user} className="border border-background text-xs" size={24}/>
          </div>
        ))}
        {collapsed && <div className="relative size-6 text-xs flex justify-center items-center"
                           style={{left: (limit * -8) + 'px'}}>+{remaining}</div>}
      </div>;
    }
  },
  {
    accessorKey: 'size',
    header: ({column}) => <DataTableColumnHeader column={column} title="Size"/>,
    cell: ({row}) => <div className="text-muted-foreground">{formatBytes(row.getValue('size'))}</div>,
    sortingFn: sortFileBy('size'),
  },
  {
    accessorKey: 'updatedAt',
    header: ({column}) => <DataTableColumnHeader column={column} title="Modified"/>,
    cell: ({row}) => {
      const dateStr = row.getValue('updatedAt') as string;

      return (
        <div className="text-muted-foreground">{formatDate(dateStr)}</div>
      );
    },
    sortingFn: sortFileBy('updatedAt'),
  },
  {
    id: 'actions',
    cell: ({row}) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg">
              <MoreHorizontal/>
            </Button>
          </DropdownMenuTrigger>
          <FileActionsContent file={file}/>
        </DropdownMenu>
      );
    }
  }
];

export default fileColumns;