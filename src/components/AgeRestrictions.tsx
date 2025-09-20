import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, AlertTriangle } from "lucide-react";

interface AgeRestrictionsProps {
  userAge: number;
}

export const AgeRestrictions = ({ userAge }: AgeRestrictionsProps) => {
  const getAgeGroup = (age: number) => {
    if (age <= 7) return { group: "Early Childhood", color: "bg-success", restrictions: "High Protection" };
    if (age <= 12) return { group: "Elementary", color: "bg-warning", restrictions: "Moderate Protection" };
    if (age <= 17) return { group: "Teen", color: "bg-primary", restrictions: "Guided Protection" };
    return { group: "Adult", color: "bg-muted", restrictions: "Personal Choice" };
  };

  const ageInfo = getAgeGroup(userAge);

  const contentCategories = [
    { name: "Educational Content", allowed: true, percentage: 100 },
    { name: "Entertainment (Age-Appropriate)", allowed: true, percentage: 85 },
    { name: "Social Media", allowed: userAge >= 13, percentage: userAge >= 13 ? 60 : 0 },
    { name: "News & Current Events", allowed: userAge >= 10, percentage: userAge >= 10 ? 40 : 0 },
    { name: "Gaming Content", allowed: userAge >= 8, percentage: userAge >= 8 ? 70 : 0 },
  ];

  const recentBlocks = [
    { site: "inappropriate-site.com", reason: "Age restriction", time: "2 hours ago" },
    { site: "violent-game.com", reason: "Content filter", time: "5 hours ago" },
    { site: "mature-content.net", reason: "Age verification failed", time: "1 day ago" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Age-Based Protection</h2>
        <Badge className={`ml-auto ${ageInfo.color} text-white`}>
          Age {userAge} - {ageInfo.group}
        </Badge>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5" />
            Content Access Level
          </CardTitle>
          <CardDescription>
            Automatic restrictions based on your age group: {ageInfo.restrictions}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {contentCategories.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  {category.name}
                </span>
                <Badge variant={category.allowed ? "default" : "destructive"}>
                  {category.allowed ? "Allowed" : "Blocked"}
                </Badge>
              </div>
              <Progress 
                value={category.percentage} 
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertTriangle className="w-5 h-5 text-warning" />
            Recent Blocks
          </CardTitle>
          <CardDescription>
            Content blocked for your protection today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBlocks.map((block, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {block.site}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {block.reason}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {block.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};