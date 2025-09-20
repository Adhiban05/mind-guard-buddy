import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, Smartphone } from "lucide-react";
import { ReactNode } from "react";

interface ProtectionCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  stats?: {
    blocked: number;
    label: string;
  };
}

export const ProtectionCard = ({ 
  title, 
  description, 
  icon, 
  isEnabled, 
  onToggle, 
  stats 
}: ProtectionCardProps) => {
  return (
    <Card className="relative overflow-hidden border-border/60 shadow-card hover:shadow-soft transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-soft opacity-50"></div>
      <div className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isEnabled ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'} transition-colors duration-300`}>
                {icon}
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <CardDescription className="text-sm">{description}</CardDescription>
              </div>
            </div>
            <Switch
              checked={isEnabled}
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-success"
            />
          </div>
        </CardHeader>
        
        {stats && (
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stats.label}</span>
              <Badge variant={isEnabled ? "default" : "secondary"} className="font-medium">
                {stats.blocked} blocked today
              </Badge>
            </div>
          </CardContent>
        )}
      </div>
    </Card>
  );
};