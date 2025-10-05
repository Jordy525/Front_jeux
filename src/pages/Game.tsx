

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Badge } from "@/components/ui/badge";
// import { useNavigate } from "react-router-dom";
// import { 
//   Lock, 
//   CheckCircle2, 
//   Circle, 
//   Menu, 
//   Save, 
//   Home,
//   Droplets,
//   Sprout,
//   Cloud,
//   TrendingUp,
//   Award,
//   XCircle,
//   Check
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Level {
//   id: number;
//   title: string;
//   type: "quiz" | "puzzle" | "simulation" | "action" | "analysis" | "debate" | "ar" | "visual" | "narrative" | "final";
//   completed: boolean;
//   score?: number;
// }

// interface Chapter {
//   id: number;
//   title: string;
//   description: string;
//   icon: typeof Droplets;
//   unlocked: boolean;
//   progress: number;
//   levels: Level[];
// }

// const Game = () => {
//   const navigate = useNavigate();
//   const [selectedChapter, setSelectedChapter] = useState<number | null>(1);
//   const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
//   const [chapters, setChapters] = useState<Chapter[]>([
//     {
//       id: 1,
//       title: "Humidité du Sol",
//       description: "Maîtrisez les données SMAP pour optimiser l'irrigation",
//       icon: Droplets,
//       unlocked: true,
//       progress: 30,
//       levels: Array.from({ length: 10 }, (_, i) => ({
//         id: i + 1,
//         title: `Niveau ${i + 1}`,
//         type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
//         completed: i < 3,
//         score: i < 3 ? 85 + i * 5 : undefined,
//       })),
//     },
//     {
//       id: 2,
//       title: "Santé de la Végétation",
//       description: "Utilisez NDVI pour la fertilisation optimale",
//       icon: Sprout,
//       unlocked: false,
//       progress: 0,
//       levels: Array.from({ length: 10 }, (_, i) => ({
//         id: i + 1,
//         title: `Niveau ${i + 1}`,
//         type: "quiz" as Level["type"],
//         completed: false,
//       })),
//     },
//     {
//       id: 3,
//       title: "Précipitations & Climat",
//       description: "Gérez le bétail avec les données GPM et LST",
//       icon: Cloud,
//       unlocked: false,
//       progress: 0,
//       levels: [],
//     },
//     {
//       id: 4,
//       title: "Tendances Climatiques",
//       description: "Combinez les données pour des décisions éclairées",
//       icon: TrendingUp,
//       unlocked: false,
//       progress: 0,
//       levels: [],
//     },
//     {
//       id: 5,
//       title: "Agriculture Durable",
//       description: "Applications réelles au Gabon",
//       icon: Award,
//       unlocked: false,
//       progress: 0,
//       levels: [],
//     },
//   ]);

//   // Quiz-specific state for Chapter 1, Level 1
//   const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
//   const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

//   const handleSave = () => {
//     console.log("Game saved");
//   };

//   const handleLevelClick = (level: Level, chapter: Chapter) => {
//     if (chapter.unlocked && (level.id === 1 || chapter.levels[level.id - 2]?.completed)) {
//       setSelectedLevel(level);
//     }
//   };

//   const handleQuizSubmit = (answer: string) => {
//     const correctAnswer = "deux saisons: saison sèche et saison des pluies";
//     const isCorrect = answer.toLowerCase() === correctAnswer;
//     setQuizAnswer(answer);
//     setQuizFeedback(isCorrect ? "Correcte ! Le Gabon a deux saisons : saison sèche et saison des pluies." : "Incorrecte. Le Gabon a deux saisons : saison sèche et saison des pluies.");

//     if (isCorrect && selectedLevel) {
//       setChapters((prevChapters) =>
//         prevChapters.map((chapter) =>
//           chapter.id === selectedChapter
//             ? {
//                 ...chapter,
//                 levels: chapter.levels.map((level) =>
//                   level.id === selectedLevel.id
//                     ? { ...level, completed: true, score: 90 }
//                     : level
//                 ),
//                 progress: Math.min(
//                   100,
//                   Math.round(
//                     (chapter.levels.filter((l) => l.completed).length + 1) * 10
//                   )
//                 ),
//               }
//             : chapter
//         )
//       );
//       setTimeout(() => {
//         setSelectedLevel(null);
//         setQuizAnswer(null);
//         setQuizFeedback(null);
//       }, 2000); // Return to level selection after 2 seconds
//     }
//   };

//   const selectedChapterData = chapters.find((c) => c.id === selectedChapter);

//   const renderGameContent = () => {
//     if (!selectedLevel || !selectedChapterData) return null;

//     if (selectedLevel.type === "quiz") {
//       return (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="space-y-6"
//         >
//           <Card className="p-6">
//             <h2 className="text-2xl font-bold mb-4">Quiz : Les Saisons du Gabon</h2>
//             <p className="text-muted-foreground mb-6">
//               Quelles sont les quatre saisons du Gabon ?
//             </p>
//             <div className="space-y-4">
//               {[
//                 "Quatre saisons : printemps, été, automne, hiver",
//                 "Deux saisons : saison sèche et saison des pluies",
//                 "Trois saisons : chaude, froide, humide",
//                 "Aucune saison distincte",
//               ].map((option, index) => (
//                 <Button
//                   key={index}
//                   variant={quizAnswer === option ? "default" : "outline"}
//                   className="w-full"
//                   onClick={() => handleQuizSubmit(option)}
//                   disabled={quizAnswer !== null}
//                 >
//                   {option}
//                 </Button>
//               ))}
//             </div>
//             <AnimatePresence>
//               {quizFeedback && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="mt-4 p-4 rounded-lg flex items-center gap-2"
//                   style={{
//                     backgroundColor: quizAnswer === "deux saisons: saison sèche et saison des pluies" ? "rgba(0, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)",
//                   }}
//                 >
//                   {quizAnswer === "deux saisons: saison sèche et saison des pluies" ? (
//                     <Check className="w-6 h-6 text-success" />
//                   ) : (
//                     <XCircle className="w-6 h-6 text-destructive" />
//                   )}
//                   <p className="text-sm">{quizFeedback}</p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </Card>
//         </motion.div>
//       );
//     }

//     // Placeholder for other level types
//     return (
//       <Card className="p-6">
//         <h2 className="text-2xl font-bold mb-4">{selectedLevel.title}</h2>
//         <p className="text-muted-foreground">
//           Jeu de type "{selectedLevel.type}" en cours de développement. Revenez bientôt !
//         </p>
//         <Button
//           className="mt-4"
//           onClick={() => setSelectedLevel(null)}
//         >
//           Retour
//         </Button>
//       </Card>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background to-muted">
//       {/* Top Bar */}
//       <div className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => navigate('/menu')}
//               >
//                 <Home className="w-4 h-4" />
//               </Button>
//               <div>
//                 <h2 className="font-semibold text-foreground">EcoFarm Gabon Quest</h2>
//                 <p className="text-xs text-muted-foreground">Joueur • Estuaire</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleSave}
//               >
//                 <Save className="w-4 h-4 mr-2" />
//                 Sauvegarder
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto p-4 md:p-8">
//         {selectedLevel ? (
//           renderGameContent()
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-6">
//             {/* Sidebar - Chapters List */}
//             <div className="lg:col-span-1">
//               <Card className="p-4 sticky top-24">
//                 <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
//                   <Menu className="w-5 h-5 text-primary" />
//                   Chapitres
//                 </h3>
                
//                 <div className="space-y-3">
//                   {chapters.map((chapter) => {
//                     const Icon = chapter.icon;
//                     return (
//                       <button
//                         key={chapter.id}
//                         onClick={() => chapter.unlocked && setSelectedChapter(chapter.id)}
//                         disabled={!chapter.unlocked}
//                         className={`w-full text-left p-4 rounded-lg transition-all ${
//                           selectedChapter === chapter.id
//                             ? "bg-primary text-primary-foreground shadow-soft"
//                             : chapter.unlocked
//                             ? "bg-muted hover:bg-muted/80"
//                             : "bg-muted/50 opacity-50 cursor-not-allowed"
//                         }`}
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className={`p-2 rounded-lg ${
//                             selectedChapter === chapter.id ? "bg-white/20" : "bg-primary/10"
//                           }`}>
//                             {chapter.unlocked ? (
//                               <Icon className="w-5 h-5" />
//                             ) : (
//                               <Lock className="w-5 h-5" />
//                             )}
//                           </div>
                          
//                           <div className="flex-1 min-w-0">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold text-sm">
//                                 Chapitre {chapter.id}
//                               </span>
//                               {chapter.progress === 100 && (
//                                 <CheckCircle2 className="w-4 h-4 text-success" />
//                               )}
//                             </div>
//                             <p className="text-xs opacity-90 mb-2">
//                               {chapter.title}
//                             </p>
//                             {chapter.unlocked && (
//                               <Progress value={chapter.progress} className="h-1" />
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </Card>
//             </div>

//             {/* Main Content - Levels */}
//             <div className="lg:col-span-2">
//               {selectedChapterData && (
//                 <div className="space-y-6">
//                   {/* Chapter Header */}
//                   <Card className="p-6 bg-gradient-hero text-white">
//                     <div className="flex items-start gap-4">
//                       <div className="bg-white/20 p-3 rounded-xl">
//                         <selectedChapterData.icon className="w-8 h-8" />
//                       </div>
//                       <div className="flex-1">
//                         <h2 className="text-2xl font-bold mb-2">
//                           {selectedChapterData.title}
//                         </h2>
//                         <p className="text-white/90 mb-4">
//                           {selectedChapterData.description}
//                         </p>
//                         <div className="flex items-center gap-4">
//                           <div className="flex-1">
//                             <div className="flex justify-between text-sm mb-1">
//                               <span>Progression</span>
//                               <span>{selectedChapterData.progress}%</span>
//                             </div>
//                             <Progress 
//                               value={selectedChapterData.progress} 
//                               className="h-2 bg-white/20"
//                             />
//                           </div>
//                           <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
//                             {selectedChapterData.levels.filter(l => l.completed).length}/{selectedChapterData.levels.length} Niveaux
//                           </Badge>
//                         </div>
//                       </div>
//                     </div>
//                   </Card>

//                   {/* Levels Grid */}
//                   <div className="grid md:grid-cols-2 gap-4">
//                     {selectedChapterData.levels.map((level, index) => {
//                       const isLocked = !selectedChapterData.unlocked || 
//                         (level.id > 1 && !selectedChapterData.levels[level.id - 2]?.completed);
                      
//                       return (
//                         <Card
//                           key={level.id}
//                           className={`p-5 transition-all ${
//                             isLocked
//                               ? "opacity-50 cursor-not-allowed"
//                               : "cursor-pointer hover:shadow-glow hover:-translate-y-1"
//                           }`}
//                           onClick={() => !isLocked && handleLevelClick(level, selectedChapterData)}
//                         >
//                           <div className="flex items-center gap-4">
//                             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                               level.completed
//                                 ? "bg-success/20"
//                                 : isLocked
//                                 ? "bg-muted"
//                                 : "bg-primary/20"
//                             }`}>
//                               {level.completed ? (
//                                 <CheckCircle2 className="w-6 h-6 text-success" />
//                               ) : isLocked ? (
//                                 <Lock className="w-5 h-5 text-muted-foreground" />
//                               ) : (
//                                 <Circle className="w-6 h-6 text-primary" />
//                               )}
//                             </div>

//                             <div className="flex-1">
//                               <h3 className="font-semibold text-foreground mb-1">
//                                 {level.title}
//                               </h3>
//                               <div className="flex items-center gap-2">
//                                 <Badge variant="outline" className="text-xs">
//                                   {level.type === "quiz" && "Quiz"}
//                                   {level.type === "puzzle" && "Énigme"}
//                                   {level.type === "simulation" && "Simulation"}
//                                   {level.type === "action" && "Action"}
//                                   {level.type === "analysis" && "Analyse"}
//                                   {level.type === "debate" && "Débat"}
//                                   {level.type === "ar" && "Réalité Augmentée"}
//                                   {level.type === "visual" && "Quiz Visuel"}
//                                   {level.type === "narrative" && "Scénario"}
//                                   {level.type === "final" && "Défi Final"}
//                                 </Badge>
//                                 {level.score && (
//                                   <span className="text-xs text-success font-semibold">
//                                     {level.score}%
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </Card>
//                       );
//                     })}
//                   </div>

//                   {/* Chapter Info */}
//                   <Card className="p-4 bg-accent/10 border-accent/20">
//                     <p className="text-sm text-muted-foreground">
//                       <strong className="text-accent">Progression :</strong> Complétez au moins 80% des niveaux 
//                       (8/10) pour débloquer le chapitre suivant. Chaque niveau enseigne une compétence unique 
//                       pour maîtriser les données NASA !
//                     </p>
//                   </Card>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Game;








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Lock,
  CheckCircle2,
  Circle,
  Menu,
  Save,
  Home,
  Droplets,
  Sprout,
  Cloud,
  TrendingUp,
  Award,
  XCircle,
  Check,
  Bird, // Using Bird icon as proxy for eagle
  ArrowLeft,
  Satellite,
  Thermometer,
  Camera,
  Globe,
  Zap,
  Eye,
  Leaf,
  Mountain
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { geminiService, LevelChallenge, ChapterInfo } from "../services/geminiService";

interface Level {
  id: number;
  title: string;
  type: "quiz" | "puzzle" | "simulation" | "action" | "analysis" | "debate" | "ar" | "visual" | "narrative" | "final";
  completed: boolean;
  score?: number;
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  icon: typeof Droplets;
  unlocked: boolean;
  progress: number;
  levels: Level[];
}

const Game = () => {
  const navigate = useNavigate();
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "SMAP - Humidité du Sol",
      description: "Maîtrisez le Soil Moisture Active Passive pour l'irrigation optimale",
      icon: Droplets,
      unlocked: true,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `SMAP Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
        score: undefined,
      })),
    },
    {
      id: 2,
      title: "NDVI - Santé Végétation",
      description: "Normalized Difference Vegetation Index pour surveiller les cultures",
      icon: Sprout,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `NDVI Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 3,
      title: "GPM - Précipitations",
      description: "Global Precipitation Measurement pour la gestion de l'eau",
      icon: Cloud,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `GPM Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 4,
      title: "LST - Température Surface",
      description: "Land Surface Temperature pour le stress thermique des plantes",
      icon: Thermometer,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `LST Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 5,
      title: "MODIS - Imagerie Multi",
      description: "Moderate Resolution Imaging pour classification des cultures",
      icon: Camera,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `MODIS Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 6,
      title: "Landsat - Haute Résolution",
      description: "Imagerie satellite pour cartographie précise des parcelles",
      icon: Satellite,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Landsat Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 7,
      title: "GRACE - Eaux Souterraines",
      description: "Gravity Recovery pour gestion des ressources hydriques",
      icon: Globe,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `GRACE Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 8,
      title: "ECOSTRESS - Stress Hydrique",
      description: "Ecosystem Thermal Radiometer pour efficacité irrigation",
      icon: Zap,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `ECOSTRESS Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 9,
      title: "OCO-2 - Carbone Atmosphérique",
      description: "Orbiting Carbon Observatory pour photosynthèse et séquestration",
      icon: Leaf,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `OCO-2 Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
    {
      id: 10,
      title: "VIIRS - Surveillance Nocturne",
      description: "Visible Infrared Imaging pour monitoring jour/nuit des cultures",
      icon: Eye,
      unlocked: false,
      progress: 0,
      levels: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `VIIRS Niveau ${i + 1}`,
        type: ["quiz", "puzzle", "simulation", "action", "analysis", "debate", "ar", "visual", "narrative", "final"][i] as Level["type"],
        completed: false,
      })),
    },
  ]);

  // Shared state for games
  const [userInput, setUserInput] = useState<string>("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  
  // Gemini AI state
  const [generatedChallenges, setGeneratedChallenges] = useState<Map<string, LevelChallenge>>(new Map());
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [useGemini, setUseGemini] = useState<boolean>(!!import.meta.env.VITE_GEMINI_API_KEY);

  const handleSave = () => {
    console.log("Game saved");
  };

  // Fonction pour générer un défi avec Gemini
  const generateChallengeWithGemini = async (chapterId: number, levelId: number): Promise<LevelChallenge | null> => {
    if (!useGemini) return null;
    
    const challengeKey = `${chapterId}-${levelId}`;
    
    // Vérifier si déjà généré
    if (generatedChallenges.has(challengeKey)) {
      return generatedChallenges.get(challengeKey)!;
    }
    
    setIsGenerating(true);
    
    try {
      const chapterData = chapters.find(c => c.id === chapterId);
      if (!chapterData) return null;
      
      const chapterInfo: ChapterInfo = {
        name: chapterData.title.split(' - ')[0],
        fullName: chapterData.title.split(' - ')[1] || chapterData.title,
        description: chapterData.description,
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
  };

  // Fonction pour obtenir les données de niveau (statique ou Gemini)
  const getLevelData = async (chapterId: number, levelId: number) => {
    // Essayer d'abord Gemini si activé
    if (useGemini) {
      const geminiChallenge = await generateChallengeWithGemini(chapterId, levelId);
      if (geminiChallenge) {
        return geminiChallenge;
      }
    }
    
    // Fallback vers les données statiques
    const staticData = getChapterData(chapterId);
    return staticData?.levels[levelId - 1] || null;
  };

  const handleLevelClick = (level: Level, chapter: Chapter) => {
    if (chapter.unlocked && (level.id === 1 || chapter.levels[level.id - 2]?.completed)) {
      setSelectedLevel(level);
      setUserInput("");
      setFeedback(null);
      setIsCorrect(null);
      setScore(0);
      setTimer(0);
      setGameStarted(false);
    }
  };

  const updateLevelCompletion = (newScore: number) => {
    if (selectedLevel && selectedChapter) {
      setChapters((prevChapters) => {
        const updatedChapters = prevChapters.map((chapter) =>
          chapter.id === selectedChapter
            ? {
                ...chapter,
                levels: chapter.levels.map((level) =>
                  level.id === selectedLevel.id
                    ? { ...level, completed: true, score: newScore }
                    : level
                ),
                progress: Math.min(
                  100,
                  ((chapter.levels.filter((l) => l.completed).length + 1) / chapter.levels.length) * 100
                ),
              }
            : chapter
        );

        // Unlock next chapter if progress >= 80%
        const currentChapterIndex = updatedChapters.findIndex((c) => c.id === selectedChapter);
        if (updatedChapters[currentChapterIndex].progress >= 80 && currentChapterIndex < updatedChapters.length - 1) {
          updatedChapters[currentChapterIndex + 1].unlocked = true;
        }

        return updatedChapters;
      });
    }
  };

  const renderAssistantFeedback = () => {
    if (feedback) {
      let appreciation = "";
      if (score >= 90) {
        appreciation = "Excellent travail ! Vous êtes un vrai expert du climat gabonais.";
      } else if (score >= 70) {
        appreciation = "Bien joué ! Vous avez une bonne compréhension.";
      } else {
        appreciation = "Pas mal, mais il y a de la place pour s'améliorer. Essayez encore !";
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="mt-6 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 shadow-glow flex items-start gap-4"
        >
          <Bird className="w-10 h-10 text-primary animate-bounce" /> {/* Petit aigle (using Bird icon) */}
          <div>
            <p className="font-bold text-primary">Appréciation de l'Assistant Aigle :</p>
            <p className="text-foreground">{appreciation}</p>
            <p className="text-muted-foreground mt-2">{feedback}</p>
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const getChapterData = (chapterId: number) => {
    const chapterDataMap: { [key: number]: any } = {
      1: { // SMAP
        name: "SMAP",
        fullName: "Soil Moisture Active Passive",
        levels: [
          { question: "Que signifie l'acronyme SMAP ?", options: ["Soil Moisture Active Passive", "Satellite Monitoring Agricultural Program", "Surface Mapping Analysis Platform", "Smart Moisture Assessment Protocol"], correct: 0, hint: "SMAP est un satellite NASA lancé en 2015 qui utilise des micro-ondes." },
          { question: "En quelle année SMAP a-t-il été lancé ?", options: ["2013", "2014", "2015", "2016"], correct: 2, hint: "Le lancement a eu lieu au milieu des années 2010." },
          { question: "Quelle technologie SMAP utilise-t-il pour mesurer l'humidité ?", options: ["Rayons X", "Micro-ondes", "Infrarouge", "Ultraviolet"], correct: 1, hint: "Cette technologie peut pénétrer le sol sur quelques centimètres." },
          { question: "Quelle est la résolution spatiale de SMAP ?", options: ["1 km", "9 km", "25 km", "100 km"], correct: 1, hint: "La résolution est d'environ 9 kilomètres pour les données combinées." },
          { question: "SMAP mesure l'humidité jusqu'à quelle profondeur ?", options: ["1 cm", "5 cm", "10 cm", "50 cm"], correct: 1, hint: "Les micro-ondes pénètrent seulement les premiers centimètres du sol." },
          { question: "Quel pourcentage d'humidité indique un sol sec ?", options: ["0-10%", "10-20%", "20-30%", "30-40%"], correct: 0, hint: "Un sol très sec contient très peu d'eau." },
          { question: "Au Gabon, quelle saison nécessite le plus de surveillance SMAP ?", options: ["Saison des pluies", "Saison sèche", "Toute l'année", "Hiver"], correct: 1, hint: "Pendant cette période, l'irrigation devient cruciale." },
          { question: "SMAP aide à prédire quoi en agriculture ?", options: ["La météo", "Les rendements", "Les prix", "Les maladies"], correct: 1, hint: "L'humidité du sol influence directement la productivité." },
          { question: "Quelle culture gabonaise bénéficie le plus de SMAP ?", options: ["Cacao", "Palmier à huile", "Manioc", "Toutes"], correct: 3, hint: "Toutes les cultures ont besoin d'une gestion optimale de l'eau." },
          { question: "SMAP fonctionne en orbite à quelle altitude ?", options: ["400 km", "500 km", "685 km", "800 km"], correct: 2, hint: "L'altitude est proche de 700 kilomètres." }
        ]
      },
      2: { // NDVI
        name: "NDVI",
        fullName: "Normalized Difference Vegetation Index",
        levels: [
          { question: "Que signifie NDVI ?", options: ["Normalized Difference Vegetation Index", "Natural Data Vegetation Indicator", "NASA Digital Vegetation Interface", "New Detection Vegetation Instrument"], correct: 0, hint: "C'est un indice normalisé de différence de végétation." },
          { question: "NDVI mesure quoi principalement ?", options: ["La température", "La santé végétale", "L'humidité", "Le pH du sol"], correct: 1, hint: "Cet indice évalue la vitalité et la densité de la végétation." },
          { question: "Les valeurs NDVI vont de ?", options: ["-1 à +1", "0 à 100", "0 à 1", "-100 à +100"], correct: 0, hint: "L'échelle va des valeurs négatives aux positives." },
          { question: "Une valeur NDVI de 0.8 indique ?", options: ["Végétation morte", "Végétation faible", "Végétation dense", "Sol nu"], correct: 2, hint: "Plus la valeur est proche de 1, plus la végétation est dense." },
          { question: "NDVI utilise quelles bandes spectrales ?", options: ["Rouge et bleu", "Rouge et infrarouge", "Vert et rouge", "Bleu et infrarouge"], correct: 1, hint: "La végétation réfléchit fortement dans l'infrarouge proche." },
          { question: "Au Gabon, NDVI aide à détecter ?", options: ["La déforestation", "Le stress hydrique", "Les maladies", "Tout cela"], correct: 3, hint: "NDVI est un outil polyvalent pour surveiller la végétation." },
          { question: "Quelle saison montre les NDVI les plus élevés au Gabon ?", options: ["Saison sèche", "Saison des pluies", "Transition", "Constant"], correct: 1, hint: "La végétation est plus active quand il y a plus d'eau." },
          { question: "NDVI peut prédire ?", options: ["Les rendements", "La biomasse", "Le stress", "Tout cela"], correct: 3, hint: "C'est un indicateur très complet de l'état végétal." },
          { question: "Pour le cacao gabonais, un NDVI faible indique ?", options: ["Bonne santé", "Stress hydrique", "Maturité", "Floraison"], correct: 1, hint: "Un NDVI bas suggère que la plante souffre." },
          { question: "NDVI est calculé depuis quand ?", options: ["1970s", "1980s", "1990s", "2000s"], correct: 0, hint: "Cet indice existe depuis les débuts de la télédétection satellitaire." }
        ]
      },
      3: { // GPM
        name: "GPM",
        fullName: "Global Precipitation Measurement",
        levels: [
          { question: "Que signifie GPM ?", options: ["Global Precipitation Measurement", "Gabon Precipitation Monitor", "General Pluvial Mapping", "Geographic Precipitation Model"], correct: 0, hint: "GPM mesure les précipitations à l'échelle mondiale." },
          { question: "GPM est une mission conjointe entre ?", options: ["NASA et ESA", "NASA et JAXA", "NASA et CNES", "NASA et CSA"], correct: 1, hint: "Cette mission implique l'agence spatiale japonaise." },
          { question: "Quelle est la fréquence de passage de GPM ?", options: ["1 fois/jour", "2 fois/jour", "3 fois/jour", "Variable"], correct: 2, hint: "GPM passe plusieurs fois par jour au-dessus d'une zone." },
          { question: "GPM peut détecter des précipitations de ?", options: ["0.1 mm/h", "0.2 mm/h", "0.5 mm/h", "1 mm/h"], correct: 1, hint: "GPM est très sensible et peut détecter de faibles précipitations." },
          { question: "Au Gabon, GPM aide à prévoir ?", options: ["Les sécheresses", "Les inondations", "Les saisons", "Tout cela"], correct: 3, hint: "GPM est utile pour tous les aspects liés aux précipitations." },
          { question: "GPM utilise quelle technologie principale ?", options: ["Radar", "Lidar", "Micro-ondes", "Infrarouge"], correct: 0, hint: "Cette technologie peut 'voir' à travers les nuages." },
          { question: "La résolution temporelle de GPM est ?", options: ["1 heure", "3 heures", "6 heures", "12 heures"], correct: 1, hint: "GPM fournit des données plusieurs fois par jour." },
          { question: "Pour l'agriculture gabonaise, GPM prédit ?", options: ["Irrigation nécessaire", "Risques d'inondation", "Calendrier cultural", "Tout cela"], correct: 3, hint: "GPM est essentiel pour la planification agricole." },
          { question: "GPM mesure les précipitations jusqu'à quelle altitude ?", options: ["5 km", "10 km", "15 km", "20 km"], correct: 3, hint: "GPM peut mesurer les précipitations dans toute la troposphère." },
          { question: "La constellation GPM comprend combien de satellites ?", options: ["3", "5", "8", "12"], correct: 2, hint: "Plusieurs satellites travaillent ensemble dans cette constellation." }
        ]
      },
      4: { // LST
        name: "LST",
        fullName: "Land Surface Temperature",
        levels: [
          { question: "Que mesure LST ?", options: ["Température de l'air", "Température du sol", "Température des plantes", "Température de l'eau"], correct: 1, hint: "LST mesure la température de la surface terrestre." },
          { question: "LST est mesurée dans quelle bande spectrale ?", options: ["Visible", "Infrarouge thermique", "Micro-ondes", "Ultraviolet"], correct: 1, hint: "Cette bande détecte la chaleur émise par les surfaces." },
          { question: "Au Gabon, LST varie entre ?", options: ["15-25°C", "20-35°C", "25-40°C", "30-45°C"], correct: 2, hint: "Le climat équatorial maintient des températures élevées." },
          { question: "LST élevée indique pour les cultures ?", options: ["Bonne santé", "Stress thermique", "Croissance rapide", "Maturité"], correct: 1, hint: "Des températures trop élevées stressent les plantes." },
          { question: "LST est mesurée à quelle heure pour éviter les nuages ?", options: ["6h", "10h", "14h", "22h"], correct: 3, hint: "Les mesures nocturnes évitent la couverture nuageuse diurne." },
          { question: "Pour le cacao, la LST optimale est ?", options: ["18-25°C", "25-30°C", "30-35°C", "35-40°C"], correct: 1, hint: "Le cacao préfère des températures modérées." },
          { question: "LST aide à calculer ?", options: ["Évapotranspiration", "Stress hydrique", "Efficacité photosynthèse", "Tout cela"], correct: 3, hint: "La température influence tous ces processus." },
          { question: "La résolution spatiale typique de LST est ?", options: ["30m", "100m", "1km", "10km"], correct: 2, hint: "LST a généralement une résolution kilométrique." },
          { question: "LST varie selon ?", options: ["Saison", "Heure", "Couverture nuageuse", "Tout cela"], correct: 3, hint: "Plusieurs facteurs influencent la température de surface." },
          { question: "LST est cruciale pour ?", options: ["Modèles climatiques", "Agriculture de précision", "Gestion de l'eau", "Tout cela"], correct: 3, hint: "LST a de nombreuses applications." }
        ]
      },
      5: { // MODIS
        name: "MODIS",
        fullName: "Moderate Resolution Imaging Spectroradiometer",
        levels: [
          { question: "Que signifie MODIS ?", options: ["Moderate Resolution Imaging Spectroradiometer", "Multi-Orbital Data Imaging System", "Modern Digital Imaging Satellite", "Mapping Optical Data Intelligence System"], correct: 0, hint: "MODIS est un spectroradiomètre imageur à résolution modérée." },
          { question: "MODIS capture combien de bandes spectrales ?", options: ["7", "16", "36", "64"], correct: 2, hint: "MODIS a un grand nombre de bandes spectrales." },
          { question: "La résolution spatiale de MODIS varie de ?", options: ["10m à 1km", "250m à 1km", "500m à 2km", "1km à 5km"], correct: 1, hint: "MODIS a plusieurs résolutions selon les bandes." },
          { question: "MODIS passe au-dessus du Gabon ?", options: ["1 fois/jour", "2 fois/jour", "1 fois/semaine", "Variable"], correct: 1, hint: "MODIS offre une couverture quotidienne." },
          { question: "MODIS est embarqué sur quels satellites ?", options: ["Landsat", "Terra et Aqua", "SPOT", "Sentinel"], correct: 1, hint: "Deux satellites NASA portent MODIS." },
          { question: "Pour l'agriculture, MODIS mesure ?", options: ["NDVI", "LAI", "Température", "Tout cela"], correct: 3, hint: "MODIS fournit de nombreux indices agricoles." },
          { question: "MODIS détecte au Gabon ?", options: ["Déforestation", "Feux de forêt", "Stress des cultures", "Tout cela"], correct: 3, hint: "MODIS est polyvalent pour le monitoring environnemental." },
          { question: "La fauchée de MODIS est de ?", options: ["185 km", "500 km", "1000 km", "2330 km"], correct: 3, hint: "MODIS a une très large fauchée." },
          { question: "MODIS fonctionne depuis ?", options: ["1995", "1999", "2003", "2007"], correct: 1, hint: "MODIS a été lancé à la fin des années 90." },
          { question: "Les données MODIS sont disponibles ?", options: ["Payantes", "Gratuites", "Sur demande", "Limitées"], correct: 1, hint: "La NASA fournit les données MODIS gratuitement." }
        ]
      },
      6: { // Landsat
        name: "Landsat",
        fullName: "Land Remote Sensing Satellite",
        levels: [
          { question: "Landsat est actif depuis ?", options: ["1960s", "1970s", "1980s", "1990s"], correct: 1, hint: "Landsat est l'un des plus anciens programmes de satellites d'observation." },
          { question: "La résolution spatiale de Landsat est ?", options: ["10m", "15m", "30m", "60m"], correct: 2, hint: "Landsat offre une résolution de 30 mètres pour la plupart des bandes." },
          { question: "Landsat revisite un site tous les ?", options: ["8 jours", "16 jours", "32 jours", "64 jours"], correct: 1, hint: "Landsat a une fréquence de revisite de 16 jours." },
          { question: "Combien de bandes spectrales Landsat 8 a-t-il ?", options: ["7", "9", "11", "13"], correct: 2, hint: "Landsat 8 a 11 bandes spectrales." },
          { question: "Au Gabon, Landsat détecte ?", options: ["Déforestation", "Expansion agricole", "Changements d'usage", "Tout cela"], correct: 3, hint: "Landsat est excellent pour détecter les changements." },
          { question: "La fauchée de Landsat est de ?", options: ["60 km", "120 km", "185 km", "250 km"], correct: 2, hint: "Landsat couvre 185 kilomètres de largeur." },
          { question: "Landsat est géré par ?", options: ["NASA", "USGS", "NASA et USGS", "NOAA"], correct: 2, hint: "C'est un programme conjoint NASA-USGS." },
          { question: "Pour l'agriculture, Landsat mesure ?", options: ["Surface des parcelles", "Type de cultures", "Santé des cultures", "Tout cela"], correct: 3, hint: "Landsat est très polyvalent pour l'agriculture." },
          { question: "Les archives Landsat remontent à ?", options: ["1962", "1972", "1982", "1992"], correct: 1, hint: "Landsat 1 a été lancé en 1972." },
          { question: "Landsat 9 a été lancé en ?", options: ["2019", "2020", "2021", "2022"], correct: 2, hint: "Le dernier satellite Landsat est très récent." }
        ]
      },
      7: { // GRACE
        name: "GRACE",
        fullName: "Gravity Recovery and Climate Experiment",
        levels: [
          { question: "Que mesure GRACE ?", options: ["Gravité terrestre", "Champ magnétique", "Radiation", "Température"], correct: 0, hint: "GRACE mesure les variations du champ gravitationnel." },
          { question: "GRACE détecte les variations de ?", options: ["Masses d'eau", "Glaces", "Eaux souterraines", "Tout cela"], correct: 3, hint: "GRACE détecte tous les changements de masse d'eau." },
          { question: "GRACE fonctionne avec combien de satellites ?", options: ["1", "2", "3", "4"], correct: 1, hint: "GRACE utilise deux satellites jumeaux." },
          { question: "La distance entre les satellites GRACE est ?", options: ["100 km", "200 km", "300 km", "500 km"], correct: 1, hint: "Les satellites sont séparés d'environ 200 km." },
          { question: "Au Gabon, GRACE surveille ?", options: ["Nappes phréatiques", "Humidité du sol", "Réservoirs", "Tout cela"], correct: 3, hint: "GRACE surveille toutes les ressources en eau." },
          { question: "GRACE-FO signifie ?", options: ["Follow-On", "First Orbit", "Future Operations", "Final Observation"], correct: 0, hint: "FO signifie Follow-On, la mission de suivi." },
          { question: "La résolution spatiale de GRACE est ?", options: ["100 km", "300 km", "500 km", "1000 km"], correct: 1, hint: "GRACE a une résolution d'environ 300 km." },
          { question: "GRACE aide à prédire ?", options: ["Sécheresses", "Inondations", "Disponibilité en eau", "Tout cela"], correct: 3, hint: "GRACE est crucial pour la gestion de l'eau." },
          { question: "Pour l'agriculture, GRACE indique ?", options: ["Stress hydrique régional", "Irrigation nécessaire", "Réserves d'eau", "Tout cela"], correct: 3, hint: "GRACE fournit des informations sur l'eau à grande échelle." },
          { question: "GRACE mesure les variations avec quelle précision ?", options: ["1 mm", "1 cm", "10 cm", "1 m"], correct: 1, hint: "GRACE est extrêmement précis pour mesurer les variations d'eau." }
        ]
      },
      8: { // ECOSTRESS
        name: "ECOSTRESS",
        fullName: "Ecosystem Spaceborne Thermal Radiometer",
        levels: [
          { question: "ECOSTRESS mesure principalement ?", options: ["Température", "Humidité", "Stress hydrique", "Photosynthèse"], correct: 2, hint: "ECOSTRESS se concentre sur le stress hydrique des plantes." },
          { question: "ECOSTRESS est installé sur ?", options: ["Satellite dédié", "Station spatiale ISS", "Avion", "Drone"], correct: 1, hint: "ECOSTRESS est monté sur la Station Spatiale Internationale." },
          { question: "La résolution spatiale d'ECOSTRESS est ?", options: ["30m", "70m", "100m", "250m"], correct: 1, hint: "ECOSTRESS a une résolution de 70 mètres." },
          { question: "ECOSTRESS passe au-dessus du Gabon ?", options: ["Heure fixe", "Heures variables", "Nuit seulement", "Jour seulement"], correct: 1, hint: "Grâce à l'ISS, ECOSTRESS passe à différentes heures." },
          { question: "ECOSTRESS détecte le stress avant ?", options: ["Symptômes visibles", "Flétrissement", "Jaunissement", "Mort"], correct: 0, hint: "ECOSTRESS détecte le stress avant qu'il soit visible." },
          { question: "Pour le cacao gabonais, ECOSTRESS indique ?", options: ["Besoin en eau", "Stress thermique", "Efficacité irrigation", "Tout cela"], correct: 3, hint: "ECOSTRESS est très utile pour les cultures tropicales." },
          { question: "ECOSTRESS fonctionne dans quelle bande ?", options: ["Visible", "Infrarouge proche", "Infrarouge thermique", "Micro-ondes"], correct: 2, hint: "ECOSTRESS utilise l'infrarouge thermique." },
          { question: "La fréquence de revisite d'ECOSTRESS est ?", options: ["Quotidienne", "Variable", "Hebdomadaire", "Mensuelle"], correct: 1, hint: "Grâce à l'ISS, la fréquence varie." },
          { question: "ECOSTRESS aide à optimiser ?", options: ["Irrigation", "Fertilisation", "Récolte", "Tout cela"], correct: 0, hint: "ECOSTRESS se concentre sur l'optimisation de l'irrigation." },
          { question: "ECOSTRESS a été lancé en ?", options: ["2016", "2017", "2018", "2019"], correct: 2, hint: "ECOSTRESS est une mission récente de la fin des années 2010." }
        ]
      },
      9: { // OCO-2
        name: "OCO-2",
        fullName: "Orbiting Carbon Observatory",
        levels: [
          { question: "OCO-2 mesure principalement ?", options: ["Oxygène", "Azote", "Dioxyde de carbone", "Méthane"], correct: 2, hint: "OCO-2 se concentre sur le CO2 atmosphérique." },
          { question: "OCO-2 aide à comprendre ?", options: ["Photosynthèse", "Respiration", "Cycle du carbone", "Tout cela"], correct: 3, hint: "OCO-2 étudie le cycle complet du carbone." },
          { question: "La précision de mesure d'OCO-2 est ?", options: ["0.1 ppm", "0.3 ppm", "1 ppm", "3 ppm"], correct: 1, hint: "OCO-2 est extrêmement précis." },
          { question: "OCO-2 passe au-dessus du Gabon ?", options: ["Matin", "Midi", "Après-midi", "Variable"], correct: 2, hint: "OCO-2 passe en début d'après-midi." },
          { question: "Pour les forêts gabonaises, OCO-2 mesure ?", options: ["Absorption CO2", "Émission CO2", "Stockage carbone", "Tout cela"], correct: 3, hint: "OCO-2 étudie tous les aspects du carbone forestier." },
          { question: "OCO-2 utilise quelle technologie ?", options: ["Spectroscopie", "Radar", "Lidar", "Photométrie"], correct: 0, hint: "OCO-2 utilise la spectroscopie pour mesurer le CO2." },
          { question: "La résolution spatiale d'OCO-2 est ?", options: ["1 km", "2.25 km", "5 km", "10 km"], correct: 1, hint: "OCO-2 a une résolution de quelques kilomètres." },
          { question: "OCO-2 aide l'agriculture à ?", options: ["Optimiser photosynthèse", "Réduire émissions", "Séquestrer carbone", "Tout cela"], correct: 3, hint: "OCO-2 a plusieurs applications agricoles." },
          { question: "OCO-2 a été lancé en ?", options: ["2012", "2014", "2016", "2018"], correct: 1, hint: "OCO-2 a été lancé au milieu des années 2010." },
          { question: "Les données OCO-2 servent aux ?", options: ["Modèles climatiques", "Politiques carbone", "Recherche", "Tout cela"], correct: 3, hint: "OCO-2 a de nombreuses applications." }
        ]
      },
      10: { // VIIRS
        name: "VIIRS",
        fullName: "Visible Infrared Imaging Radiometer Suite",
        levels: [
          { question: "VIIRS fonctionne ?", options: ["Jour seulement", "Nuit seulement", "Jour et nuit", "Variable"], correct: 2, hint: "VIIRS peut imager de jour comme de nuit." },
          { question: "VIIRS est embarqué sur ?", options: ["Landsat", "MODIS", "Suomi NPP", "Terra"], correct: 2, hint: "VIIRS est sur le satellite Suomi NPP." },
          { question: "La résolution de VIIRS varie de ?", options: ["375m à 750m", "250m à 1km", "500m à 2km", "1km à 5km"], correct: 0, hint: "VIIRS a des résolutions de 375m et 750m." },
          { question: "VIIRS détecte au Gabon ?", options: ["Feux de forêt", "Éclairage nocturne", "Nuages", "Tout cela"], correct: 3, hint: "VIIRS est très polyvalent." },
          { question: "Pour l'agriculture, VIIRS surveille ?", options: ["Feux de culture", "Activité nocturne", "Couverture nuageuse", "Tout cela"], correct: 3, hint: "VIIRS a plusieurs applications agricoles." },
          { question: "VIIRS a combien de bandes spectrales ?", options: ["16", "22", "32", "36"], correct: 1, hint: "VIIRS a 22 bandes spectrales." },
          { question: "La fauchée de VIIRS est ?", options: ["1500 km", "2000 km", "3000 km", "4000 km"], correct: 2, hint: "VIIRS a une très large fauchée de 3000 km." },
          { question: "VIIRS passe au-dessus du Gabon ?", options: ["1 fois/jour", "2 fois/jour", "Variable", "1 fois/semaine"], correct: 1, hint: "VIIRS offre une couverture bi-quotidienne." },
          { question: "VIIRS succède à ?", options: ["MODIS", "AVHRR", "Landsat", "SPOT"], correct: 1, hint: "VIIRS est le successeur d'AVHRR." },
          { question: "Les données VIIRS sont utilisées pour ?", options: ["Météorologie", "Climat", "Environnement", "Tout cela"], correct: 3, hint: "VIIRS a de nombreuses applications." }
        ]
      }
    };
    return chapterDataMap[chapterId] || null;
  };

  const renderGameContent = () => {
    if (!selectedLevel || !selectedChapter) return null;
    
    const chapterData = getChapterData(selectedChapter);
    const staticLevelData = chapterData?.levels[selectedLevel.id - 1];
    
    // Composant pour gérer le chargement asynchrone des données Gemini
    const LevelContent = () => {
      const [levelData, setLevelData] = useState<any>(staticLevelData);
      const [loading, setLoading] = useState(useGemini);
      
      React.useEffect(() => {
        const loadLevelData = async () => {
          if (useGemini) {
            setLoading(true);
            const geminiData = await getLevelData(selectedChapter!, selectedLevel!.id);
            setLevelData(geminiData || staticLevelData);
            setLoading(false);
          }
        };
        
        loadLevelData();
      }, [selectedLevel?.id, selectedChapter]);
      
      if (loading) {
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">🤖 Gemini génère votre défi personnalisé...</p>
          </div>
        );
      }
      
      return renderLevelContent(levelData);
    };
    
    return <LevelContent />;
  };
  
  const renderLevelContent = (levelData: any) => {
    if (!selectedLevel || !selectedChapter) return null;
    
    const chapterData = getChapterData(selectedChapter);

    switch (selectedLevel.type) {
      case "quiz":
        return (
          <div className="h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col space-y-3 sm:space-y-4"
            >
              {/* Header avec bouton retour */}
              <div className="flex items-center justify-between flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLevel(null)}
                  className="gap-2"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                <Badge variant="secondary" className="text-xs">
                  Quiz • Niveau {selectedLevel.id}
                </Badge>
              </div>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-background to-muted shadow-xl rounded-xl flex-1 flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary text-center">
                  {chapterData?.name} Niveau {selectedLevel.id}/10
                </h2>
                
                {/* Indice */}
                <Card className="p-3 bg-accent/10 border-accent/20 mb-4 flex-shrink-0">
                  <p className="text-sm text-accent font-medium mb-2">💡 Indice :</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {levelData?.hint || "Réfléchissez bien à cette question sur les données NASA."}
                  </p>
                </Card>

                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-center flex-shrink-0">
                  {levelData?.question || "Question non disponible"}
                </p>
                
                <div className="grid grid-cols-1 gap-3 flex-1">
                  {(levelData?.options || []).map((option: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto min-h-[60px] text-left p-3 sm:p-4 rounded-xl transition-all hover:scale-105 hover:shadow-glow text-xs sm:text-sm ${
                        userInput === option ? (isCorrect ? "bg-success/20 border-success" : "bg-destructive/20 border-destructive") : ""
                      }`}
                      onClick={() => {
                        const correct = index === levelData?.correct;
                        setUserInput(option);
                        setIsCorrect(correct);
                        setScore(correct ? 95 : 50);
                        setFeedback(
                          correct
                            ? `Correct ! ${option}. Vous maîtrisez bien ${chapterData?.name} !`
                            : `Incorrect. La bonne réponse était : ${levelData?.options[levelData?.correct]}`
                        );
                        if (correct) updateLevelCompletion(95);
                      }}
                      disabled={!!userInput}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
                  {!userInput ? (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLevel(null)}
                      size="sm"
                    >
                      Je ne sais pas
                    </Button>
                  ) : isCorrect ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          // Passer au niveau suivant
                          const nextLevelId = selectedLevel.id + 1;
                          const selectedChapterData = chapters.find(c => c.id === selectedChapter);
                          const nextLevel = selectedChapterData?.levels.find(l => l.id === nextLevelId);
                          
                          if (nextLevel) {
                            setSelectedLevel(nextLevel);
                            setUserInput("");
                            setFeedback(null);
                            setIsCorrect(null);
                          } else {
                            // Tous les niveaux terminés
                            setSelectedLevel(null);
                            setFeedback("Félicitations ! Vous avez terminé tous les niveaux de ce chapitre !");
                          }
                        }}
                        size="sm"
                        className="bg-success hover:bg-success/90"
                      >
                        Niveau Suivant →
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedLevel(null)}
                        size="sm"
                      >
                        Retour aux niveaux
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUserInput("");
                        setFeedback(null);
                        setIsCorrect(null);
                      }}
                      size="sm"
                    >
                      Réessayer
                    </Button>
                  )}
                </div>
              </Card>
              
              <AnimatePresence>{renderAssistantFeedback()}</AnimatePresence>
            </motion.div>
          </div>
        );

      case "puzzle":
        if (!levelData) return <div>Niveau non disponible</div>;
        return (
          <div className="h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col space-y-3 sm:space-y-4"
            >
              {/* Header avec bouton retour */}
              <div className="flex items-center justify-between flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLevel(null)}
                  className="gap-2"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                <Badge variant="secondary" className="text-xs">
                  Énigme • Niveau {selectedLevel.id}
                </Badge>
              </div>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-background to-muted shadow-xl rounded-xl flex-1 flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary text-center">
                  Énigme {chapterData?.name} Niveau {selectedLevel.id}/10
                </h2>
                
                {/* Indice */}
                <Card className="p-3 bg-accent/10 border-accent/20 mb-4 flex-shrink-0">
                  <p className="text-sm text-accent font-medium mb-2">💡 Indice :</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {levelData.hint}
                  </p>
                </Card>

                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-center flex-shrink-0">
                  {levelData.question}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                  <Input
                    placeholder="Votre réponse..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="rounded-xl flex-1"
                    disabled={!!feedback}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        const correctAnswer = levelData.options[levelData.correct];
                        const correct = userInput.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
                        setIsCorrect(correct);
                        setScore(correct ? 90 : 40);
                        setFeedback(
                          correct
                            ? `Bravo ! La réponse était bien "${correctAnswer}".`
                            : `Incorrect. La bonne réponse était : "${correctAnswer}"`
                        );
                        if (correct) updateLevelCompletion(90);
                      }}
                      disabled={!!feedback || !userInput.trim()}
                      className="rounded-xl"
                      size="sm"
                    >
                      Valider
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLevel(null)}
                      size="sm"
                      className="rounded-xl"
                    >
                      Abandonner
                    </Button>
                  </div>
                </div>
                
                {/* Boutons d'action après réponse */}
                {feedback && (
                  <div className="mt-4 space-y-3 flex-shrink-0">
                    <div className={`p-3 sm:p-4 rounded-xl ${isCorrect ? "bg-success/20" : "bg-destructive/20"}`}>
                      {isCorrect ? <Check className="inline mr-2 text-success" /> : <XCircle className="inline mr-2 text-destructive" />}
                      <span className="text-sm">{feedback}</span>
                    </div>
                    
                    <div className="flex justify-center gap-2">
                      {isCorrect ? (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              const nextLevelId = selectedLevel.id + 1;
                              const selectedChapterData = chapters.find(c => c.id === selectedChapter);
                              const nextLevel = selectedChapterData?.levels.find(l => l.id === nextLevelId);
                              
                              if (nextLevel) {
                                setSelectedLevel(nextLevel);
                                setUserInput("");
                                setFeedback(null);
                                setIsCorrect(null);
                              } else {
                                setSelectedLevel(null);
                              }
                            }}
                            size="sm"
                            className="bg-success hover:bg-success/90"
                          >
                            Niveau Suivant →
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedLevel(null)}
                            size="sm"
                          >
                            Retour aux niveaux
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => {
                            setUserInput("");
                            setFeedback(null);
                            setIsCorrect(null);
                          }}
                          size="sm"
                        >
                          Réessayer
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </Card>
              
              <AnimatePresence>{renderAssistantFeedback()}</AnimatePresence>
            </motion.div>
          </div>
        );

      case "simulation":
        if (!levelData) return <div>Niveau non disponible</div>;
        return (
          <div className="h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col space-y-3 sm:space-y-4"
            >
              {/* Header avec bouton retour */}
              <div className="flex items-center justify-between flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLevel(null)}
                  className="gap-2"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                <Badge variant="secondary" className="text-xs">
                  Simulation • Niveau {selectedLevel.id}
                </Badge>
              </div>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-background to-muted shadow-xl rounded-xl flex-1 flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary text-center">
                  Simulation {chapterData?.name} Niveau {selectedLevel.id}/10
                </h2>
                
                {/* Indice */}
                <Card className="p-3 bg-accent/10 border-accent/20 mb-4 flex-shrink-0">
                  <p className="text-sm text-accent font-medium mb-2">💡 Indice :</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {levelData.hint}
                  </p>
                </Card>

                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-center flex-shrink-0">
                  {levelData.question}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  {levelData.options.map((option: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto min-h-[60px] text-left p-3 sm:p-4 rounded-xl transition-all hover:scale-105 hover:shadow-glow text-xs sm:text-sm ${
                        userInput === option ? (isCorrect ? "bg-success/20 border-success" : "bg-destructive/20 border-destructive") : ""
                      }`}
                      onClick={() => {
                        const correct = index === levelData.correct;
                        setUserInput(option);
                        setIsCorrect(correct);
                        setScore(correct ? 85 : 55);
                        setFeedback(
                          correct
                            ? `Parfait ! ${option}. Excellente décision pour ${chapterData?.name} !`
                            : `Incorrect. La bonne réponse était : ${levelData.options[levelData.correct]}`
                        );
                        if (correct) updateLevelCompletion(85);
                      }}
                      disabled={!!userInput}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
                  {!userInput ? (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLevel(null)}
                      size="sm"
                    >
                      Je ne sais pas
                    </Button>
                  ) : isCorrect ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          const nextLevelId = selectedLevel.id + 1;
                          const selectedChapterData = chapters.find(c => c.id === selectedChapter);
                          const nextLevel = selectedChapterData?.levels.find(l => l.id === nextLevelId);
                          
                          if (nextLevel) {
                            setSelectedLevel(nextLevel);
                            setUserInput("");
                            setFeedback(null);
                            setIsCorrect(null);
                          } else {
                            setSelectedLevel(null);
                          }
                        }}
                        size="sm"
                        className="bg-success hover:bg-success/90"
                      >
                        Niveau Suivant →
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedLevel(null)}
                        size="sm"
                      >
                        Retour aux niveaux
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUserInput("");
                        setFeedback(null);
                        setIsCorrect(null);
                      }}
                      size="sm"
                    >
                      Réessayer
                    </Button>
                  )}
                </div>
              </Card>
              
              <AnimatePresence>{renderAssistantFeedback()}</AnimatePresence>
            </motion.div>
          </div>
        );

      // Autres types de niveaux (action, analysis, debate, ar, visual, narrative, final)
      case "action":
      case "analysis":
      case "debate":
      case "ar":
      case "visual":
      case "narrative":
      case "final":
        if (!levelData) return <div>Niveau non disponible</div>;
        return (
          <div className="h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col space-y-3 sm:space-y-4"
            >
              {/* Header avec bouton retour */}
              <div className="flex items-center justify-between flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLevel(null)}
                  className="gap-2"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                <Badge variant="secondary" className="text-xs">
                  {selectedLevel.type} • Niveau {selectedLevel.id}
                </Badge>
              </div>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-background to-muted shadow-xl rounded-xl flex-1 flex flex-col">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary text-center">
                  {chapterData?.name} Niveau {selectedLevel.id}/10
                </h2>
                
                {/* Indice */}
                <Card className="p-3 bg-accent/10 border-accent/20 mb-4 flex-shrink-0">
                  <p className="text-sm text-accent font-medium mb-2">💡 Indice :</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {levelData.hint}
                  </p>
                </Card>

                <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 text-center flex-shrink-0">
                  {levelData.question}
                </p>
                
                <div className="grid grid-cols-1 gap-3 flex-1">
                  {levelData.options.map((option: string, index: number) => (
                    <Button
                      key={index}
                      variant="outline"
                      className={`h-auto min-h-[60px] text-left p-3 sm:p-4 rounded-xl transition-all hover:scale-105 hover:shadow-glow text-xs sm:text-sm ${
                        userInput === option ? (isCorrect ? "bg-success/20 border-success" : "bg-destructive/20 border-destructive") : ""
                      }`}
                      onClick={() => {
                        const correct = index === levelData.correct;
                        setUserInput(option);
                        setIsCorrect(correct);
                        setScore(correct ? 90 : 50);
                        setFeedback(
                          correct
                            ? `Correct ! ${option}. Vous maîtrisez bien ${chapterData?.name} !`
                            : `Incorrect. La bonne réponse était : ${levelData.options[levelData.correct]}`
                        );
                        if (correct) updateLevelCompletion(90);
                      }}
                      disabled={!!userInput}
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-center gap-2 mt-4 flex-shrink-0">
                  {!userInput ? (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedLevel(null)}
                      size="sm"
                    >
                      Je ne sais pas
                    </Button>
                  ) : isCorrect ? (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          const nextLevelId = selectedLevel.id + 1;
                          const selectedChapterData = chapters.find(c => c.id === selectedChapter);
                          const nextLevel = selectedChapterData?.levels.find(l => l.id === nextLevelId);
                          
                          if (nextLevel) {
                            setSelectedLevel(nextLevel);
                            setUserInput("");
                            setFeedback(null);
                            setIsCorrect(null);
                          } else {
                            setSelectedLevel(null);
                          }
                        }}
                        size="sm"
                        className="bg-success hover:bg-success/90"
                      >
                        Niveau Suivant →
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedLevel(null)}
                        size="sm"
                      >
                        Retour aux niveaux
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setUserInput("");
                        setFeedback(null);
                        setIsCorrect(null);
                      }}
                      size="sm"
                    >
                      Réessayer
                    </Button>
                  )}
                </div>
              </Card>
              
              <AnimatePresence>{renderAssistantFeedback()}</AnimatePresence>
            </motion.div>
          </div>
        );

      // Fallback pour types non reconnus
      default:
        return (
          <div className="h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col space-y-3 sm:space-y-4"
            >
              {/* Header avec bouton retour */}
              <div className="flex items-center justify-between flex-shrink-0">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedLevel(null)}
                  className="gap-2"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Retour
                </Button>
                <Badge variant="secondary" className="text-xs">
                  {selectedLevel.type} • Niveau {selectedLevel.id}
                </Badge>
              </div>

              <Card className="p-4 sm:p-6 bg-gradient-to-br from-background to-muted shadow-xl rounded-xl flex-1 flex flex-col items-center justify-center">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-primary text-center">{selectedLevel.title}</h2>
                
                {/* Message de développement avec style */}
                <div className="text-center space-y-4 max-w-md">
                  <div className="text-6xl mb-4">😧</div>
                  <p className="text-base sm:text-lg text-muted-foreground">
                    Jeu de type <strong>"{selectedLevel.type}"</strong> en cours de développement.
                  </p>
                  <Card className="p-3 bg-accent/10 border-accent/20">
                    <p className="text-sm text-accent font-medium mb-1">🎮 Bientôt disponible :</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Un design époustouflant et des défis passionnants vous attendent !
                    </p>
                  </Card>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <Button
                    onClick={() => setSelectedLevel(null)}
                    className="rounded-xl shadow-glow"
                    size="sm"
                  >
                    Retour aux niveaux
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateLevelCompletion(75);
                    }}
                    className="rounded-xl"
                    size="sm"
                  >
                    Marquer comme terminé
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        );
    }
  };

  const selectedChapterData = chapters.find((c) => c.id === selectedChapter);

  return (
    <div className="h-screen bg-gradient-to-b from-background to-muted flex flex-col overflow-hidden">
      {/* Top Bar - Compact */}
      <div className="bg-card border-b border-border flex-shrink-0 z-10 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/menu')}
              >
                <Home className="w-4 h-4" />
              </Button>
              <div>
                <h2 className="font-semibold text-foreground text-sm sm:text-base">EcoFarm Gabon Quest</h2>
                <p className="text-xs text-muted-foreground hidden sm:block">Joueur • Estuaire</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Toggle Gemini */}
              <Button
                variant={useGemini ? "default" : "outline"}
                size="sm"
                onClick={() => setUseGemini(!useGemini)}
                className="hidden md:flex gap-1"
                disabled={isGenerating}
              >
                🤖 {useGemini ? "Gemini ON" : "Gemini OFF"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="hidden sm:flex"
              >
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="sm:hidden"
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-2 sm:p-4 flex-1 min-h-0">
        {selectedLevel ? (
          <div className="h-full flex flex-col">
            {renderGameContent()}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-3 sm:gap-6 h-full overflow-hidden">
            {/* Sidebar - Chapters List */}
            <div className="lg:col-span-1 flex flex-col min-h-0">
              <Card className="p-3 sm:p-4 shadow-soft flex-1 overflow-y-auto">
                <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4 flex items-center gap-2">
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Chapitres
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  {chapters.map((chapter) => {
                    const Icon = chapter.icon;
                    return (
                      <button
                        key={chapter.id}
                        onClick={() => chapter.unlocked && setSelectedChapter(chapter.id)}
                        disabled={!chapter.unlocked}
                        className={`w-full text-left p-2 sm:p-3 rounded-lg transition-all hover:scale-105 ${
                          selectedChapter === chapter.id
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : chapter.unlocked
                            ? "bg-muted hover:bg-muted/80"
                            : "bg-muted/50 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${
                            selectedChapter === chapter.id ? "bg-white/20" : "bg-primary/10"
                          }`}>
                            {chapter.unlocked ? (
                              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-xs sm:text-sm">
                                {chapter.title.split(' - ')[0]}
                              </span>
                              {chapter.progress === 100 && (
                                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
                              )}
                            </div>
                            <p className="text-xs opacity-90 mb-1 sm:mb-2 line-clamp-2">
                              {chapter.title.split(' - ')[1] || chapter.title}
                            </p>
                            {chapter.unlocked && (
                              <Progress value={chapter.progress} className="h-1" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Main Content - Levels */}
            <div className="lg:col-span-2 flex flex-col min-h-0">
              {selectedChapterData && (
                <div className="flex flex-col space-y-3 sm:space-y-4 h-full">
                  {/* Chapter Header - Compact */}
                  <Card className="p-3 sm:p-4 bg-gradient-to-r from-primary to-accent text-white shadow-glow rounded-xl flex-shrink-0">
                    <div className="flex items-start gap-2 sm:gap-4">
                      <div className="bg-white/20 p-2 sm:p-3 rounded-lg flex-shrink-0">
                        <selectedChapterData.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">
                          {selectedChapterData.title}
                        </h2>
                        <p className="text-white/90 mb-2 sm:mb-3 text-xs sm:text-sm">
                          {selectedChapterData.description}
                        </p>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progression</span>
                              <span>{selectedChapterData.progress}%</span>
                            </div>
                            <Progress 
                              value={selectedChapterData.progress} 
                              className="h-1.5 sm:h-2 bg-white/20"
                            />
                          </div>
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                            {selectedChapterData.levels.filter(l => l.completed).length}/{selectedChapterData.levels.length}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Levels Grid - Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pb-4">
                      {selectedChapterData.levels.map((level) => {
                        const isLocked = !selectedChapterData.unlocked || 
                          (level.id > 1 && !selectedChapterData.levels[level.id - 2]?.completed);
                        
                        return (
                          <Card
                            key={level.id}
                            className={`p-3 sm:p-4 transition-all rounded-lg shadow-soft hover:shadow-glow hover:-translate-y-1 ${
                              isLocked
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            } ${level.completed ? "bg-success/10 border-success" : ""}`}
                            onClick={() => !isLocked && handleLevelClick(level, selectedChapterData)}
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                level.completed
                                  ? "bg-success/20"
                                  : isLocked
                                  ? "bg-muted"
                                  : "bg-primary/20"
                              }`}>
                                {level.completed ? (
                                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                                ) : isLocked ? (
                                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                                ) : (
                                  <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">
                                  {level.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {level.type === "quiz" && "Quiz"}
                                    {level.type === "puzzle" && "Énigme"}
                                    {level.type === "simulation" && "Simulation"}
                                    {level.type === "action" && "Action"}
                                    {level.type === "analysis" && "Analyse"}
                                    {level.type === "debate" && "Débat"}
                                    {level.type === "ar" && "Réalité Augmentée"}
                                    {level.type === "visual" && "Quiz Visuel"}
                                    {level.type === "narrative" && "Scénario"}
                                    {level.type === "final" && "Défi Final"}
                                  </Badge>
                                  {level.score && (
                                    <span className="text-xs text-success font-semibold">
                                      {level.score}%
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Chapter Info - Compact */}
                  <div className="space-y-2 flex-shrink-0">
                    <Card className="p-2 sm:p-3 bg-accent/10 border-accent/20 rounded-lg shadow-soft">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-accent">Astuce :</strong> Complétez 80% des niveaux pour débloquer le chapitre suivant !
                      </p>
                    </Card>
                    
                    {/* Statut Gemini */}
                    {import.meta.env.VITE_GEMINI_API_KEY && (
                      <Card className={`p-2 sm:p-3 rounded-lg shadow-soft ${useGemini ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">🤖</span>
                          <p className="text-xs text-muted-foreground">
                            <strong className={useGemini ? "text-green-600" : "text-gray-600"}>
                              Gemini AI : {useGemini ? "Défis personnalisés activés" : "Données statiques"}
                            </strong>
                          </p>
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;