export interface File {
  id: string;
  name: string;
  type: 'file' | 'directory';
  accessLevel: 'private' | 'public';
  access: User[];
  size: number;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarColor: string;
}