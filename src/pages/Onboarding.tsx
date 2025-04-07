
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { interestCategories } from "@/data/interests";

const OnboardingSteps = [
  "Personal Information",
  "Academic Details",
  "Select Interests",
  "Complete"
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    university: "",
    major: "",
    year: "",
  });
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else {
      if (selectedInterests.length >= 10) {
        toast({
          variant: "destructive",
          title: "Maximum interests reached",
          description: "You can select up to 10 interests"
        });
        return;
      }
      setSelectedInterests(prev => [...prev, interest]);
    }
  };
  
  const handleNext = () => {
    if (currentStep === 0) {
      if (!profileData.firstName || !profileData.lastName) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please enter your first and last name"
        });
        return;
      }
    } else if (currentStep === 1) {
      if (!profileData.university || !profileData.major) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please enter your university and major"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (selectedInterests.length < 3) {
        toast({
          variant: "destructive",
          title: "More interests needed",
          description: "Please select at least 3 interests"
        });
        return;
      }
    } else if (currentStep === 3) {
      // Save profile and navigate to dashboard
      toast({
        title: "Profile created!",
        description: "Welcome to Passion Connect Nexus"
      });
      navigate("/dashboard");
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="py-4 px-6 border-b bg-white">
        <div className="max-w-6xl mx-auto flex items-center space-x-2">
          <div className="h-8 w-8 bg-passion-purple rounded-full flex items-center justify-center">
            <span className="text-white font-bold">P</span>
          </div>
          <h1 className="text-xl font-bold">Passion Connect Nexus</h1>
        </div>
      </header>
      
      <main className="flex-1 py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">Complete Your Profile</h1>
            <p className="text-muted-foreground">Tell us about yourself so we can connect you with like-minded students</p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex justify-between relative mb-2">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2"></div>
              {OnboardingSteps.map((step, index) => (
                <div 
                  key={step} 
                  className={`relative flex flex-col items-center`}
                >
                  <div 
                    className={`w-6 h-6 rounded-full flex items-center justify-center z-10 
                      ${index <= currentStep ? 'bg-passion-purple text-white' : 'bg-muted text-muted-foreground'}`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1">{step}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">About Me</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="Tell us a little about yourself..."
                      className="min-h-32"
                      value={profileData.bio}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="university">University/College</Label>
                    <Input 
                      id="university"
                      name="university"
                      placeholder="e.g., Stanford University"
                      value={profileData.university}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Field of Study</Label>
                    <Input 
                      id="major"
                      name="major"
                      placeholder="e.g., Computer Science"
                      value={profileData.major}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year of Study</Label>
                    <Input 
                      id="year"
                      name="year"
                      placeholder="e.g., Sophomore, 2nd Year, etc."
                      value={profileData.year}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Your Interests (3-10)</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      These will help us connect you with like-minded students
                    </p>
                    
                    {interestCategories.map(category => (
                      <div key={category.name} className="mb-6">
                        <h3 className="text-lg font-medium mb-3">{category.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          {category.interests.map(interest => (
                            <button
                              key={interest}
                              type="button"
                              className={`interest-tag ${selectedInterests.includes(interest) ? 'selected' : ''}`}
                              onClick={() => toggleInterest(interest)}
                            >
                              {interest}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Selected Interests ({selectedInterests.length}/10):</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedInterests.length === 0 && (
                        <p className="text-sm text-muted-foreground">No interests selected yet</p>
                      )}
                      {selectedInterests.map(interest => (
                        <div key={interest} className="interest-tag selected">
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="text-center py-6">
                  <div className="h-16 w-16 bg-accent/20 rounded-full mx-auto flex items-center justify-center mb-4">
                    <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">You're all set!</h2>
                  <p className="text-muted-foreground mb-6">
                    Your profile is ready. Let's start connecting you with other students who share your passions!
                  </p>
                </div>
              )}
              
              <div className="flex justify-between mt-6 pt-4 border-t">
                {currentStep > 0 ? (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                <Button onClick={handleNext}>
                  {currentStep === OnboardingSteps.length - 1 ? "Go to Dashboard" : "Continue"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
