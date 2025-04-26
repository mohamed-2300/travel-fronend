
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-noor-dark-lighter bg-noor-dark">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-lg font-medium text-noor-gold">Safar Al-Noor</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Votre guide pour l'Omra et le Hajj. Nous vous aidons à trouver les meilleures offres pour votre voyage spirituel.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-noor-gold">Liens Rapides</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-noor-gold">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-noor-gold">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/agencies" className="text-muted-foreground hover:text-noor-gold">
                  Agences
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-noor-gold">
                  Offres
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-noor-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-noor-gold">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="text-muted-foreground">Email: contact@safaralnoor.com</li>
              <li className="text-muted-foreground">Téléphone: +33 1 23 45 67 89</li>
              <li className="text-muted-foreground">Adresse: Paris, France</li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-noor-gold">Suivez-nous</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-noor-gold">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-noor-gold">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-noor-gold">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-noor-dark-lighter pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Safar Al-Noor. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
