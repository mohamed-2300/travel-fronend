import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Star, 
  ChevronRight, 
  Building, 
  MessageSquare 
} from "lucide-react";

interface Product {
  id: number;
  title: string;
  type: string;
  duration: string;
  price: number;
  departure: string;
  agency_id: number;
  agency: {
    id: number;
    name: string;
    image: string;
    location: string;
  };
  description: string;
  features: string[];
  itinerary: string[];
  start_date: string;
  end_date: string;
  whatsapp_number: string;
  included: string[];
  excluded: string[];
  images: string[];
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${id}`);
        if (!response.ok) throw new Error('Produit non trouvé');
        
        const data = await response.json();
        
        // Formatage des données si nécessaire
        const formattedProduct = {
          ...data,
          features: data.features ? (Array.isArray(data.features) ? data.features : data.features.split(',')) : [],
          itinerary: data.itinerary ? (Array.isArray(data.itinerary) ? data.itinerary : data.itinerary.split(',')) : [],
          included: data.included ? (Array.isArray(data.included) ? data.included : data.included.split(',')) : [],
          excluded: data.excluded ? (Array.isArray(data.excluded) ? data.excluded : data.excluded.split(',')) : [],
          images: data.images ? (Array.isArray(data.images) ? data.images : data.images.split(',')) : []
        };
        
        setProduct(formattedProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <p className="text-gray-300">Chargement du produit...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <h1 className="mb-6 text-2xl font-bold text-noor-gold">Offre non trouvée</h1>
        <p className="mb-6 text-gray-300">{error || "L'offre que vous recherchez n'existe pas."}</p>
        <Button asChild className="bg-noor-gold text-noor-dark hover:bg-noor-gold-dark">
          <Link to="/products">Voir toutes les offres</Link>
        </Button>
      </div>
    );
  }

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
        <Link to="/" className="hover:text-noor-gold">Accueil</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-noor-gold">Offres</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-noor-gold">{product.title}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Photo Gallery */}
          <div className="mb-8 overflow-hidden rounded-lg">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-full h-80 sm:h-96">
                <img
                  src={`http://localhost:8000/${product.images[0]}`}
                  alt={product.title}
                  className="h-full w-full rounded-lg object-cover"
                /> 
              </div>
              {product.images.length > 1 && (
                <>
                  <div className="h-40">
                    <img
                      src={`http://localhost:8000/${product.images[1]}`}
                      alt={product.title}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="h-40">
                    <img
                      src={`http://localhost:8000/${product.images[2]}`}
                      alt={product.title}
                      className="h-full w-full rounded-lg object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Title and Agency */}
          <div className="mb-8">
            <div className="mb-4 flex items-center">
              <span className="mr-3 rounded-full bg-noor-gold px-3 py-1 text-xs font-medium text-noor-dark">
                {product.type}
              </span>
              <Link 
                to={`/agencies/${product.agency_id}`}
                className="flex items-center text-sm text-gray-300 hover:text-noor-gold"
              >
                <Building className="mr-1 h-4 w-4" />
                Par {product.agency.name}
              </Link>
            </div>
            <h1 className="mb-4 font-serif text-3xl font-bold text-noor-gold md:text-4xl">
              {product.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center text-gray-300">
                <Calendar className="mr-2 h-4 w-4 text-noor-gold" />
                {formatDate(product.start_date)} - {formatDate(product.end_date)}
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="mr-2 h-4 w-4 text-noor-gold" />
                {product.duration}
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="mr-2 h-4 w-4 text-noor-gold" />
                Départ de {product.departure}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <h2 className="mb-4 font-serif text-2xl font-bold text-noor-gold">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-8 rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <h2 className="mb-4 font-serif text-2xl font-bold text-noor-gold">
              Points forts
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Star className="mr-2 h-5 w-5 text-noor-gold" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Itinerary */}
          <div className="mb-8 rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <h2 className="mb-4 font-serif text-2xl font-bold text-noor-gold">
              Itinéraire
            </h2>
            <ol className="space-y-3">
              {product.itinerary.map((day, index) => (
                <li key={index} className="flex">
                  <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-noor-gold/20 text-xs font-medium text-noor-gold">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{day}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* What's Included/Excluded */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
              <h2 className="mb-4 font-serif text-xl font-bold text-noor-gold">
                Ce qui est inclus
              </h2>
              <ul className="space-y-2">
                {product.included.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="mr-2 text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
              <h2 className="mb-4 font-serif text-xl font-bold text-noor-gold">
                Non inclus
              </h2>
              <ul className="space-y-2">
                {product.excluded.map((item, index) => (
                  <li key={index} className="flex items-start text-gray-300">
                    <span className="mr-2 text-red-500">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* Booking Card */}
            <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
              <div className="mb-4 text-center">
                <p className="mb-1 text-sm text-gray-300">Prix par personne</p>
                <p className="text-3xl font-bold text-noor-gold">{product.price.toLocaleString('fr-FR')}€</p>
              </div>
              
              <div className="mb-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Type</span>
                  <span className="font-medium text-white">{product.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Durée</span>
                  <span className="font-medium text-white">{product.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Départ</span>
                  <span className="font-medium text-white">{product.departure}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Dates</span>
                  <span className="font-medium text-white">{formatDate(product.start_date)}</span>
                </div>
              </div>
              
              <a
                href={`https://wa.me/${product.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700"
              >
                <MessageSquare className="h-5 w-5" />
                Réserver sur WhatsApp
              </a>
            </div>

            {/* Agency Card */}
            <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 h-16 w-16 overflow-hidden rounded-full">
                  <img
                    src={product.agency.image || "/placeholder-agency.jpg"}
                    alt={product.agency.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-1 font-medium text-white">{product.agency.name}</h3>
                <p className="mb-4 text-sm text-gray-300">
                  <MapPin className="mr-1 inline-block h-3.5 w-3.5" /> {product.agency.location}
                </p>
                <Button asChild variant="outline" size="sm" className="w-full border-noor-gold text-noor-gold hover:bg-noor-gold/10">
                  <Link to={`/agencies/${product.agency_id}`}>
                    Voir l'agence
                  </Link>
                </Button>
              </div>
            </div>

            {/* Need Help */}
            <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
              <h3 className="mb-4 font-medium text-noor-gold">Besoin d'aide ?</h3>
              <p className="mb-4 text-sm text-gray-300">
                Pour toute question sur cette offre, n'hésitez pas à contacter directement l'agence.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-300">
                  <MessageSquare className="mr-2 h-4 w-4 text-noor-gold" />
                  WhatsApp: {product.whatsapp_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;