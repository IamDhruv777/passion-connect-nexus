
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import Login from "@/components/Login";
import Register from "@/components/Register";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };
  
  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };
  
  const handleClose = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-4 px-6 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-passion-purple rounded-full flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <h1 className="text-xl font-bold">Passion Connect Nexus</h1>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </div>
      </header>
      
      <main className="flex-1">
        <HeroSection onRegisterClick={handleRegisterClick} />
        
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
                  <p className="text-muted-foreground">Sign up and tell us about yourself and your interests</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Discover Connections</h3>
                  <p className="text-muted-foreground">Our algorithm finds students with similar interests</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <div className="h-12 w-12 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Connect & Collaborate</h3>
                  <p className="text-muted-foreground">Message your matches and build meaningful relationships</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-6 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Passion Connect Nexus. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="sm">About</Button>
            <Button variant="ghost" size="sm">Privacy</Button>
            <Button variant="ghost" size="sm">Terms</Button>
            <Button variant="ghost" size="sm">Contact</Button>
          </div>
        </div>
      </footer>

      {showLogin && <Login onClose={handleClose} onRegisterClick={handleRegisterClick} />}
      {showRegister && <Register onClose={handleClose} onLoginClick={handleLoginClick} />}
    </div>
  );
};

export default Index;
