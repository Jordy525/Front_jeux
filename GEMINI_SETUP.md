# 🤖 Configuration Gemini AI

## Vue d'ensemble

Le jeu **EcoFarm Gabon Quest** intègre maintenant **Gemini AI** de Google pour générer dynamiquement les défis éducatifs basés sur les données NASA agricoles.

## ✨ Fonctionnalités

- **Génération dynamique** de questions personnalisées
- **Adaptation au contexte gabonais** (cacao, palmier à huile, climat équatorial)
- **Progression pédagogique** : débutant → intermédiaire → avancé
- **Fallback automatique** vers les données statiques si erreur
- **Cache intelligent** pour éviter les régénérations

## 🚀 Installation

### 1. Installer les dépendances
```bash
npm install @google/generative-ai
```

### 2. Obtenir une clé API Gemini
1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez une nouvelle clé API
3. Copiez la clé générée

### 3. Configuration environnement
1. Copiez le fichier `.env.example` vers `.env`
```bash
cp .env.example .env
```

2. Ajoutez votre clé API dans `.env`
```env
REACT_APP_GEMINI_API_KEY=your_actual_api_key_here
```

## 🎯 Utilisation

### Activation automatique
- Si la clé API est configurée → Gemini s'active automatiquement
- Sinon → Utilisation des données statiques

### Interface utilisateur
- **Badge "🤖 Gemini AI"** indique le statut
- **Bouton Activer/Désactiver** pour contrôler l'usage
- **Indicateur de chargement** pendant la génération

### Génération des défis
```typescript
// Exemple d'utilisation
const challenge = await geminiService.generateLevelChallenge(
  {
    name: "SMAP",
    fullName: "Soil Moisture Active Passive",
    description: "Mesure l'humidité du sol depuis l'espace",
    applications: ["Irrigation", "Agriculture de précision"]
  },
  3, // Niveau
  "quiz", // Type
  "intermediate" // Difficulté
);
```

## 📊 Structure des défis générés

```json
{
  "question": "Question éducative précise",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "hint": "Indice utile sans révéler la réponse",
  "explanation": "Explication détaillée pour l'apprentissage"
}
```

## 🔧 Personnalisation

### Prompts Gemini
Les prompts sont optimisés pour :
- **Contexte gabonais** : Cultures locales, climat équatorial
- **Progression pédagogique** : 3 niveaux de difficulté
- **Applications pratiques** : Usage concret des données NASA

### Cache et performance
- **Cache local** : Évite les régénérations
- **Délai anti-spam** : 1 seconde entre les requêtes
- **Fallback robuste** : Données statiques si erreur

## 🛠️ Développement

### Ajouter de nouveaux types de défis
1. Modifier `GeminiService.getLevelType()`
2. Adapter les prompts selon le type
3. Tester avec différentes difficultés

### Debug et logs
```typescript
// Activer les logs détaillés
console.log('Génération Gemini:', challenge);
```

## 🚨 Résolution de problèmes

### Erreur "Module not found"
```bash
npm install @google/generative-ai
```

### Clé API invalide
- Vérifiez que la clé est correcte dans `.env`
- Redémarrez le serveur de développement

### Génération lente
- Normal pour la première génération
- Les suivantes utilisent le cache

## 📈 Métriques

- **100 niveaux** générables (10 chapitres × 10 niveaux)
- **10 données NASA** couvertes
- **3 niveaux de difficulté** par chapitre
- **Cache intelligent** pour les performances

## 🎓 Avantages pédagogiques

1. **Contenu varié** : Jamais les mêmes questions
2. **Adaptation contextuelle** : Spécifique au Gabon
3. **Progression naturelle** : Difficulté croissante
4. **Explications riches** : Apprentissage approfondi

---

**🌟 Avec Gemini, chaque partie devient une expérience d'apprentissage unique !**
