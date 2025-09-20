import { useState } from "react";
import { ProtectionCard } from "./ProtectionCard";
import { ChatBot } from "./ChatBot";
import { AgeRestrictions } from "./AgeRestrictions";
import { Globe, Smartphone, Shield, Users, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DashboardProps {
  userAge: number;
  userName: string;
}

export const Dashboard = ({ userAge, userName }: DashboardProps) => {
  const [webProtection, setWebProtection] = useState(true);
  const [appProtection, setAppProtection] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Your digital safety dashboard is ready to protect you
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success-soft rounded-lg">
                  <Shield className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">247</p>
                  <p className="text-sm text-muted-foreground">Threats Blocked</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Safe Interactions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent rounded-lg">
                  <Activity className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-sm text-muted-foreground">Safety Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Protection Controls */}
          <div className="space-y-6">
            {/* Section 1: Website & App Protection */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Digital Protection</h2>
                <Badge variant="outline" className="ml-auto">Active</Badge>
              </div>
              
              <ProtectionCard
                title="Website Security"
                description="Block harmful and unverified websites"
                icon={<Globe className="w-5 h-5" />}
                isEnabled={webProtection}
                onToggle={setWebProtection}
                stats={{ blocked: 23, label: "Unsafe sites" }}
              />
              
              <ProtectionCard
                title="App Protection"
                description="Prevent unauthorized app installations"
                icon={<Smartphone className="w-5 h-5" />}
                isEnabled={appProtection}
                onToggle={setAppProtection}
                stats={{ blocked: 5, label: "Blocked apps" }}
              />
            </div>

            {/* Section 2: Age-based Content Restrictions */}
            <AgeRestrictions userAge={userAge} />
          </div>

          {/* Right Column - AI Chatbot */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-accent-foreground" />
              <h2 className="text-xl font-semibold text-foreground">Emotional Support</h2>
              <Badge variant="outline" className="ml-auto text-accent-foreground border-accent">24/7 Available</Badge>
            </div>
            <ChatBot />
          </div>
        </div>
      </div>
    </div>
  );
};