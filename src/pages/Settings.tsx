import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Volume2, 
  Music, 
  Globe, 
  Accessibility, 
  Bell, 
  Shield,
  User
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    soundVolume: 70,
    musicVolume: 50,
    language: "french",
    largeText: false,
    notifications: true,
    juniorMode: false,
  });

  const handleSave = () => {
    // TODO: Save settings to backend
    console.log("Settings saved:", settings);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/menu')}
            className="gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au Menu
          </Button>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Paramètres
            </h1>
            <p className="text-muted-foreground">
              Personnalisez votre expérience de jeu
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Audio Settings */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Volume2 className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Audio</h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Volume des Sons</Label>
                    <span className="text-sm text-muted-foreground">{settings.soundVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.soundVolume]}
                    onValueChange={([value]) => setSettings({ ...settings, soundVolume: value })}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Music className="w-4 h-4" />
                      Volume de la Musique
                    </Label>
                    <span className="text-sm text-muted-foreground">{settings.musicVolume}%</span>
                  </div>
                  <Slider
                    value={[settings.musicVolume]}
                    onValueChange={([value]) => setSettings({ ...settings, musicVolume: value })}
                    max={100}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Language Settings */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Globe className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Langue</h2>
              </div>

              <div className="space-y-2">
                <Label>Langue de l'Interface</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings({ ...settings, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="french">Français</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Accessibility Settings */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Accessibility className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Accessibilité</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Texte Agrandi</Label>
                    <p className="text-sm text-muted-foreground">
                      Augmente la taille du texte pour une meilleure lisibilité
                    </p>
                  </div>
                  <Switch
                    checked={settings.largeText}
                    onCheckedChange={(checked) => setSettings({ ...settings, largeText: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Mode Junior
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Interface simplifiée pour les moins de 15 ans
                    </p>
                  </div>
                  <Switch
                    checked={settings.juniorMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, juniorMode: checked })}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications Settings */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Activer les Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des rappels pour les mises à jour de données NASA
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                />
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <Shield className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Confidentialité</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Vos données de jeu sont stockées de manière sécurisée via votre compte Google.
                  </p>
                  <Button variant="outline" size="sm">
                    Gérer les Données Google
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button variant="destructive" size="sm">
                    Supprimer Toutes les Données
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-4 pt-4">
            <Button 
              size="lg" 
              variant="hero"
              onClick={handleSave}
              className="flex-1"
            >
              Enregistrer les Paramètres
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/menu')}
            >
              Annuler
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
