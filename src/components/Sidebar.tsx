import {Files, LayoutDashboardIcon, LogOut, LucideIcon, Share2, Star} from 'lucide-react';
import {Link, NavLink, useLocation} from 'react-router-dom';

interface Link {
  name: string;
  url: string;
  icon: LucideIcon;
}

const links: (Link | null)[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon
  },
  {
    name: 'Files',
    url: '/files',
    icon: Files
  },
  null,
  {
    name: 'Shared with me',
    url: '/shared',
    icon: Share2
  },
  {
    name: 'Favorites',
    url: '/favorites',
    icon: Star
  },
  null,
  {
    name: 'Log out',
    url: '/login',
    icon: LogOut
  }
];

const SidebarItem = ({link, active = false}: { link: Link, active?: boolean }) => {
  const activeClasses = active ? 'bg-sidebar-primary text-sidebar-primary-foreground' : 'text-foreground';

  return (
    <li>
      <NavLink to={link.url} className={`flex items-center gap-2 rounded-full p-2 ${activeClasses} text-sm`}>
        <link.icon size={14}/>
        <span>{link.name}</span>
      </NavLink>
    </li>
  );
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="flex flex-col justify-between sticky top-0 w-[250px] h-screen bg-sidebar border border-sidebar-border p-2 shadow-md">
      <div>
        <h1 className="text-lg font-bold mb-6 text-primary">Storem</h1>
        <ul className="flex flex-col gap-2 list-none">
          {links.map((link, index) => link ?
            <SidebarItem key={index} link={link} active={location.pathname === link.url}/> : <hr key={index}/>)}
        </ul>
      </div>

      <div>
        Storage Here
      </div>
    </aside>
  );
};

export default Sidebar;
