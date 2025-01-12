import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {CloudFile} from '@/types.ts';
import {SortingFn} from '@tanstack/react-table';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function formatDate(date: string | Date) {
  if (typeof date === 'string') date = new Date(date);

  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

const filesDeleteLater: CloudFile[] = Array.from({length: 25}, (_, index) => {
  const id = (index + 1).toString();
  const isPrivate = Math.random() > 0.5;
  const isDirectory = Math.random() > 0.7;
  const numUsers = isPrivate ? Math.floor(Math.random() * 13) : 0;
  const access = Array.from({length: numUsers}, (_, userIndex) => ({
    id: (userIndex + 1).toString(),
    firstName: `User${userIndex + 1}`,
    lastName: `LastName${userIndex + 1}`,
    email: `user${userIndex + 1}@example.com`,
    avatarColor: ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'cyan', 'pink', 'teal', 'lime'][Math.floor(Math.random() * 10)],
  }));
  const size = Math.floor(Math.random() * (1000 * Math.floor(Math.random() * 10 * 1024)));
  const updatedAt = new Date(
    Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)
  ).toISOString();

  return {
    id,
    type: isDirectory ? 'directory' : 'file',
    name: isDirectory ? `directory${id}` : `file${id}.txt`,
    accessLevel: isPrivate ? 'private' : 'public',
    access,
    size,
    updatedAt,
  };
});

export {filesDeleteLater};

const collator = new Intl.Collator([], {numeric: true})

export const sortString = (a: string, b: string) => {
  return collator.compare(a, b);
};

export const sortFileBy = <Key extends keyof CloudFile>(key: Key): SortingFn<CloudFile> => {
  return (rowA, rowB) => {
// TODO - Find a way to have access to the column sort direction and make directory always appear first

    if (rowA.original.type !== rowB.original.type) {
      return rowA.original.type === 'directory' ? -1 : 1;
    }

    if (key === 'updatedAt') return new Date(rowA.original.updatedAt).getTime() - new Date(rowB.original.updatedAt).getTime();
    if (typeof rowA.original[key] === 'number' && typeof rowB.original[key] === 'number') return rowA.original[key] - rowB.original[key];
    if (typeof rowA.original[key] === 'string' && typeof rowB.original[key] === 'string') return sortString(rowA.original[key], rowB.original[key]);

    return 0;
  };
};
