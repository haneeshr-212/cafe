import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const Menu = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [user, setUser] = useState<any>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order");

    if (!error && data) {
      setCategories(data);
    }
  };

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("is_available", true)
      .order("display_order");

    if (!error && data) {
      setMenuItems(data);
    }
  };

  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter((item) => item.category_id === selectedCategory);

  const handleQuantityChange = (itemId: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change),
    }));
  };

  const addToCart = async (item: MenuItem) => {
    if (!user) {
      toast.error("Please sign in to add items to cart");
      navigate("/auth");
      return;
    }

    const quantity = quantities[item.id] || 1;

    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("*")
      .eq("user_id", user.id)
      .eq("menu_item_id", item.id)
      .single();

    if (existingItem) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + quantity })
        .eq("id", existingItem.id);

      if (error) {
        toast.error("Failed to update cart");
      } else {
        toast.success(`Added ${quantity} more ${item.name} to cart`);
        setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
      }
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          menu_item_id: item.id,
          quantity,
        });

      if (error) {
        toast.error("Failed to add to cart");
      } else {
        toast.success(`Added ${item.name} to cart`);
        setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-warm bg-clip-text text-transparent">
            Our Menu
          </h1>
          <p className="text-muted-foreground">Explore our delicious selection</p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-gradient-warm" : ""}
          >
            All Items
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id ? "bg-gradient-warm" : ""}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-medium transition-shadow animate-fade-in">
              <div className="h-48 bg-gradient-card overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription className="mt-2">{item.description}</CardDescription>
                  </div>
                  <Badge className="bg-gradient-warm text-primary-foreground">
                    ${item.price.toFixed(2)}
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <div className="flex items-center gap-2 mr-auto">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.id, -1)}
                    disabled={!quantities[item.id]}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-semibold">
                    {quantities[item.id] || 1}
                  </span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={() => addToCart(item)}
                  className="bg-gradient-warm"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
