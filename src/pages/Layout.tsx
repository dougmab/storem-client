import {Outlet} from 'react-router-dom';
import Sidebar from '@/components/Sidebar.tsx';
import SearchInput from '@/components/SearchInput.tsx';
import Avatar from '@/components/Avatar.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Bell} from 'lucide-react';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex flex-col flex-1 h-screen">
        <nav className="flex items-center justify-between p-2 gap-2">
          <div className="flex-1">
            <SearchInput onSubmit={(data) => alert(data)} className="max-w-[700px]"/>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <Button size="icon" className="rounded-full" variant="outline">
              <Bell size={24}/>
            </Button>
            <Avatar user={{
              id: '1',
              firstName: 'Douglas',
              lastName: 'Brum',
              email: '',
              avatarColor: 'gray',
            }}/>
          </div>
        </nav>
        <section className="p-2 py-1 flex-1 overflow-hidden">
          <Outlet/>
        </section>
      </main>
    </div>
  );
};
export default Layout;
