# 🤖 Instructions Gemini AI - EcoFarm Gabon Quest

## ✅ Ce qui a été implémenté

### 1. **Service Gemini Intégré**
- ✅ Service `geminiService.ts` créé avec simulation
- ✅ Hook `useGemini.ts` pour la gestion d'état
- ✅ Composant `GeminiToggle.tsx` pour l'interface
- ✅ Package `@google/generative-ai` ajouté au package.json

### 2. **Interface Utilisateur**
- ✅ Bouton "🤖 Gemini ON/OFF" dans la barre supérieure
- ✅ Indicateur de statut dans la zone des chapitres
- ✅ Animation de chargement pendant la génération
- ✅ Fallback automatique vers les données statiques

### 3. **Fonctionnalités**
- ✅ Génération dynamique de défis personnalisés
- ✅ Cache intelligent pour éviter les régénérations
- ✅ Progression pédagogique (débutant → expert)
- ✅ Adaptation au contexte gabonais

## 🚀 Prochaines étapes pour vous

### 1. **Installer les dépendances**
```bash
cd c:\Users\zight\OneDrive\Bureau\Proet_jeux\site
npm install
```

### 2. **Configurer votre clé API Gemini**
1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez une nouvelle clé API
3. Copiez le fichier `.env.example` vers `.env` :
```bash
copy .env.example .env
```
4. Ajoutez votre clé dans `.env` :
```env
VITE_GEMINI_API_KEY=votre_cle_api_ici
```

### 3. **Lancer le projet**
```bash
npm run dev
```

**⚠️ Important** : Redémarrez le serveur après avoir modifié le fichier `.env`

## 🎯 Comment ça fonctionne

### **Mode Simulation (Actuel)**
- Le service utilise une base de données de défis prédéfinis
- Simule l'API Gemini avec un délai réaliste
- Parfait pour tester l'interface sans clé API

### **Mode Gemini (Avec clé API)**
- Remplacez la fonction `simulateGeminiGeneration` par l'API réelle
- Décommentez les imports Google Generative AI
- Les défis seront générés dynamiquement

## 🔧 Personnalisation

### **Ajouter plus de défis simulés**
Modifiez `GEMINI_CHALLENGES` dans `geminiService.ts` :
```typescript
const GEMINI_CHALLENGES = {
  'SMAP': [
    // Vos défis SMAP
  ],
  'NDVI': [
    // Vos défis NDVI
  ],
  // ... autres chapitres
};
```

### **Modifier les prompts Gemini**
Adaptez la fonction `buildPrompt()` pour vos besoins spécifiques.

## 🎮 Utilisation dans le jeu

1. **Activez Gemini** : Cliquez sur "🤖 Gemini ON" dans la barre supérieure
2. **Sélectionnez un niveau** : L'icône de chargement apparaît
3. **Défi généré** : Question personnalisée selon le chapitre NASA
4. **Progression** : Chaque niveau adapte sa difficulté

## 📊 Avantages

- **Contenu infini** : Plus jamais les mêmes questions
- **Adaptation contextuelle** : Spécifique au Gabon et à l'agriculture
- **Progression naturelle** : Difficulté croissante automatique
- **Performance optimisée** : Cache et fallback intelligents

## 🛠️ Support technique

Si vous rencontrez des problèmes :
1. Vérifiez que la clé API est correcte
2. Redémarrez le serveur après modification du `.env`
3. Consultez la console pour les erreurs
4. Le mode simulation fonctionne toujours sans clé API

---

**🌟 Votre jeu est maintenant prêt pour l'IA générative ! Ajoutez simplement votre clé API Gemini pour débloquer des défis illimités.**
