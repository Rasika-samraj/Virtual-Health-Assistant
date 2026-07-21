
import { useEffect, useRef, useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import ChatMessage, { Message } from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, Pin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SeverityBadge from "@/components/health/SeverityBadge";
import HomeRemedy from "@/components/health/HomeRemedy";
import DoctorRecommendation from "@/components/health/DoctorRecommendation";

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your healthcare assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSymptom, setCurrentSymptom] = useState<{
    name: string;
    severity: "mild" | "moderate" | "severe";
  } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Mock speech recognition
  useEffect(() => {
    if (isListening) {
      // In a real app, this would use the Web Speech API or other speech recognition
      const timer = setTimeout(() => {
        handleSendMessage("I've had a headache since this morning");
        setIsListening(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isListening]);
  
  // Mock speech synthesis
  useEffect(() => {
    if (messages.length > 1 && messages[messages.length - 1].role === "assistant") {
      // In a real app, this would use the Web Speech API or other TTS service
      setIsSpeaking(true);
      const timer = setTimeout(() => {
        setIsSpeaking(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [messages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response based on user input
    setTimeout(() => {
      let responseText = "";
      
      if (text.toLowerCase().includes("headache")) {
        responseText = "I'm sorry to hear about your headache. Can you tell me more about the pain? Is it throbbing, sharp, or dull? And where exactly is the pain located?";
        setCurrentSymptom({ name: "Headache", severity: "mild" });
      } else if (text.toLowerCase().includes("throbbing") || text.toLowerCase().includes("temples")) {
        responseText = "Based on your description, you might be experiencing a tension headache. This is generally a mild condition that can be treated with home remedies. Would you like me to suggest some remedies that might help?";
      } else if (text.toLowerCase().includes("yes") || text.toLowerCase().includes("remedy")) {
        responseText = "Here are some home remedies for your tension headache:\n- Apply a cold or warm compress to your head\n- Practice deep breathing exercises\n- Stay hydrated\n- Take a break from screens\n- Consider over-the-counter pain relievers like acetaminophen or ibuprofen if the pain persists";
      } else if (text.toLowerCase().includes("fever") || text.toLowerCase().includes("vomit")) {
        responseText = "Headache with fever and vomiting could indicate a more serious condition. I recommend consulting with a doctor as soon as possible. Would you like me to find nearby medical facilities?";
        setCurrentSymptom({ name: "Headache with fever", severity: "severe" });
      } else {
        responseText = "I understand. Can you tell me more about your symptoms so I can provide better assistance?";
      }
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };
  
  const toggleVoiceInput = () => {
    if (isListening) {
      setIsListening(false);
      toast({
        title: "Voice input stopped",
        description: "Microphone has been turned off",
      });
    } else {
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak clearly into your microphone",
      });
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">AI Health Consultation</h1>
          {currentSymptom && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Current symptom:</span>
              <SeverityBadge severity={currentSymptom.severity} />
            </div>
          )}
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 h-full">
          <div className="md:col-span-2 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-card shadow-sm">
              <div className="space-y-1">
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message} 
                    isSpeaking={isSpeaking && messages[messages.length - 1].id === message.id}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            <div className="mt-4 relative">
              {messages.length > 4 && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-4 bottom-full mb-2"
                  onClick={scrollToBottom}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              )}
              <ChatInput 
                onSendMessage={handleSendMessage} 
                isListening={isListening}
                onToggleVoice={toggleVoiceInput}
              />
            </div>
          </div>
          
          <div className="hidden md:block space-y-6">
            {currentSymptom && currentSymptom.severity === "mild" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pin className="h-4 w-4" />
                    Recommended Remedies
                  </CardTitle>
                  <CardDescription>
                    Home remedies for {currentSymptom.name.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <HomeRemedy 
                    title="Tension Headache Relief"
                    description="Natural remedies for mild tension headaches"
                    severity="mild"
                    steps={[
                      "Apply a cold or warm compress to your head for 10 minutes",
                      "Practice deep breathing and relaxation techniques",
                      "Stay hydrated by drinking plenty of water",
                      "Take a break from screens and bright lights",
                      "Try gentle neck and shoulder stretches"
                    ]}
                  />
                </CardContent>
              </Card>
            )}
            
            {currentSymptom && currentSymptom.severity === "severe" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Pin className="h-4 w-4" />
                    Medical Attention Needed
                  </CardTitle>
                  <CardDescription>
                    Nearby healthcare professionals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <DoctorRecommendation 
                    name="Dr. Sarah Johnson"
                    specialty="General Practitioner"
                    distance="2.3 miles"
                    address="123 Health Street, Medical Center"
                    phone="(555) 123-4567"
                    availability="Available today"
                  />
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Health Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                    <span>Stay hydrated by drinking 8-10 glasses of water daily</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                    <span>Take short breaks from screens every 20-30 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Pin className="h-4 w-4 text-health-primary shrink-0 mt-0.5" />
                    <span>Practice deep breathing exercises for stress reduction</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;
