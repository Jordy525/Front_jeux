import { useState, useCallback } from 'react';
import { geminiService, LevelChallenge, ChapterInfo } from '../services/geminiService';

export const useGemini = () => {
  const [generatedChallenges, setGeneratedChallenges] = useState<Map<string, LevelChallenge>>(new Map());
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [useGemini, setUseGemini] = useState<boolean>(!!import.meta.env.VITE_GEMINI_API_KEY);

  const generateChallenge = useCallback(async (
    chapterId: number,
    levelId: number,
    chapterTitle: string,
    chapterDescription: string
  ): Promise<LevelChallenge | null> => {
    if (!useGemini) return null;
    
    const challengeKey = `${chapterId}-${levelId}`;
    
    // Vérifier si déjà généré
    if (generatedChallenges.has(challengeKey)) {
      return generatedChallenges.get(challengeKey)!;
    }
    
    setIsGenerating(true);
    
    try {
      const chapterInfo: ChapterInfo = {
        name: chapterTitle.split(' - ')[0],
        fullName: chapterTitle.split(' - ')[1] || chapterTitle,
        description: chapterDescription,
        applications: [
          'Surveillance des cultures',
          'Optimisation irrigation',
          'Prédiction rendements',
          'Gestion ressources'
        ]
      };
      
      const difficulty = levelId <= 3 ? 'beginner' : levelId <= 7 ? 'intermediate' : 'advanced';
      const levelType = ['quiz', 'puzzle', 'simulation', 'action', 'analysis', 'debate', 'ar', 'visual', 'narrative', 'final'][levelId - 1] || 'quiz';
      
      const challenge = await geminiService.generateLevelChallenge(chapterInfo, levelId, levelType, difficulty);
      
      // Sauvegarder le défi généré
      setGeneratedChallenges(prev => new Map(prev).set(challengeKey, challenge));
      
      return challenge;
    } catch (error) {
      console.error('Erreur génération Gemini:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, [useGemini, generatedChallenges]);

  return {
    generateChallenge,
    isGenerating,
    useGemini,
    setUseGemini,
    generatedChallenges
  };
};
