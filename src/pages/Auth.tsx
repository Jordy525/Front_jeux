
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import mascotImage from "@/assets/mascot-ecofarm.png";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-farm-gabon.jpg";

const Auth = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked");
    navigate("/menu");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="h-screen w-screen overflow-hidden relative bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 md:top-8 md:left-8 z-20 flex items-center gap-2 text-white/80 hover:text-white transition-all hover:scale-110"
      >
        <ArrowLeft size={24} />
        <span className="text-sm md:text-lg font-medium">Retour</span>
      </button>

      {/* Layout (2 zones: gauche mascotte, droite contenu) */}
      <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 px-6 py-6 md:px-16 md:py-10">
        {/* Mascotte */}
        <div className="flex justify-center items-center">
          <div className="relative w-40 h-40 md:w-64 md:h-64 flex-shrink-0">
            <div className="absolute inset-0 bg-success/30 blur-3xl rounded-full animate-pulse" />
            <img
              src={mascotImage}
              alt="Mascotte EcoFarm"
              className="relative z-10 w-full h-full object-contain animate-bounce-in drop-shadow-[0_0_40px_rgba(139,195,74,0.6)]"
            />
          </div>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Bulle de message */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-5 md:p-8 shadow-xl w-full max-w-md animate-slide-up">
            {/* Triangle bulle */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 
              border-l-[15px] border-l-transparent 
              border-r-[15px] border-r-transparent 
              border-b-[15px] border-b-white/95" />
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">
              Connecte-toi pour jouer 🎮
            </h1>
            <p className="text-sm md:text-lg text-gray-600">
              Sauvegarde tes progrès et deviens un champion de l’agriculture durable.
            </p>
          </div>

          {/* Bouton Google */}
          <Button
            size="lg"
            onClick={handleGoogleSignIn}
            className="w-full max-w-sm bg-white hover:bg-gray-50 text-gray-900 text-lg md:text-xl py-4 md:py-5 rounded-full shadow-lg border-4 border-primary/30 hover:scale-105 transition-all duration-300 font-bold flex items-center justify-center"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 
                1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 
                3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 
                7.28-2.66l-3.57-2.77c-.98.66-2.23 
                1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 
                20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 
                8.55 1 10.22 1 12s.43 3.45 1.18 
                4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 
                3.06.56 4.21 1.64l3.15-3.15C17.45 
                2.09 14.97 1 12 1 7.7 1 3.99 
                3.47 2.18 7.07l3.66 2.84c.87-2.6 
                3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuer avec Google
          </Button>

          {/* Badges */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {[
              { icon: "💾", text: "Sauvegarde Auto" },
              { icon: "🏆", text: "Badges & Scores" },
              { icon: "📚", text: "Tous les Niveaux" },
              { icon: "🌍", text: "Données NASA" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/20 backdrop-blur-sm rounded-xl p-3 border border-white/30 hover:scale-105 transition-transform"
              >
                <div className="text-2xl md:text-3xl">{item.icon}</div>
                <p className="text-white font-bold text-xs md:text-sm">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-20 md:h-32 bg-gradient-to-t from-black/30 to-transparent z-10" />
    </motion.div>
  );
};

export default Auth;  












