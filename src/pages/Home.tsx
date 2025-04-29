import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// Sample data for the showcase
// const featuredProducts = [
//   {
//     id: "1",
//     title: "Omra Ramadan 2026",
//     type: "Omra",                                                                        
//     duration: "14 jours",
//     price: "3500€",
//     departure: "Paris",
//     image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
//     agency: "Al-Safar Voyages"
//   },
//   {
//     id: "2",
//     title: "Omra Standard",
//     type: "Omra",
//     duration: "10 jours",
//     price: "2800€",
//     departure: "Marseille",
//     image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
//     agency: "Barakah Tours"
//   },
//   {
//     id: "3",
//     title: "Hajj 2026 Premium",
//     type: "Hajj",
//     duration: "21 jours",
//     price: "7500€",
//     departure: "Paris",
//     image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
//     agency: "Fadila Voyages"
//   },
//   {
//     id: "4",
//     title: "Omra Économique",
//     type: "Omra",
//     duration: "7 jours",
//     price: "1800€",
//     departure: "Lyon",
//     image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=400",
//     agency: "Nur Voyages"
//   }
// ];

// const featuredAgencies = [
//   {
//     id: "1",
//     name: "Al-Safar Voyages",
//     location: "Paris",
//     image: "/placeholder.svg",
//   },
//   {
//     id: "2",
//     name: "Barakah Tours",
//     location: "Marseille",
//     image: "/placeholder.svg",
//   },
//   {
//     id: "3",
//     name: "Fadila Voyages",
//     location: "Lyon",
//     image: "/placeholder.svg",
//   },
//   {
//     id: "4",
//     name: "Nur Voyages",
//     location: "Lille",
//     image: "/placeholder.svg",
//   }
// ];

const faqItems = [
  {
    question: "Quelle est la différence entre le Hajj et l'Omra ?",
    answer: "Le Hajj est le pèlerinage obligatoire que tout musulman doit accomplir une fois dans sa vie s'il en a les moyens, pendant une période précise du calendrier islamique. L'Omra est un pèlerinage mineur qui peut être accompli à tout moment de l'année."
  },
  {
    question: "Quels documents sont nécessaires pour réserver un voyage ?",
    answer: "Pour réserver un voyage Hajj ou Omra, vous aurez généralement besoin d'un passeport valide au moins 6 mois après votre date de retour, un visa spécial pèlerinage, une preuve de vaccination selon les exigences sanitaires en vigueur, et parfois une attestation de mariage pour les femmes accompagnées de leur époux."
  },
  {
    question: "Comment choisir la bonne agence de voyage ?",
    answer: "Pour choisir une bonne agence, vérifiez qu'elle possède une licence officielle, lisez les avis des clients précédents, comparez les offres et services inclus, assurez-vous qu'elle offre un accompagnement spirituel, et renseignez-vous sur l'hébergement et la proximité des lieux saints."
  },
  {
    question: "Quelle est la meilleure période pour effectuer l'Omra ?",
    answer: "L'Omra peut être effectuée à tout moment de l'année. Cependant, les périodes les plus spirituelles sont le mois de Ramadan et les mois sacrés du calendrier islamique. Les périodes moins fréquentées peuvent offrir une expérience plus sereine et souvent des prix plus avantageux."
  },
  {
    question: "Les prix affichés incluent-ils tous les frais ?",
    answer: "Les prix affichés comprennent généralement le vol, l'hébergement, les transferts et l'accompagnement. Cependant, certains frais peuvent être exclus comme les repas, les assurances, ou certaines taxes. Il est toujours recommandé de vérifier précisément ce qui est inclus dans chaque offre."
  }
];

const Home = () => {

// State to hold products and agencies data
  const [products, setProducts] = useState([]);
const [agencies, setAgencies] = useState([]);

// Fetch products and agencies data from the API
useEffect(() => {
  axios.get("http://localhost:8000/api/products")
    .then((res) => setProducts(res.data))
    .catch((err) => console.error("Erreur produits:", err));

  axios.get("http://localhost:8000/api/agencies")
    .then((res) => setAgencies(res.data))
    .catch((err) => console.error("Erreur agences:", err));
}, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-noor-dark py-20 text-center lg:min-h-[90vh]">
        <div className="absolute inset-0 z-0">
          <div 
            className="h-full w-full bg-cover bg-center bg-no-repeat opacity-30" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1920&h=1080')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noor-dark/70 via-noor-dark/60 to-noor-dark"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Votre voyage spirituel <span className="text-noor-gold">commence ici</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl">
            Trouvez les meilleures offres pour votre Omra ou Hajj avec des agences fiables et des services de qualité
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-noor-gold text-noor-dark hover:bg-noor-gold-dark">
              <Link to="/products">Découvrir les offres</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-noor-gold text-noor-gold hover:bg-noor-gold/10 hover:text-noor-gold">
              <Link to="/agencies">Voir les agences</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold text-noor-gold md:text-4xl">
          Pourquoi nous choisir
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-noor-gold/20">
              <Star className="h-7 w-7 text-noor-gold" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-medium text-noor-gold">Qualité</h3>
            <p className="text-gray-300">
              Des agences rigoureusement sélectionnées pour garantir une expérience spirituelle de qualité.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-noor-gold/20">
              <MapPin className="h-7 w-7 text-noor-gold" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-medium text-noor-gold">Proximité</h3>
            <p className="text-gray-300">
              Trouvez facilement une agence proche de chez vous pour un accompagnement personnalisé.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-noor-gold/20">
              <Calendar className="h-7 w-7 text-noor-gold" />
            </div>
            <h3 className="mb-2 font-serif text-xl font-medium text-noor-gold">Flexibilité</h3>
            <p className="text-gray-300">
              Des offres variées pour tous les budgets et toutes les périodes de l'année.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-noor-gold md:text-4xl">
        Meilleures offres
          </h2>
          <Button asChild variant="ghost" className="text-noor-gold hover:text-noor-gold/90">
        <Link to="/products" className="flex items-center gap-1">
          Voir tout <ChevronRight className="h-4 w-4" />
        </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
      <Link 
        key={product.id}
        to={`/products/${product.id}`} 
        className="group overflow-hidden rounded-lg border border-noor-dark-lighter bg-noor-dark-light transition-all hover:border-noor-gold/50"
      >
        <div className="relative h-48 overflow-hidden">
      <img
        src={`http://localhost:8000/${product.images[0]}`}
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
        Par {product.name}
      </p>
      <div className="flex flex-wrap gap-3 text-xs">
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
      </section>

      {/* Featured Agencies */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-noor-gold md:text-4xl">
        Agences partenaires
          </h2>
          <Button asChild variant="ghost" className="text-noor-gold hover:text-noor-gold/90">
        <Link to="/agencies" className="flex items-center gap-1">
          Voir tout <ChevronRight className="h-4 w-4" />
        </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {agencies.slice(0, 4).map((agency) => (
      <Link 
        key={agency.id}
        to={`/agencies/${agency.id}`} 
        className="group flex flex-col items-center rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 text-center transition-all hover:border-noor-gold/50"
      >
        <div className="mb-4 h-20 w-20 overflow-hidden rounded-full">
      <img
        src={agency.image ? `http://localhost:8000/${agency.image}` : "/placeholder.svg"}
        alt={agency.name}
        className="h-full w-full object-cover"
      />
        </div>
        <h3 className="mb-2 font-serif text-lg font-medium text-white group-hover:text-noor-gold">
      {agency.name}
        </h3>
        <p className="mb-4 text-sm text-gray-300">
      <MapPin className="mr-1 inline-block h-4 w-4" /> {agency.location}
        </p>
        <Button variant="ghost" size="sm" className="mt-auto text-noor-gold">
      Voir l'agence
        </Button>
      </Link>
    ))}

        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 md:px-6">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold text-noor-gold md:text-4xl">
          Questions fréquentes
        </h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-noor-dark-lighter">
                <AccordionTrigger className="font-serif text-lg font-medium text-white hover:text-noor-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};

export default Home;
