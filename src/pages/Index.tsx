import { useState } from "react";
import { AuthForm } from "@/components/AuthForm";
import { Dashboard } from "@/components/Dashboard";
import { WelcomeHero } from "@/components/WelcomeHero";
import { SafeMindLogo } from "@/components/SafeMindLogo";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<{ name: string; age: number } | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (name: string, age: number) => {
    setUser({ name, age });
  };

  const handleLogout = () => {
    setUser(null);
    setShowAuth(false);
  };

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  // Show welcome hero on first visit
  if (!showAuth && !user) {
    return <WelcomeHero onGetStarted={handleGetStarted} />;
  }

  // Show auth form when user wants to sign in
  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  // Show dashboard when logged in
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <SafeMindLogo size="md" />
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main>
        <Dashboard userAge={user.age} userName={user.name} />
      </main>
    </div>
  );
};

export default Index;
