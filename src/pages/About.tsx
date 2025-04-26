
import { Quote } from "lucide-react";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <section className="mb-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 font-serif text-4xl font-bold text-noor-gold md:text-5xl">
            À propos de Safar Al-Noor
          </h1>
          <p className="mb-8 text-xl text-gray-300">
            Votre portail de confiance pour les voyages spirituels
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mb-16 grid gap-12 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&h=800"
            alt="La Kaaba à La Mecque"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noor-dark to-transparent"></div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="mb-6 font-serif text-3xl font-bold text-noor-gold">Notre mission</h2>
          <p className="mb-4 text-gray-300">
            Safar Al-Noor a été créé avec une mission claire : faciliter l'accès aux voyages spirituels pour tous les musulmans désireux d'accomplir le Hajj ou l'Omra.
          </p>
          <p className="mb-4 text-gray-300">
            Notre plateforme sert de pont entre les pèlerins et les agences de voyage spécialisées, offrant une transparence totale et une facilité de comparaison inégalée.
          </p>
          <p className="text-gray-300">
            Nous croyons fermement que chaque musulman devrait pouvoir vivre cette expérience spirituelle transformatrice dans les meilleures conditions possibles, quel que soit son budget ou ses contraintes personnelles.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold text-noor-gold">
          Nos valeurs spirituelles
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <h3 className="mb-4 font-serif text-xl font-medium text-noor-gold">Intégrité</h3>
            <p className="text-gray-300">
              Nous nous engageons à offrir des informations transparentes et vérifiées. Notre sélection d'agences répond à des critères stricts de qualité et d'honnêteté.
            </p>
          </div>
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <h3 className="mb-4 font-serif text-xl font-medium text-noor-gold">Accessibilité</h3>
            <p className="text-gray-300">
              Nous croyons que le pèlerinage devrait être accessible à tous. Notre plateforme présente des options pour tous les budgets sans compromettre l'expérience spirituelle.
            </p>
          </div>
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <h3 className="mb-4 font-serif text-xl font-medium text-noor-gold">Respect</h3>
            <p className="text-gray-300">
              Le respect des traditions et des valeurs islamiques guide chacune de nos actions. Nous honorons le caractère sacré du Hajj et de l'Omra dans tous nos services.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold text-noor-gold">
          Témoignages et sagesse
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <div className="mb-4 flex justify-center">
              <Quote className="h-12 w-12 text-noor-gold opacity-30" />
            </div>
            <blockquote className="mb-6 text-center text-lg italic text-gray-300">
              "Le Hajj est le jihad de chaque homme et femme faibles."
            </blockquote>
            <p className="text-center text-noor-gold">― Hadith rapporté par Ibn Majah</p>
          </div>
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <div className="mb-4 flex justify-center">
              <Quote className="h-12 w-12 text-noor-gold opacity-30" />
            </div>
            <blockquote className="mb-6 text-center text-lg italic text-gray-300">
              "Quiconque fait le pèlerinage pour Allah sans commettre d'obscénité ni de transgression reviendra comme le jour où sa mère l'a mis au monde."
            </blockquote>
            <p className="text-center text-noor-gold">― Hadith, Sahih al-Bukhari</p>
          </div>
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <div className="mb-4 flex justify-center">
              <Quote className="h-12 w-12 text-noor-gold opacity-30" />
            </div>
            <blockquote className="mb-6 text-center text-lg italic text-gray-300">
              "Et fais aux gens une annonce pour le Hajj. Ils viendront vers toi, à pied, et aussi sur toute monture, venant de tout chemin éloigné."
            </blockquote>
            <p className="text-center text-noor-gold">― Coran (22:27)</p>
          </div>
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6">
            <div className="mb-4 flex justify-center">
              <Quote className="h-12 w-12 text-noor-gold opacity-30" />
            </div>
            <blockquote className="mb-6 text-center text-lg italic text-gray-300">
              "La Omra à la Omra est une expiation pour les péchés commis entre les deux, et le Hajj mabrur (accepté) n'a pas d'autre récompense que le Paradis."
            </blockquote>
            <p className="text-center text-noor-gold">― Hadith, Sahih al-Bukhari et Muslim</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mx-auto max-w-3xl rounded-xl bg-gradient-to-r from-noor-dark-light to-noor-dark p-8 text-center">
        <h2 className="mb-4 font-serif text-2xl font-bold text-noor-gold">
          Commencez votre voyage spirituel dès aujourd'hui
        </h2>
        <p className="mb-6 text-gray-300">
          Explorez notre sélection d'agences et d'offres pour trouver le voyage qui correspond à votre cheminement spirituel.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="/agencies"
            className="rounded-md bg-noor-gold px-6 py-3 font-medium text-noor-dark transition-colors hover:bg-noor-gold-dark"
          >
            Découvrir nos agences
          </a>
          <a
            href="/products"
            className="rounded-md border border-noor-gold bg-transparent px-6 py-3 font-medium text-noor-gold transition-colors hover:bg-noor-gold/10"
          >
            Voir toutes les offres
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
