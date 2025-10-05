


// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft, MapPin } from "lucide-react";

// const provinces = [
//   { id: "estuaire", name: "Estuaire", description: "Pluies abondantes, défis d'irrigation" },
//   { id: "moyen-ogooue", name: "Moyen-Ogooué", description: "Climat équatorial, forte humidité" },
//   { id: "haut-ogooue", name: "Haut-Ogooué", description: "Sécheresses potentielles" },
//   { id: "ngounie", name: "Ngounié", description: "Agriculture mixte, sols variés" },
//   { id: "nyanga", name: "Nyanga", description: "Zone côtière, salinité des sols" },
//   { id: "ogooue-ivindo", name: "Ogooué-Ivindo", description: "Forêt dense, biodiversité" },
//   { id: "ogooue-lolo", name: "Ogooué-Lolo", description: "Savane arbustive" },
//   { id: "ogooue-maritime", name: "Ogooué-Maritime", description: "Zone côtière, aquaculture" },
//   { id: "woleu-ntem", name: "Woleu-Ntem", description: "Frontière nord, variété climatique" },
// ];

// const ProvinceSelection = () => {
//   const navigate = useNavigate();

//   const handleProvinceSelect = (provinceId) => {
//     console.log("Selected province:", provinceId);
//     navigate('/character-creation');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 md:p-8">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <div className="mb-8 space-y-4">
//           <Button
//             variant="ghost"
//             onClick={() => navigate('/menu')}
//             className="gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Retour au Menu
//           </Button>

//           <div className="text-center space-y-2">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground">
//               Choisissez Votre Province
//             </h1>
//             <p className="text-muted-foreground max-w-2xl mx-auto">
//               Sélectionnez la province gabonaise où vous souhaitez établir votre ferme. 
//               Chaque province a ses propres défis climatiques basés sur les données NASA réelles.
//             </p>
//           </div>
//         </div>

//         {/* Map Preview */}
//         <div className="mb-8">
//           <Card className="overflow-hidden shadow-soft">
//             <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781158.064525122!2d9.486487891578822!3d-0.5007782706558189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107ed7b6a5013477%3A0x95cf24be3abeed8e!2sCom%C3%A9die%20Gabon%20Heinz%20et%20Firmino!5e0!3m2!1sfr!2sga!4v1759650368774!5m2!1sfr!2sga"
//               width="100%"
//               height="450"
//               style={{ border: 0 }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Carte du Gabon"
//             ></iframe>
//           </Card>
//         </div>

//         {/* Province Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//           {provinces.map((province, index) => (
//             <Card 
//               key={province.id}
//               className="p-6 hover:shadow-glow transition-all cursor-pointer group animate-slide-up"
//               style={{ animationDelay: `${index * 50}ms` }}
//               onClick={() => handleProvinceSelect(province.id)}
//             >
//               <div className="space-y-3">
//                 <div className="flex items-start gap-3">
//                   <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
//                     <MapPin className="w-5 h-5 text-primary" />
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
//                       {province.name}
//                     </h3>
//                     <p className="text-sm text-muted-foreground mt-1">
//                       {province.description}
//                     </p>
//                   </div>
//                 </div>

//                 <Button 
//                   variant="outline" 
//                   size="sm" 
//                   className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
//                 >
//                   Sélectionner
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>

//         {/* Info Note */}
//         <div className="mt-8 text-center">
//           <Card className="bg-accent/10 border-accent/20 p-4 max-w-3xl mx-auto">
//             <p className="text-sm text-muted-foreground">
//               <strong className="text-accent">Note :</strong> Les données NASA (SMAP pour l'humidité du sol, 
//               NDVI pour la végétation, GPM pour les précipitations) seront adaptées à la province que vous choisissez 
//               pour des scénarios plus réalistes.
//             </p>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProvinceSelection;






import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-farm-gabon.jpg";
import leafSvg from "@/assets/leaf.svg";

const provinces = [
  { id: "estuaire", name: "Estuaire", description: "Pluies abondantes, défis d'irrigation" },
  { id: "moyen-ogooue", name: "Moyen-Ogooué", description: "Climat équatorial, forte humidité" },
  { id: "haut-ogooue", name: "Haut-Ogooué", description: "Sécheresses potentielles" },
  { id: "ngounie", name: "Ngounié", description: "Agriculture mixte, sols variés" },
  { id: "nyanga", name: "Nyanga", description: "Zone côtière, salinité des sols" },
  { id: "ogooue-ivindo", name: "Ogooué-Ivindo", description: "Forêt dense, biodiversité" },
  { id: "ogooue-lolo", name: "Ogooué-Lolo", description: "Savane arbustive" },
  { id: "ogooue-maritime", name: "Ogooué-Maritime", description: "Zone côtière, aquaculture" },
  { id: "woleu-ntem", name: "Woleu-Ntem", description: "Frontière nord, variété climatique" },
];

const ProvinceSelection = () => {
  const navigate = useNavigate();

  const handleProvinceSelect = (provinceId) => {
    console.log("Selected province:", provinceId);
    navigate('/character-creation');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="h-screen bg-cover bg-center relative flex flex-col overflow-hidden"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black/50 z-5"></div>

      <div className="container mx-auto max-w-7xl h-full flex flex-col p-2 sm:p-4 relative z-10">
        {/* Header - Compact */}
        <div className="flex-shrink-0 mb-2 sm:mb-4 space-y-2">
          <Button
            variant="ghost"
            onClick={() => navigate('/menu')}
            className="gap-2 text-white/80 hover:text-white"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au Menu
          </Button>

          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Choisissez Votre Province
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl mx-auto">
              Sélectionnez la province gabonaise où vous souhaitez établir votre ferme.
            </p>
          </div>
        </div>

        {/* Main Content - Flexible Layout */}
        <div className="flex-1 grid lg:grid-cols-3 gap-3 min-h-0">
          {/* Map Preview - Compact */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden shadow-soft border-accent/20 h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781158.064525122!2d9.486487891578822!3d-0.5007782706558189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107ed7b6a5013477%3A0x95cf24be3abeed8e!2sCom%C3%A9die%20Gabon%20Heinz%20et%20Firmino!5e0!3m2!1sfr!2sga!4v1759650368774!5m2!1sfr!2sga"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '200px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte du Gabon"
              ></iframe>
            </Card>
          </div>

          {/* Province Grid - Scrollable */}
          <div className="lg:col-span-2 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 pr-2">
              {provinces.map((province, index) => (
                <Card
                  key={province.id}
                  className="p-3 sm:p-4 hover:shadow-glow transition-all cursor-pointer group animate-slide-up bg-green-800/80 backdrop-blur-sm border-accent/30 relative overflow-hidden h-fit"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleProvinceSelect(province.id)}
                >
                  {/* Leaf-shaped background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:opacity-70 transition-opacity"
                    style={{ backgroundImage: `url(${leafSvg})` }}
                  ></div>
                  <div className="relative z-10 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base text-white group-hover:text-accent transition-colors truncate">
                          {province.name}
                        </h3>
                        <p className="text-xs text-white/80 mt-1 line-clamp-2">
                          {province.description}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground border-accent/50 text-white hover:text-accent-foreground text-xs h-7"
                    >
                      Sélectionner
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Info Note - Compact */}
        <div className="flex-shrink-0 mt-2 sm:mt-3 text-center">
          <Card className="bg-accent/10 border-accent/20 p-2 sm:p-3">
            <p className="text-xs sm:text-sm text-white/90">
              <strong className="text-accent">Note :</strong> Les données NASA seront adaptées à votre province 
              pour des scénarios réalistes.
            </p>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ProvinceSelection;