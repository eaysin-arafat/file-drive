import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const UserCell = ({ userId }: { userId: Id<'users'> }) => {
  const userProfile = useQuery(api?.users?.getUserProfile, {
    userId: userId
  });

  return (
    <div className="flex items-center gap-2 text-xs">
      <Avatar className="h-6 w-6">
        <AvatarImage src={userProfile?.image} />
        <AvatarFallback>{userProfile?.name}</AvatarFallback>
      </Avatar>
      {userProfile?.name}
    </div>
  );
};

export default UserCell;
