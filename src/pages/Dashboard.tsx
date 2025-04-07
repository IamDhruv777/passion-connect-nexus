
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, Bell, Settings, LogOut, UserPlus, User } from "lucide-react";
import UserCard from "@/components/UserCard";
import { mockUsers } from "@/data/mockUsers";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("discover");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter users based on search query
  const filteredUsers = searchQuery 
    ? mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.interests.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : mockUsers;
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-passion-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <h1 className="text-xl font-bold">Passion Connect Nexus</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="hidden md:block w-64 border-r bg-white p-4">
          <div className="space-y-1">
            <Button 
              variant={activeTab === "discover" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("discover")}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Discover
            </Button>
            <Button 
              variant={activeTab === "connections" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("connections")}
            >
              <User className="mr-2 h-4 w-4" />
              Connections
            </Button>
            <Button 
              variant={activeTab === "messages" ? "secondary" : "ghost"} 
              className="w-full justify-start" 
              onClick={() => setActiveTab("messages")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </Button>
          </div>
          
          <div className="border-t mt-6 pt-6">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-6 bg-muted/30 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold">Welcome, John!</h1>
                <p className="text-muted-foreground">Discover new connections based on your interests</p>
              </div>
              
              <div className="mt-4 md:mt-0 relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
                <Input 
                  placeholder="Search interests or people..." 
                  className="pl-9 w-full md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Mobile tabs */}
            <div className="block md:hidden mb-6">
              <Tabs 
                defaultValue="discover" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger value="discover" className="flex-1">Discover</TabsTrigger>
                  <TabsTrigger value="connections" className="flex-1">Connections</TabsTrigger>
                  <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {activeTab === "discover" && (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.slice(0, 6).map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Browse by Interest</h2>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {["Photography", "Web Development", "Music", "Art", "Machine Learning", 
                      "Poetry", "Gaming", "Hiking", "Cooking", "Basketball"].map((interest) => (
                      <Badge key={interest} variant="outline" className="hover:bg-accent hover:text-accent-foreground cursor-pointer">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">All Students</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.slice(0, 9).map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {activeTab === "connections" && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Your Connections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.slice(0, 3).map((user) => (
                    <UserCard key={user.id} user={user} showMessage={true} />
                  ))}
                </div>
                
                {filteredUsers.length === 0 && (
                  <Card className="text-center p-6">
                    <CardContent className="pt-6">
                      <div className="h-16 w-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                        <User className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No connections yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start discovering students to make your first connection
                      </p>
                      <Button onClick={() => setActiveTab("discover")}>
                        Discover Students
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
            
            {activeTab === "messages" && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Messages</h2>
                
                <Card className="text-center p-6">
                  <CardContent className="pt-6">
                    <div className="h-16 w-16 bg-muted rounded-full mx-auto flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Connect with other students to start messaging
                    </p>
                    <Button onClick={() => setActiveTab("discover")}>
                      Discover Students
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
