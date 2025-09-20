import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Heart, Calendar, Phone } from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: "positive" | "negative" | "neutral";
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hi there! I'm your SafeMind friend. How are you feeling today? 😊",
      isUser: false,
      timestamp: new Date(),
      sentiment: "positive"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const analyzeSentiment = (text: string): "positive" | "negative" | "neutral" => {
    const positiveWords = ["happy", "good", "great", "awesome", "love", "excited", "wonderful"];
    const negativeWords = ["sad", "bad", "angry", "hate", "terrible", "awful", "scared", "worried"];
    
    const lowerText = text.toLowerCase();
    const hasPositive = positiveWords.some(word => lowerText.includes(word));
    const hasNegative = negativeWords.some(word => lowerText.includes(word));
    
    if (hasNegative) return "negative";
    if (hasPositive) return "positive";
    return "neutral";
  };

  const generateResponse = (userMessage: string, sentiment: "positive" | "negative" | "neutral"): string => {
    const responses = {
      positive: [
        "That's wonderful to hear! Keep up the positive energy! ⭐",
        "I'm so glad you're feeling good! What made your day special? 🌟",
        "Your positivity is amazing! Want to share what's making you happy? 😊"
      ],
      negative: [
        "I'm sorry you're feeling this way. Remember, it's okay to have difficult feelings. Would you like to talk about it? 💙",
        "Thank you for sharing with me. You're brave for expressing your feelings. How can I help? 🤗",
        "I hear you, and your feelings are valid. Sometimes talking helps - I'm here to listen. 💚"
      ],
      neutral: [
        "Thanks for sharing! Is there anything specific on your mind today? 🤔",
        "I'm here to chat whenever you need. What would you like to talk about? 💭",
        "How has your day been so far? I'd love to hear about it! 🌸"
      ]
    };
    
    const sentimentResponses = responses[sentiment];
    return sentimentResponses[Math.floor(Math.random() * sentimentResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      sentiment: analyzeSentiment(inputValue)
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue, userMessage.sentiment || "neutral"),
        isUser: false,
        timestamp: new Date(),
        sentiment: "positive"
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-card">
      <CardHeader className="bg-gradient-soft border-b border-border/60">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent-foreground" />
              SafeMind Companion
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your caring AI friend for emotional support
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Book Session
            </Button>
            <Button size="sm" variant="destructive" className="gap-2">
              <Phone className="w-4 h-4" />
              Emergency Help
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.sentiment && !message.isUser && (
                  <Badge
                    variant="outline"
                    className={`mt-2 text-xs ${
                      message.sentiment === "positive"
                        ? "border-success text-success-foreground"
                        : message.sentiment === "negative"
                        ? "border-destructive text-destructive-foreground"
                        : "border-muted-foreground"
                    }`}
                  >
                    {message.sentiment}
                  </Badge>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border/60">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share how you're feeling..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};