
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import mascotImage from "@/assets/mascot-ecofarm.png";
// import { Sparkles, MessageCircle } from "lucide-react";

// const Welcome = () => {
//   const navigate = useNavigate();
//   const whatsappNumber = "+24106015913";
//   const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=Salut%20!%20Je%20suis%20intéressé%20par%20EcoFarm%20Gabon%20Quest.`;

//   return (
//     <div className="h-screen w-screen relative bg-gradient-to-br from-earth-dark via-primary to-nasa-blue flex flex-col items-center justify-between overflow-hidden">
      
//       {/* Animated Background Particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 10}s`,
//             }}
//           >
//             <Sparkles 
//               className="text-accent/30" 
//               size={12 + Math.random() * 20}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 h-full w-full max-w-6xl flex flex-col items-center justify-between px-4 py-6">
        
//         {/* Top: Mascot + Speech Bubble */}
//         <div className="flex flex-col items-center gap-4">
//           {/* Mascot */}
//           <div className="relative">
//             <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full animate-pulse" />
//             <img 
//               src={mascotImage} 
//               alt="Mascotte EcoFarm" 
//               className="w-28 md:w-40 lg:w-56 h-auto relative z-10 animate-bounce-in drop-shadow-[0_0_40px_rgba(139,195,74,0.5)]"
//             />
//           </div>

//           {/* Speech Bubble */}
//           <div className="animate-slide-up">
//             <div className="relative inline-block bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-primary/30 max-w-md">
//               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-primary/30" />
//               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card/95" />
              
//               <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
//                 Salut, futur champion 🌱
//               </h1>
//               <p className="text-sm md:text-base text-muted-foreground font-medium">
//                 Prêt pour l'aventure agricole au Gabon ?
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Middle: Game Title */}
//         <div className="text-center animate-scale-in">
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] tracking-wide">
//             ECOFARM
//           </h2>
//           <span className="block text-accent text-xl md:text-3xl lg:text-4xl">
//             GABON QUEST
//           </span>
//         </div>

//         {/* Bottom: Buttons + Info Pills */}
//         <div className="flex flex-col items-center gap-4">
//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Button 
//               size="lg"
//               onClick={() => navigate('/auth')}
//               className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-5 rounded-full shadow-[0_0_25px_rgba(139,195,74,0.6)] hover:shadow-[0_0_40px_rgba(139,195,74,0.8)] hover:scale-105 transition-all duration-300"
//             >
//               🚀 Commencer
//             </Button>
//             <Button 
//               size="lg"
//               variant="outline"
//               className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-5 rounded-full bg-white/10 border-accent/50 text-accent hover:bg-accent/20 hover:shadow-[0_0_40px_rgba(139,195,74,0.8)] hover:scale-105 transition-all duration-300"
//               onClick={() => window.open(whatsappLink, '_blank')}
//             >
//               <MessageCircle className="w-5 h-5 mr-2" />
//               Contacter l'Assistant
//             </Button>
//           </div>

//           {/* Info Pills */}
//           <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in">
//             {["🎮 Gratuit", "📱 Multi-plateformes", "🛰️ Données NASA"].map((text, i) => (
//               <div 
//                 key={i} 
//                 className="bg-white/10 backdrop-blur-sm px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-white/20 text-white text-xs md:text-sm font-medium"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom gradient */}
//       <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent" />
//     </div>
//   );
// };

// export default Welcome;








// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import mascotImage from "@/assets/mascot-ecofarm.png";
// import backgroundVideo from "@/assets/background-video.mp4";
// import { Sparkles, MessageCircle } from "lucide-react";

// const Welcome = () => {
//   const navigate = useNavigate();
//   const whatsappNumber = "+24106015913";
//   const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=Salut%20!%20Je%20suis%20intéressé%20par%20EcoFarm%20Gabon%20Quest.`;

//   return (
//     <div className="h-screen w-screen relative flex flex-col items-center justify-between overflow-hidden">
//       {/* Video Background */}
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className="absolute inset-0 w-full h-full object-cover z-0"
//       >
//         <source src={backgroundVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       {/* Overlay to maintain visibility */}
//       <div className="absolute inset-0 bg-black/40 z-5"></div>

//       {/* Animated Background Particles */}
//       <div className="absolute inset-0 overflow-hidden z-10">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 10}s`,
//             }}
//           >
//             <Sparkles 
//               className="text-accent/30" 
//               size={12 + Math.random() * 20}
//             />
//           </div>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="relative z-20 h-full w-full max-w-6xl flex flex-col items-center justify-between px-4 py-6">
        
//         {/* Top: Mascot + Speech Bubble */}
//         <div className="flex flex-col items-center gap-4">
//           {/* Mascot */}
//           <div className="relative">
//             <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full animate-pulse" />
//             <img 
//               src={mascotImage} 
//               alt="Mascotte EcoFarm" 
//               className="w-28 md:w-40 lg:w-56 h-auto relative z-10 animate-bounce-in drop-shadow-[0_0_40px_rgba(139,195,74,0.5)]"
//             />
//           </div>

//           {/* Speech Bubble */}
//           <div className="animate-slide-up">
//             <div className="relative inline-block bg-card/95 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-primary/30 max-w-md">
//               <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-primary/30" />
//               <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card/95" />
              
//               <h1 className="text-xl md:text-2xl font-bold text-foreground mb-1">
//                 Salut, futur champion 🌱
//               </h1>
//               <p className="text-sm md:text-base text-muted-foreground font-medium">
//                 Prêt pour l'aventure agricole au Gabon ?
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Middle: Game Title */}
//         <div className="text-center animate-scale-in">
//           <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] tracking-wide">
//             ECOFARM
//           </h2>
//           <span className="block text-accent text-xl md:text-3xl lg:text-4xl">
//             GABON QUEST
//           </span>
//         </div>

//         {/* Bottom: Buttons + Info Pills */}
//         <div className="flex flex-col items-center gap-4">
//           {/* Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4">
//             <Button 
//               size="lg"
//               onClick={() => navigate('/auth')}
//               className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-5 rounded-full shadow-[0_0_25px_rgba(139,195,74,0.6)] hover:shadow-[0_0_40px_rgba(139,195,74,0.8)] hover:scale-105 transition-all duration-300"
//             >
//               🚀 Commencer
//             </Button>
//             <Button 
//               size="lg"
//               variant="outline"
//               className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-5 rounded-full bg-white/10 border-accent/50 text-accent hover:bg-accent/20 hover:shadow-[0_0_40px_rgba(139,195,74,0.8)] hover:scale-105 transition-all duration-300"
//               onClick={() => window.open(whatsappLink, '_blank')}
//             >
//               <MessageCircle className="w-5 h-5 mr-2" />
//               Contacter l'Assistant
//             </Button>
//           </div>

//           {/* Info Pills */}
//           <div className="flex flex-wrap justify-center gap-2 md:gap-3 animate-fade-in">
//             {["🎮 Gratuit", "📱 Multi-plateformes", "🛰️ Données NASA"].map((text, i) => (
//               <div 
//                 key={i} 
//                 className="bg-white/10 backdrop-blur-sm px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-white/20 text-white text-xs md:text-sm font-medium"
//               >
//                 {text}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Bottom gradient */}
//       <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent z-10" />
//     </div>
//   );
// };

// export default Welcome;












import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Bird } from "lucide-react";
import heroImage from "@/assets/hero-farm-gabon.jpg";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const Welcome = () => {
  const navigate = useNavigate();
  const whatsappNumber = "+24160155913";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+', '')}?text=Salut%20!%20Je%20suis%20intéressé%20par%20EcoFarm%20Gabon%20Quest.`;

  const messages = [
    {
      title: "Bienvenue sur EcoFarm !",
      text: "Veux-tu reprendre où l'on s'était arrêté ou commencer une nouvelle partie ?",
    },
    {
      title: "Blague agricole !",
      text: "Pourquoi les épouvantails sont-ils si bons en agriculture ? Parce qu'ils sont toujours dans le champ !",
    },
    {
      title: "Blague agricole !",
      text: "Que dit une vache qui cultive ? 'On va faire pousser du laitue' !",
    },
    {
      title: "Blague agricole !",
      text: "Pourquoi les tomates sont-elles les stars de la ferme ? Elles adorent être en conserve !",
    },
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 8000); // Cycle every 8 seconds
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div
      className="h-screen w-screen relative flex flex-col items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 max-w-4xl px-4">
        {/* Speech Bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative inline-block bg-gradient-to-br from-card/95 to-accent/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-glow border border-accent/50 max-w-lg"
          >
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-accent/50" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[14px] border-t-card/95" />
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              {messages[currentMessageIndex].title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-medium">
              {messages[currentMessageIndex].text}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Eagle Mascot */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full animate-pulse" />
          <Bird
            className="w-32 md:w-48 lg:w-64 h-auto text-accent drop-shadow-[0_0_40px_rgba(139,195,74,0.7)]"
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-5 rounded-full bg-primary text-white shadow-[0_0_25px_rgba(139,195,74,0.6)] hover:shadow-[0_0_40px_rgba(139,195,74,0.8)] hover:scale-105 transition-all duration-300"
          >
            🚀 Commencer
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg md:text-xl px-8 md:px-12 py-3 md:py-5 rounded-full bg-white/10 border-accent/50 text-accent hover:bg-accent/20 hover:shadow-[0_0_40px_rgba(139,195,74,0.8)] hover:scale-105 transition-all duration-300"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Contacter l'Assistant
          </Button>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/40 to-transparent z-10" />
    </div>
  );
};

export default Welcome;