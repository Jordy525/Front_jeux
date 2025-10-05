// Service Gemini simplifié pour génération de défis
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

// Base de données de défis par chapitre NASA
const GEMINI_CHALLENGES: { [key: string]: any[] } = {
  'SMAP': [
    {
      question: "Que signifie l'acronyme SMAP de la NASA ?",
      options: ["Soil Moisture Active Passive", "Satellite Monitoring Agricultural Program", "Surface Mapping Analysis Platform", "Smart Moisture Assessment Protocol"],
      correct: 0,
      hint: "SMAP combine deux technologies pour mesurer l'humidité du sol depuis l'espace.",
      explanation: "SMAP signifie Soil Moisture Active Passive. Ce satellite NASA lancé en 2015 utilise des capteurs actifs et passifs pour mesurer l'humidité du sol."
    },
    {
      question: "En quelle année SMAP a-t-il été lancé ?",
      options: ["2013", "2014", "2015", "2016"],
      correct: 2,
      hint: "Le lancement a eu lieu au milieu des années 2010.",
      explanation: "SMAP a été lancé en 2015 pour améliorer notre compréhension du cycle de l'eau et du climat."
    }
  ],
  'NDVI': [
    {
      question: "Que signifie NDVI ?",
      options: ["Normalized Difference Vegetation Index", "Natural Data Vegetation Indicator", "NASA Digital Vegetation Interface", "New Detection Vegetation Instrument"],
      correct: 0,
      hint: "C'est un indice normalisé de différence de végétation.",
      explanation: "NDVI signifie Normalized Difference Vegetation Index, un indicateur de la santé et densité végétale."
    }
  ]
};

// Fonction pour simuler la génération Gemini
const simulateGeminiGeneration = async (chapterName: string, levelNumber: number): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulation délai
  
  const challenges = GEMINI_CHALLENGES[chapterName] || [];
  const challenge = challenges[levelNumber - 1] || challenges[0] || {
    question: `Question ${chapterName} niveau ${levelNumber}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correct: 0,
    hint: `Indice pour ${chapterName}`,
    explanation: `Explication détaillée pour ${chapterName}`
  };
  
  return JSON.stringify(challenge);
};

export interface LevelChallenge {
  question: string;
  options: string[];
  correct: number;
  hint: string;
  explanation: string;
}

export interface ChapterInfo {
  name: string;
  fullName: string;
  description: string;
  applications: string[];
}

export class GeminiService {
  private useRealAPI: boolean;

  constructor() {
    this.useRealAPI = !!API_KEY && API_KEY !== '';
  }

  async generateLevelChallenge(
    chapterInfo: ChapterInfo,
    levelNumber: number,
    levelType: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  ): Promise<LevelChallenge> {
    const prompt = this.buildPrompt(chapterInfo, levelNumber, levelType, difficulty);
    
    try {
      // Utiliser la simulation Gemini
      const text = await simulateGeminiGeneration(chapterInfo.name, levelNumber);
      return this.parseGeminiResponse(text);
    } catch (error) {
      console.error('Erreur Gemini:', error);
      return this.getFallbackChallenge(chapterInfo, levelNumber);
    }
  }

  private buildPrompt(
    chapterInfo: ChapterInfo,
    levelNumber: number,
    levelType: string,
    difficulty: 'beginner' | 'intermediate' | 'advanced'
  ): string {
    const difficultyMap = {
      beginner: 'débutant (concepts de base, définitions)',
      intermediate: 'intermédiaire (applications techniques)',
      advanced: 'avancé (détails techniques, expertise)'
    };

    return `
Tu es un expert en données satellitaires NASA pour l'agriculture. Génère un défi éducatif pour le jeu "EcoFarm Gabon Quest".

CONTEXTE:
- Donnée NASA: ${chapterInfo.name} (${chapterInfo.fullName})
- Description: ${chapterInfo.description}
- Applications: ${chapterInfo.applications.join(', ')}
- Niveau: ${levelNumber}/10
- Type: ${levelType}
- Difficulté: ${difficultyMap[difficulty]}
- Contexte: Agriculture gabonaise (cacao, palmier à huile, manioc, climat équatorial)

CONSIGNES:
1. Crée une question précise et éducative
2. Propose 4 options de réponse réalistes
3. Indique l'index (0-3) de la bonne réponse
4. Fournis un indice utile sans donner la réponse
5. Ajoute une explication détaillée pour l'apprentissage

FORMAT DE RÉPONSE (JSON strict):
{
  "question": "Question claire et précise",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "hint": "Indice utile sans révéler la réponse",
  "explanation": "Explication détaillée de la bonne réponse et son importance pour l'agriculture gabonaise"
}

EXEMPLE POUR SMAP NIVEAU 1:
{
  "question": "Que signifie l'acronyme SMAP de la NASA ?",
  "options": ["Soil Moisture Active Passive", "Satellite Monitoring Agricultural Program", "Surface Mapping Analysis Platform", "Smart Moisture Assessment Protocol"],
  "correct": 0,
  "hint": "SMAP combine deux technologies pour mesurer l'humidité du sol depuis l'espace.",
  "explanation": "SMAP signifie Soil Moisture Active Passive. Ce satellite NASA lancé en 2015 utilise des capteurs actifs et passifs pour mesurer l'humidité du sol, crucial pour optimiser l'irrigation des cultures gabonaises comme le cacao et le palmier à huile."
}

Génère maintenant le défi pour ${chapterInfo.name} niveau ${levelNumber}:
`;
  }

  private parseGeminiResponse(text: string): LevelChallenge {
    try {
      // Nettoyer la réponse (supprimer les balises markdown si présentes)
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanText);
      
      // Validation des données
      if (!parsed.question || !Array.isArray(parsed.options) || parsed.options.length !== 4) {
        throw new Error('Format de réponse invalide');
      }
      
      return {
        question: parsed.question,
        options: parsed.options,
        correct: parsed.correct || 0,
        hint: parsed.hint || 'Réfléchissez aux applications de cette technologie NASA.',
        explanation: parsed.explanation || 'Cette technologie est importante pour l\'agriculture moderne.'
      };
    } catch (error) {
      console.error('Erreur parsing Gemini:', error);
      throw new Error('Impossible de parser la réponse Gemini');
    }
  }

  private getFallbackChallenge(chapterInfo: ChapterInfo, levelNumber: number): LevelChallenge {
    // Défis de secours en cas d'erreur Gemini
    return {
      question: `Quelle est l'application principale de ${chapterInfo.name} en agriculture ?`,
      options: [
        'Surveillance des cultures',
        'Prédiction météorologique',
        'Analyse du sol',
        'Gestion de l\'eau'
      ],
      correct: 0,
      hint: `${chapterInfo.name} est une technologie NASA importante pour l'agriculture.`,
      explanation: `${chapterInfo.name} (${chapterInfo.fullName}) est utilisé pour surveiller et optimiser l'agriculture moderne, particulièrement utile pour les cultures gabonaises.`
    };
  }

  // Méthode pour générer plusieurs niveaux d'un coup
  async generateChapterLevels(chapterInfo: ChapterInfo): Promise<LevelChallenge[]> {
    const levels: LevelChallenge[] = [];
    
    for (let i = 1; i <= 10; i++) {
      const difficulty = i <= 3 ? 'beginner' : i <= 7 ? 'intermediate' : 'advanced';
      const levelType = this.getLevelType(i);
      
      try {
        const challenge = await this.generateLevelChallenge(chapterInfo, i, levelType, difficulty);
        levels.push(challenge);
        
        // Délai pour éviter le rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Erreur niveau ${i}:`, error);
        levels.push(this.getFallbackChallenge(chapterInfo, i));
      }
    }
    
    return levels;
  }

  private getLevelType(levelNumber: number): string {
    const types = ['quiz', 'puzzle', 'simulation', 'action', 'analysis', 'debate', 'ar', 'visual', 'narrative', 'final'];
    return types[levelNumber - 1] || 'quiz';
  }
}

export const geminiService = new GeminiService();
