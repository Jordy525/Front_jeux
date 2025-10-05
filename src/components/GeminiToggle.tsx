import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface GeminiToggleProps {
  useGemini: boolean;
  setUseGemini: (value: boolean) => void;
  isGenerating: boolean;
}

export const GeminiToggle: React.FC<GeminiToggleProps> = ({ 
  useGemini, 
  setUseGemini, 
  isGenerating 
}) => {
  const hasApiKey = !!import.meta.env.VITE_GEMINI_API_KEY;

  if (!hasApiKey) {
    return (
      <Card className="p-3 bg-yellow-50 border-yellow-200">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-yellow-600">
            🤖 Gemini
          </Badge>
          <p className="text-sm text-yellow-700">
            Clé API manquante - Utilisation des données statiques
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant={useGemini ? "default" : "outline"}>
            🤖 Gemini AI
          </Badge>
          <p className="text-sm text-muted-foreground">
            {useGemini ? "Défis générés par IA" : "Données statiques"}
          </p>
        </div>
        
        <Button
          variant={useGemini ? "default" : "outline"}
          size="sm"
          onClick={() => setUseGemini(!useGemini)}
          disabled={isGenerating}
        >
          {isGenerating ? "Génération..." : useGemini ? "Désactiver" : "Activer"}
        </Button>
      </div>
      
      {useGemini && (
        <p className="text-xs text-muted-foreground mt-2">
          Les défis sont générés dynamiquement selon votre progression
        </p>
      )}
    </Card>
  );
};
