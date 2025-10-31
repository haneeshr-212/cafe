import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { UtensilsCrossed, Truck, Clock, Star } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to <span className="bg-gradient-warm bg-clip-text text-transparent">MHP</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Delicious food, delivered to your door
          </p>
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/menu">
              <Button size="lg" className="bg-gradient-warm text-lg px-8">
                Order Now
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-warm bg-clip-text text-transparent">
            Why Choose MHP?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-medium transition-all animate-fade-in">
              <CardContent className="pt-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-warm flex items-center justify-center">
                  <UtensilsCrossed className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fresh Ingredients</h3>
                <p className="text-sm text-muted-foreground">
                  We use only the freshest, highest quality ingredients
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-all animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="pt-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-warm flex items-center justify-center">
                  <Truck className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Hot meals delivered quickly to your doorstep
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-all animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="pt-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-warm flex items-center justify-center">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Open Late</h3>
                <p className="text-sm text-muted-foreground">
                  Order anytime - we're here when you need us
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-medium transition-all animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardContent className="pt-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-warm flex items-center justify-center">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Top Rated</h3>
                <p className="text-sm text-muted-foreground">
                  Loved by thousands of satisfied customers
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of happy customers enjoying delicious food
          </p>
          <Link to="/menu">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
              Explore Menu
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 MHP Food Ordering System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
