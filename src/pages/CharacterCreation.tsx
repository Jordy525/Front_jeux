import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Briefcase } from "lucide-react";
import mascotImage from "@/assets/mascot-ecofarm.png";

const CharacterCreation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    gender: "male",
    age: "adult",
    farmType: "family",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save character data to state/context
    console.log("Character created:", formData);
    navigate('/game');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 flex flex-col overflow-hidden">
      <div className="container mx-auto max-w-6xl h-full flex flex-col p-2 sm:p-4">
        {/* Header - Compact */}
        <div className="flex-shrink-0 mb-2 sm:mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/province-selection')}
            className="gap-2 mb-2"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>

          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Créez Votre Personnage
            </h1>
            <p className="text-sm text-muted-foreground">
              Personnalisez votre avatar pour commencer l'aventure
            </p>
          </div>
        </div>

        {/* Main Content - Flexible */}
        <div className="flex-1 grid lg:grid-cols-2 gap-4 min-h-0">
          {/* Avatar Preview */}
          <div className="flex flex-col items-center justify-center">
            <Card className="p-4 sm:p-6 w-full shadow-soft h-fit">
              <div className="text-center space-y-3">
                <div className="flex justify-center">
                  <img 
                    src={mascotImage} 
                    alt="Avatar" 
                    className="w-24 h-24 sm:w-32 sm:h-32 animate-float"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-semibold text-foreground">
                    {formData.name || "Votre Nom"}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {formData.gender === "male" ? "Agriculteur" : "Agricultrice"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formData.farmType === "family" ? "Ferme Familiale" : "Coopérative"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Form - Scrollable if needed */}
          <Card className="p-4 sm:p-6 shadow-soft flex flex-col">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-3 sm:space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                  <User className="w-3 h-3 text-primary" />
                  Nom du Personnage
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Entrez votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="text-sm h-8"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label className="text-sm">Genre</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  className="flex flex-row gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer text-sm">Homme</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer text-sm">Femme</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label className="text-sm">Tranche d'Âge</Label>
                <RadioGroup
                  value={formData.age}
                  onValueChange={(value) => setFormData({ ...formData, age: value })}
                  className="space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="young" id="young" />
                    <Label htmlFor="young" className="cursor-pointer text-sm">
                      Moins de 15 ans (Mode simplifié)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="adult" id="adult" />
                    <Label htmlFor="adult" className="cursor-pointer text-sm">
                      15 ans et plus
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Farm Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm">
                  <Briefcase className="w-3 h-3 text-primary" />
                  Type de Ferme
                </Label>
                <RadioGroup
                  value={formData.farmType}
                  onValueChange={(value) => setFormData({ ...formData, farmType: value })}
                  className="space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="family" id="family" />
                    <Label htmlFor="family" className="cursor-pointer text-sm">
                      Petite Ferme Familiale
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cooperative" id="cooperative" />
                    <Label htmlFor="cooperative" className="cursor-pointer text-sm">
                      Coopérative Agricole
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit */}
              <div className="flex-1 flex items-end pt-2">
                <Button 
                  type="submit" 
                  size="default" 
                  variant="hero"
                  className="w-full"
                >
                  Commencer l'Aventure
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Info - Compact */}
        <div className="flex-shrink-0 mt-2 sm:mt-4">
          <Card className="bg-primary/10 border-primary/20 p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              <strong className="text-primary">Astuce :</strong> Le mode simplifié pour les moins de 15 ans 
              propose moins de texte et plus d'icônes !
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreation;
