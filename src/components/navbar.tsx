
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-noor-dark-lighter bg-noor-dark/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-noor-gold">Safar Al-Noor</span>
        </Link>
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          <Link to="/" className="text-foreground hover:text-noor-gold transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="text-foreground hover:text-noor-gold transition-colors">
            À propos
          </Link>
          <Link to="/agencies" className="text-foreground hover:text-noor-gold transition-colors">
            Agences
          </Link>
          <Link to="/products" className="text-foreground hover:text-noor-gold transition-colors">
            Offres
          </Link>
          <Link to="/contact" className="text-foreground hover:text-noor-gold transition-colors">
            Contact
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-noor-dark p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
                <span className="font-serif text-xl font-bold text-noor-gold">Safar Al-Noor</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="mt-8 flex flex-col gap-6">
              <Link to="/" className="text-lg font-medium text-foreground hover:text-noor-gold" onClick={toggleMenu}>
                Accueil
              </Link>
              <Link to="/about" className="text-lg font-medium text-foreground hover:text-noor-gold" onClick={toggleMenu}>
                À propos
              </Link>
              <Link to="/agencies" className="text-lg font-medium text-foreground hover:text-noor-gold" onClick={toggleMenu}>
                Agences
              </Link>
              <Link to="/products" className="text-lg font-medium text-foreground hover:text-noor-gold" onClick={toggleMenu}>
                Offres
              </Link>
              <Link to="/contact" className="text-lg font-medium text-foreground hover:text-noor-gold" onClick={toggleMenu}>
                Contact
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
