import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Enhanced NavBar with scroll-based background animation and dark mode support
export function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Animated background colors for light/dark mode
  const bgColor = isDark
    ? scrolled ? "rgba(24,24,27,0.7)" : "rgba(24,24,27,0)" // dark:bg-zinc-900/70
    : scrolled ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0)";
  const borderColor = isDark
    ? scrolled ? "1px solid #27272a" : "1px solid transparent" // dark:border-zinc-800
    : scrolled ? "1px solid #e5e7eb" : "1px solid transparent";

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: bgColor,
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: borderColor,
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 z-50 w-full"
      style={{ WebkitBackdropFilter: scrolled ? "blur(12px)" : "blur(0px)" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-noor-gold">Safar Al-Noor</span>
        </Link>
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          <Link to="/" className="text-foreground dark:text-white hover:text-noor-gold transition-colors">
            Accueil
          </Link>
          <Link to="/about" className="text-foreground dark:text-white hover:text-noor-gold transition-colors">
            À propos
          </Link>
          <Link to="/agencies" className="text-foreground dark:text-white hover:text-noor-gold transition-colors">
            Agences
          </Link>
          <Link to="/products" className="text-foreground dark:text-white hover:text-noor-gold transition-colors">
            Offres
          </Link>
          <Link to="/contact" className="text-foreground dark:text-white hover:text-noor-gold transition-colors">
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/80 dark:bg-zinc-900/80 backdrop-blur-sm md:hidden"
        >
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-noor-dark dark:bg-zinc-900 p-6 shadow-lg">
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
              <Link to="/" className="text-lg font-medium text-foreground dark:text-white hover:text-noor-gold" onClick={toggleMenu}>Accueil</Link>
              <Link to="/about" className="text-lg font-medium text-foreground dark:text-white hover:text-noor-gold" onClick={toggleMenu}>À propos</Link>
              <Link to="/agencies" className="text-lg font-medium text-foreground dark:text-white hover:text-noor-gold" onClick={toggleMenu}>Agences</Link>
              <Link to="/products" className="text-lg font-medium text-foreground dark:text-white hover:text-noor-gold" onClick={toggleMenu}>Offres</Link>
              <Link to="/contact" className="text-lg font-medium text-foreground dark:text-white hover:text-noor-gold" onClick={toggleMenu}>Contact</Link>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
