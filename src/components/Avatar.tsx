import {User} from '@/types.ts';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip.tsx';

const Avatar = ({user, className, size = 36}: { user: User, className?: string, size?: number }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex justify-center items-center rounded-full bg-gray-600 text-primary-foreground ${className}`}
            style={{
              backgroundColor: user.avatarColor,
              width: `${size}px`,
              height: `${size}px`,
          }}>
            <span className="cursor-default">{user.firstName[0]}{user.lastName[0]}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="">
            <div className="text-sm font-bold">{user.firstName} {user.lastName}</div>
            <div className="font-light">{user.email}</div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default Avatar;
