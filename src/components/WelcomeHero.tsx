import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SafeMindLogo } from "./SafeMindLogo";
import { Shield, Heart, Users, ArrowRight } from "lucide-react";
import heroImage from "@/assets/safemind-logo.jpg";

interface WelcomeHeroProps {
  onGetStarted: () => void;
}

export const WelcomeHero = ({ onGetStarted }: WelcomeHeroProps) => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Website & App Protection",
      description: "Block harmful websites and unauthorized app installations"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Age-Appropriate Content",
      description: "Automatic content filtering based on your child's age"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "AI Emotional Support",
      description: "24/7 caring chatbot for emotional guidance and counseling"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <SafeMindLogo size="lg" />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Protecting Children in the 
                <span className="text-primary"> Digital World</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                SafeMind uses advanced AI to shield children from cyberbullying, 
                harmful content, and provide emotional support when they need it most.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={onGetStarted} 
                size="lg" 
                className="bg-gradient-primary shadow-glow hover:shadow-soft transition-all duration-300 gap-2"
              >
                Get Started Safely
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/5"
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">99.8%</p>
                <p className="text-sm text-muted-foreground">Threat Detection</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">AI Protection</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Safe Families</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-2xl opacity-20 transform scale-110"></div>
            <img 
              src={heroImage} 
              alt="SafeMind - Protecting children with colorful safety icons"
              className="relative rounded-3xl shadow-glow w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Complete Digital Safety Solution
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SafeMind provides comprehensive protection with three core safety pillars
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-soft transition-all duration-300 border-border/60">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary-soft rounded-xl flex items-center justify-center mx-auto text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};