
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onRegisterClick: () => void;
}

const HeroSection = ({ onRegisterClick }: HeroSectionProps) => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-secondary to-background">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Connect With Students Who Share Your <span className="text-accent">Passions</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-md">
            Discover meaningful connections based on shared interests and collaborate on projects you truly care about.
          </p>
          <div className="space-x-4">
            <Button size="lg" onClick={onRegisterClick}>
              Get Started
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 md:pl-10">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
            <div className="relative bg-white rounded-lg shadow-xl p-6 z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-passion-purple flex items-center justify-center">
                  <span className="text-white font-bold">PC</span>
                </div>
                <h3 className="text-lg font-semibold">Passion Connect</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 border rounded-md bg-muted/50">
                  <p className="text-sm font-medium">Matched with Alex based on:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="interest-tag selected">Photography</span>
                    <span className="interest-tag selected">Web Development</span>
                    <span className="interest-tag selected">Hiking</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-secondary"></div>
                  <div>
                    <p className="font-medium">Alex Chen</p>
                    <p className="text-sm text-muted-foreground">Computer Science, Year 2</p>
                  </div>
                </div>
                <Button className="w-full">Connect with Alex</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
