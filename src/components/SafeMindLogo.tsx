import { Shield } from "lucide-react";

interface SafeMindLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const SafeMindLogo = ({ size = "md", showText = true }: SafeMindLogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl"
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-primary rounded-full blur-sm opacity-30"></div>
        <div className="relative bg-gradient-primary rounded-full p-2 shadow-glow">
          <Shield className={`${sizeClasses[size]} text-primary-foreground`} />
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-foreground tracking-tight`}>
            SafeMind
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            AI Child Protection
          </p>
        </div>
      )}
    </div>
  );
};