import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SafeMindLogo } from "./SafeMindLogo";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  onLogin: (name: string, age: number) => void;
}

export const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [loginData, setLoginData] = useState({ name: "", password: "" });
  const [registerData, setRegisterData] = useState({ 
    name: "", 
    password: "", 
    confirmPassword: "", 
    dateOfBirth: "" 
  });
  const { toast } = useToast();

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.name || !loginData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Demo login - in real app, this would validate against a database
    const demoAge = 12; // Demo age for testing
    onLogin(loginData.name, demoAge);
    
    toast({
      title: "Welcome back!",
      description: `Logged in as ${loginData.name}`,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.name || !registerData.password || !registerData.dateOfBirth) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (registerData.password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    const age = calculateAge(registerData.dateOfBirth);
    
    if (age < 5 || age > 18) {
      toast({
        title: "Age Restriction",
        description: "SafeMind is designed for children aged 5-18",
        variant: "destructive"
      });
      return;
    }

    onLogin(registerData.name, age);
    
    toast({
      title: "Account Created!",
      description: `Welcome to SafeMind, ${registerData.name}!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-glow">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <SafeMindLogo size="lg" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome to SafeMind</CardTitle>
            <CardDescription>
              Your trusted AI companion for digital safety
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-name">Name</Label>
                  <Input
                    id="login-name"
                    type="text"
                    placeholder="Enter your name"
                    value={loginData.name}
                    onChange={(e) => setLoginData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-primary shadow-glow">
                  Sign In Safely
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Choose your name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-dob">Date of Birth</Label>
                  <Input
                    id="register-dob"
                    type="date"
                    value={registerData.dateOfBirth}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm">Confirm Password</Label>
                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                </div>

                <Button type="submit" className="w-full bg-gradient-success shadow-glow">
                  Create Safe Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};