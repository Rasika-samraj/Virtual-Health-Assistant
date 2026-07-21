
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Activity, MessageCircle, Calendar, Clock, ArrowRight } from "lucide-react";
import HomeRemedy from "@/components/health/HomeRemedy";
import DoctorRecommendation from "@/components/health/DoctorRecommendation";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's an overview of your health activities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Consultations
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Home Remedies
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25</div>
              <p className="text-xs text-muted-foreground">
                +8 this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Doctor Visits
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Scheduled for this month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Health Score
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">
                Good overall health
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="recent">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
              <TabsTrigger value="remedies">Remedies</TabsTrigger>
              <TabsTrigger value="doctors">Doctor Recommendations</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" asChild>
              <Link to="/chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Start New Consultation</span>
              </Link>
            </Button>
          </div>
          
          <TabsContent value="recent" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Health Consultations</CardTitle>
                <CardDescription>
                  Your most recent interactions with the AI healthcare assistant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <h4 className="font-medium">Headache Consultation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tension headache with mild pain near temples
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">Yesterday</span>
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <Link to="/history" className="flex items-center gap-1">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start border-b pb-4">
                    <div>
                      <h4 className="font-medium">Throat Pain</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Sore throat with mild difficulty swallowing
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">3 days ago</span>
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <Link to="/history" className="flex items-center gap-1">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Allergic Reaction</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Skin rash with itching after trying new food
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-muted-foreground">1 week ago</span>
                      <Button variant="ghost" size="sm" className="mt-2" asChild>
                        <Link to="/history" className="flex items-center gap-1">
                          <span>View</span>
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="remedies" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <HomeRemedy 
                title="Tension Headache Relief"
                description="Natural remedies for mild to moderate tension headaches"
                severity="mild"
                steps={[
                  "Apply a cold or warm compress to your head for 10 minutes",
                  "Practice deep breathing and relaxation techniques",
                  "Stay hydrated by drinking plenty of water",
                  "Take a break from screens and bright lights",
                  "Try gentle neck and shoulder stretches"
                ]}
              />
              
              <HomeRemedy 
                title="Sore Throat Soother"
                description="Gentle remedies for minor throat irritation"
                severity="moderate"
                steps={[
                  "Gargle with warm salt water (1/4 teaspoon of salt in 8 oz of water)",
                  "Drink warm herbal tea with honey and lemon",
                  "Use throat lozenges to reduce pain and irritation",
                  "Stay hydrated with room temperature water",
                  "Rest your voice as much as possible"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="doctors" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <DoctorRecommendation 
                name="Dr. Sarah Johnson"
                specialty="General Practitioner"
                distance="2.3 miles"
                address="123 Health Street, Medical Center"
                phone="(555) 123-4567"
                availability="Available tomorrow at 10:00 AM"
              />
              
              <DoctorRecommendation 
                name="Dr. Michael Chen"
                specialty="Neurologist"
                distance="3.5 miles"
                address="456 Wellness Avenue, Neurology Building"
                phone="(555) 987-6543"
                availability="Available Thursday at 2:00 PM"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
