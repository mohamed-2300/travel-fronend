import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface Agency {
  id: number;
  name: string;
  location: string;
  image: string;
  smallDescription: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
  bigDescription?: string;
}

const AgenciesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('https://travel-app-0f8mh.sevalla.app/api/agencies');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des agences');
        }
        const data = await response.json();
        setAgencies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchAgencies();
  }, []);

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center text-gray-300">
        Chargement des agences...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center text-red-400">
        {error}
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 font-serif text-4xl font-bold text-noor-gold md:text-5xl">
          Nos agences partenaires
        </h1>
        <p className="mb-8 text-xl text-gray-300">
          Des agences sélectionnées avec soin pour votre voyage spirituel
        </p>
        
        {/* Search Bar */}
        <div className="relative mb-12 mx-auto max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une agence ou une ville..."
            className="pl-10 border-noor-dark-lighter bg-noor-dark"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Agencies Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredAgencies.map((agency) => (
          <div 
            key={agency.id}
            className="group overflow-hidden rounded-lg border border-noor-dark-lighter bg-noor-dark-light transition-all hover:border-noor-gold/50"
          >
            <div className="flex flex-col items-center p-6 text-center">
              <div className="mb-4 h-20 w-20 overflow-hidden rounded-full">
                <img
                  src={agency.image ? `https://travel-app-0f8mh.sevalla.app/${agency.image}` : "/placeholder.svg"}
                  alt={agency.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mb-2 font-serif text-xl font-medium text-white group-hover:text-noor-gold">
                {agency.name}
              </h3>
              <p className="mb-3 text-sm text-gray-300">
                <MapPin className="mr-1 inline-block h-4 w-4" /> {agency.location}
              </p>
              <p className="mb-6 text-gray-300 line-clamp-2">
                {agency.smallDescription}
              </p>
              <Button asChild className="bg-noor-gold text-noor-dark hover:bg-noor-gold-dark">
                <Link to={`/agencies/${agency.id}`}>
                  Voir l'agence
                </Link>
              </Button>
            </div>
          </div>
        ))}

        {filteredAgencies.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <p className="text-xl text-gray-300">
              Aucune agence ne correspond à votre recherche.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgenciesList;