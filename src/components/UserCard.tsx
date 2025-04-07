
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    major: string;
    university: string;
    interests: string[];
    matchPercentage: number;
  };
  showMessage?: boolean;
}

const UserCard = ({ user, showMessage = false }: UserCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-2 py-1 rounded-bl-md font-medium text-sm">
          {user.matchPercentage}% Match
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.major}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3">{user.university}</p>

        <div className="mb-4">
          <p className="text-sm font-medium mb-1">Shared Interests</p>
          <div className="flex flex-wrap gap-1">
            {user.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {user.interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{user.interests.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button className="flex-1">
            <UserPlus className="mr-2 h-4 w-4" />
            Connect
          </Button>
          {showMessage && (
            <Button variant="outline" className="flex-1">
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
