import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Search, Calendar, MapPin } from "lucide-react";

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
    image?: string;
  };
  description: string;
  features: string;
  itinerary: string;
  start_date: string;
  end_date: string;
  whatsapp_number: string;
  included: string[];
  excluded: string[];
  images: string[];
  created_at: string;
  updated_at: string;
}

const months = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

const ProductsList = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [departureCities, setDepartureCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    departure: "all",
    month: "all",
    priceRange: [0, 10000]
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://travel-app-0f8mh.sevalla.app/api/products');
        if (!response.ok) throw new Error('Erreur de chargement des produits');
        
        const data = await response.json();
        
        const formattedData = data.map((product: any) => ({
          ...product,
          included: Array.isArray(product.included) ? product.included : product.included?.split(',') || [],
          excluded: Array.isArray(product.excluded) ? product.excluded : product.excluded?.split(',') || [],
          images: Array.isArray(product.images) ? product.images : product.images?.split(',') || []
        }));
        
        setProductsData(formattedData);
        
        // Extract unique departure cities
        const cities = [...new Set(formattedData.map((p: Product) => p.departure))] as string[];
        setDepartureCities(cities);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter handlers (unchanged)
  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, type: value }));
    setCurrentPage(1);
  };

  const handleDepartureChange = (value: string) => {
    setFilters(prev => ({ ...prev, departure: value }));
    setCurrentPage(1);
  };

  const handleMonthChange = (value: string) => {
    setFilters(prev => ({ ...prev, month: value }));
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, priceRange: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      type: "all",
      departure: "all",
      month: "all",
      priceRange: [0, 10000]
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Apply filters
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.agency.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filters.type === "all" || product.type === filters.type;
    const matchesDeparture = filters.departure === "all" || product.departure === filters.departure;
    const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    
    const productMonth = new Date(product.start_date).toLocaleDateString('fr-FR', { month: 'long' });
    const matchesMonth = filters.month === "all" || productMonth.includes(filters.month);
    
    return matchesSearch && matchesType && matchesDeparture && matchesPrice && matchesMonth;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <p className="text-gray-300">Chargement des offres...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <p className="text-red-500">Erreur: {error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-noor-gold text-noor-dark hover:bg-noor-gold-dark"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 font-serif text-4xl font-bold text-noor-gold md:text-5xl">
          Offres Omra & Hajj
        </h1>
        <p className="mb-8 text-xl text-gray-300">
          Trouvez l'offre idéale pour votre voyage spirituel
        </p>
        
        {/* Main Search Bar */}
        <div className="relative mb-12 mx-auto max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une offre ou une agence..."
            className="pl-10 border-noor-dark-lighter bg-noor-dark"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-xl font-bold text-noor-gold">Filtres</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="text-sm text-gray-300 hover:text-noor-gold"
              >
                Réinitialiser
              </Button>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="type" className="border-noor-dark-lighter">
                <AccordionTrigger className="py-4 text-white hover:text-noor-gold">
                  Type de voyage
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="all-types" 
                        checked={filters.type === "all"} 
                        onChange={() => handleTypeChange("all")}
                        className="h-4 w-4 text-noor-gold focus:ring-noor-gold"
                      />
                      <Label htmlFor="all-types" className="cursor-pointer">Tous</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="omra" 
                        checked={filters.type === "Omra"} 
                        onChange={() => handleTypeChange("Omra")}
                        className="h-4 w-4 text-noor-gold focus:ring-noor-gold"
                      />
                      <Label htmlFor="omra" className="cursor-pointer">Omra</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="hajj" 
                        checked={filters.type === "Hajj"} 
                        onChange={() => handleTypeChange("Hajj")}
                        className="h-4 w-4 text-noor-gold focus:ring-noor-gold"
                      />
                      <Label htmlFor="hajj" className="cursor-pointer">Hajj</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="departure" className="border-noor-dark-lighter">
                <AccordionTrigger className="py-4 text-white hover:text-noor-gold">
                  Ville de départ
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    <Select value={filters.departure} onValueChange={handleDepartureChange}>
                      <SelectTrigger className="border-noor-dark-lighter bg-noor-dark">
                        <SelectValue placeholder="Sélectionner une ville" />
                      </SelectTrigger>
                      <SelectContent className="bg-noor-dark-light">
                        <SelectItem value="all">Toutes les villes</SelectItem>
                        {departureCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="period" className="border-noor-dark-lighter">
                <AccordionTrigger className="py-4 text-white hover:text-noor-gold">
                  Période
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
                    <Select value={filters.month} onValueChange={handleMonthChange}>
                      <SelectTrigger className="border-noor-dark-lighter bg-noor-dark">
                        <SelectValue placeholder="Sélectionner un mois" />
                      </SelectTrigger>
                      <SelectContent className="bg-noor-dark-light">
                        <SelectItem value="all">Tous les mois</SelectItem>
                        {months.map(month => (
                          <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="price" className="border-noor-dark-lighter">
                <AccordionTrigger className="py-4 text-white hover:text-noor-gold">
                  Prix
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-2">
                    <Slider
                      defaultValue={[0, 10000]}
                      value={filters.priceRange}
                      max={10000}
                      step={100}
                      onValueChange={handlePriceChange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span>{filters.priceRange[0]}€</span>
                      <span>{filters.priceRange[1]}€</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Results count and sort */}
          {/* <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-300">
              {filteredProducts.length} offre{filteredProducts.length !== 1 ? 's' : ''} trouvée{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div> */}

          {/* Products grid */}
          {currentProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/products/${product.id}`} 
                  className="group overflow-hidden rounded-lg border border-noor-dark-lighter bg-noor-dark-light transition-all hover:border-noor-gold/50"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`https://travel-app-0f8mh.sevalla.app/${product.images[0]}`}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-noor-gold px-3 py-1 text-xs font-medium text-noor-dark">
                      {product.type}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-serif text-lg font-medium text-white group-hover:text-noor-gold">
                      {product.title}
                    </h3>
                    <p className="mb-3 text-sm text-gray-300">
                      Par {product.agency.name}
                    </p>
                    <div className="mb-3 flex items-center gap-2 text-xs text-gray-300">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(product.start_date).toLocaleDateString('fr-FR')} - {' '}
                      {new Date(product.end_date).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="rounded-full bg-noor-dark-lighter px-3 py-1 text-gray-300">
                        {product.duration}
                      </span>
                      <span className="rounded-full bg-noor-dark-lighter px-3 py-1 text-gray-300">
                        <MapPin className="mr-1 inline-block h-3 w-3" />
                        {product.departure}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-noor-gold">
                        {product.price.toLocaleString('fr-FR')}€
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs text-noor-gold">
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex h-40 items-center justify-center rounded-lg border border-noor-dark-lighter bg-noor-dark-light">
              <p className="text-center text-gray-300">
                Aucune offre ne correspond à vos critères de recherche.
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="border-noor-dark-lighter hover:border-noor-gold hover:bg-noor-dark"
                >
                  Précédent
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <Button
                      key={number}
                      variant={number === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => paginate(number)}
                      className={number === currentPage 
                        ? "bg-noor-gold text-noor-dark hover:bg-noor-gold-dark" 
                        : "border-noor-dark-lighter hover:border-noor-gold hover:bg-noor-dark"
                      }
                    >
                      {number}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="border-noor-dark-lighter hover:border-noor-gold hover:bg-noor-dark"
                >
                  Suivant
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;