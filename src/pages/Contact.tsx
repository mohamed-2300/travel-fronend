import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/mohamedaitbourice@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6 font-serif text-4xl font-bold text-noor-gold md:text-5xl">
          Contactez-nous
        </h1>
        <p className="mb-12 text-xl text-gray-300">
          Nous sommes là pour répondre à toutes vos questions
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Formulaire de contact */}
        <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 md:p-8">
          <h2 className="mb-6 font-serif text-2xl font-bold text-noor-gold">
            Envoyez-nous un message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="_honey" style={{ display: "none" }} />
            <input type="hidden" name="_captcha" value="false" />

            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                name="name"
                placeholder="Votre nom"
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
                required
                className="border-noor-dark-lighter bg-noor-dark"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Comment pouvons-nous vous aider ?"
                required
                rows={6}
                className="border-noor-dark-lighter bg-noor-dark"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-noor-gold text-noor-dark hover:bg-noor-gold-dark"
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </Button>

            {status === "success" && (
              <p className="text-green-500 font-medium text-center animate-pulse">
                ✅ Message envoyé avec succès !
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 font-medium text-center animate-pulse">
                ❌ Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </form>
        </div>

        {/* Informations de contact et carte */}
        <div className="flex flex-col gap-8">
          <div className="rounded-lg border border-noor-dark-lighter bg-noor-dark-light p-6 md:p-8">
            <h2 className="mb-6 font-serif text-2xl font-bold text-noor-gold">
              Nos coordonnées
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-5 w-5 text-noor-gold" />
                <div>
                  <h3 className="font-medium text-white">Email</h3>
                  <p className="text-gray-300">contact@safaralnoor.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-noor-gold" />
                <div>
                  <h3 className="font-medium text-white">Téléphone</h3>
                  <p className="text-gray-300">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-noor-gold" />
                <div>
                  <h3 className="font-medium text-white">Adresse</h3>
                  <p className="text-gray-300">123 Avenue des Champs-Élysées</p>
                  <p className="text-gray-300">75008 Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="aspect-video h-full overflow-hidden rounded-lg border border-noor-dark-lighter">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047033371!2d2.2968911156744837!3d48.87004697928921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4a3e4f3cb%3A0x55be8f5600a12671!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sma!4v1650000000000!5m2!1sen!2sma"
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
      </div>
    </div>
  );
};

export default Contact;
