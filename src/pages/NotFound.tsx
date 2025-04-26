
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="mb-2 font-serif text-6xl font-bold text-noor-gold">404</h1>
      <h2 className="mb-6 font-serif text-3xl font-medium text-white">Page non trouvée</h2>
      <p className="mb-8 max-w-md text-gray-300">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Button asChild className="bg-noor-gold text-noor-dark hover:bg-noor-gold-dark">
        <Link to="/">Retourner à l'accueil</Link>
      </Button>
    </div>
  );
};

export default NotFound;
