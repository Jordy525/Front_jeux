import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Play, RotateCcw, Settings, LogOut } from "lucide-react";
import heroImage from "@/assets/hero-farm-gabon.jpg";

const Menu = () => {
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate('/province-selection');
  };

  const handleResume = () => {
    // TODO: Load saved game state
    navigate('/game');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const handleQuit = () => {
    if (confirm("Êtes-vous sûr de vouloir quitter ? Vos progrès sont sauvegardés !")) {
      navigate('/');
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Title */}
          <div className="text-center space-y-2 animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              EcoFarm Gabon
            </h1>
            <p className="text-white/90 text-lg">Menu Principal</p>
          </div>

          {/* Menu Card */}
          <Card className="p-6 bg-card/95 backdrop-blur-sm shadow-glow animate-bounce-in">
            <div className="space-y-4">
              <Button
                size="lg"
                variant="hero"
                onClick={handleNewGame}
                className="w-full justify-start gap-4"
              >
                <Play className="w-5 h-5" />
                <span className="text-lg">Nouvelle Partie</span>
              </Button>

              <Button
                size="lg"
                variant="default"
                onClick={handleResume}
                className="w-full justify-start gap-4"
              >
                <RotateCcw className="w-5 h-5" />
                <span className="text-lg">Reprendre</span>
              </Button>

              <Button
                size="lg"
                variant="secondary"
                onClick={handleSettings}
                className="w-full justify-start gap-4"
              >
                <Settings className="w-5 h-5" />
                <span className="text-lg">Paramètres</span>
              </Button>

              <div className="pt-2 border-t border-border">
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={handleQuit}
                  className="w-full justify-start gap-4 text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-lg">Quitter le Jeu</span>
                </Button>
              </div>
            </div>
          </Card>

          {/* User Info */}
          <div className="text-center text-white/80 text-sm">
            <p>Connecté en tant que <span className="font-semibold">Joueur</span></p>
            <p className="text-xs mt-1">Dernière sauvegarde : Aucune partie en cours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
