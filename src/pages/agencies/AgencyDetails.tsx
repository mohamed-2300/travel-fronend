import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Mail, Phone, ChevronRight, MessageSquare } from "lucide-react";

interface Agency {
  id: number;
  name: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  smallDescription: string;
  bigDescription: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  type: string;
  duration: string;
  price: string;
  departure: string;
  images: string[];
  agencyId: number;
}


const AgencyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch agency details
        const agencyResponse = await fetch(`http://localhost:8000/api/agencies/${id}`);
        if (!agencyResponse.ok) throw new Error("Agence non trouvée");
        const agencyData = await agencyResponse.json();
        setAgency(agencyData);

        // Fetch agency products
        const productsResponse = await fetch(`http://localhost:8000/api/products?agency_id=${id}`);
        const productsData = await productsResponse.ok ? await productsResponse.json() : [];
        setProducts(productsData);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`http://localhost:8000/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          agency_id: id
        }),
      });

      if (!response.ok) throw new Error("Échec de l'envoi");

      toast({
        title: "Message envoyé",
        description: `Votre message a été envoyé à ${agency?.name}. Ils vous contacteront prochainement.`,
      });
      setFormData({ name: "", email: "", message: "" });

    } catch (err) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <p className="text-gray-300">Chargement des détails de l'agence...</p>
      </div>
    );
  }

  if (error || !agency) {
    return (
      <div className="container mx-auto px-4 py-16 md:px-6 text-center">
        <h1 className="mb-6 text-2xl font-bold text-noor-gold">Agence non trouvée</h1>
        <p className="mb-6 text-gray-300">{error || "L'agence que vous recherchez n'existe pas."}</p>
        <Button asChild className="bg-noor-gold text-noor-dark hover:bg-noor-gold-dark">
          <Link to="/agencies">Voir toutes les agences</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      {/* Agency Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full">
          <img
            src={agency.image ? `http://localhost:8000/${agency.image}` : "/placeholder.svg"}
            alt={agency.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="mb-4 font-serif text-4xl font-bold text-noor-gold md:text-5xl">
          {agency.name}
        </h1>
        <p className="mb-6 flex items-center justify-center text-xl text-gray-300">
          <MapPin className="mr-2 h-5 w-5 text-noor-gold" /> {agency.location}
        </p>
      </div>

      {/* Agency Details Section */}
      <div className="grid gap-12 lg:grid-cols-3">
        {/* Left Column - Agency Info */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 md:p-8">
            <h2 className="mb-6 font-serif text-2xl font-bold text-noor-gold">À propos de l'agence</h2>
            <p className="mb-8 text-gray-300 leading-relaxed">{agency.bigDescription || agency.smallDescription}</p>
            
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-md bg-noor-dark p-4">
                <h3 className="mb-2 font-medium text-noor-gold">Adresse</h3>
                <p className="text-gray-300">{agency.address}</p>
              </div>
              <div className="rounded-md bg-noor-dark p-4">
                <h3 className="mb-2 font-medium text-noor-gold">Email</h3>
                <p className="text-gray-300">{agency.email}</p>
              </div>
              <div className="rounded-md bg-noor-dark p-4">
                <h3 className="mb-2 font-medium text-noor-gold">Téléphone</h3>
                <p className="text-gray-300">{agency.phone}</p>
              </div>
              <div className="rounded-md bg-noor-dark p-4">
                <h3 className="mb-2 font-medium text-noor-gold">Site web</h3>
                <p className="text-gray-300">{agency.website}</p>
              </div>
            </div>

            {/* Google Map */}
            <div className="aspect-video overflow-hidden rounded-lg border border-noor-dark-lighter">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047033371!2d2.2968911156744837!3d48.87004697928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4a3e4f3cb%3A0x55be8f5600a12671!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sma!4v1650000000000!5m2!1sen!2sma`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Agency Products */}
          <div className="mt-8 rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-noor-gold">
                Offres proposées
              </h2>
              <Button asChild variant="ghost" className="text-noor-gold hover:text-noor-gold/90">
                <Link to="/products" className="flex items-center gap-1">
                  Voir tout <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link 
                  key={product.id}
                  to={`/products/${product.id}`} 
                  className="group overflow-hidden rounded-lg border border-noor-dark-lighter bg-noor-dark transition-all hover:border-noor-gold/50"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={`http://localhost:8000/${product.images[0]}`} 
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
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full bg-noor-dark-lighter px-3 py-1 text-gray-300">
                        {product.duration}
                      </span>
                      <span className="rounded-full bg-noor-dark-lighter px-3 py-1 text-gray-300">
                        {product.departure}
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-noor-gold">
                        {product.price}
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs text-noor-gold">
                        Détails
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 md:p-8">
            <h2 className="mb-6 font-serif text-2xl font-bold text-noor-gold">
              Contacter l'agence
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-noor-dark-lighter bg-noor-dark"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-noor-dark-lighter bg-noor-dark"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Votre message ou question..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-noor-dark-lighter bg-noor-dark"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-noor-gold text-noor-dark hover:bg-noor-gold-dark"
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </div>

          <a
            href={`https://wa.me/${agency.phone.replace(/\s+/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border border-green-600 bg-green-600 p-4 text-white transition-colors hover:bg-green-700"
          >
            <MessageSquare className="h-5 w-5" />
            Contacter sur WhatsApp
          </a>

          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 md:p-8">
            <h2 className="mb-4 font-serif text-xl font-bold text-noor-gold">
              Contact direct
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-noor-gold" />
                <div>
                  <h3 className="font-medium text-white">Email</h3>
                  <a href={`mailto:${agency.email}`} className="text-gray-300 hover:text-noor-gold">
                    {agency.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-noor-gold" />
                <div>
                  <h3 className="font-medium text-white">Téléphone</h3>
                  <a href={`tel:${agency.phone.replace(/\s+/g, '')}`} className="text-gray-300 hover:text-noor-gold">
                    {agency.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyDetails;