# 📚 Documentation Backend - EcoFarm Gabon Quest

## 🎯 Vue d'Ensemble

Cette documentation décrit l'architecture backend complète pour **EcoFarm Gabon Quest**, une plateforme éducative interactive sur l'agriculture durable au Gabon utilisant les données satellites de la NASA.

---

## 🏗️ Architecture Technique

### Stack Technologique Recommandée

**Backend:**
- **Lovable Cloud** (Supabase) - Backend principal
- **PostgreSQL** - Base de données relationnelle
- **Edge Functions** - Serverless functions pour logique métier
- **Storage** - Stockage fichiers (avatars, assets)

**Authentification:**
- **Google OAuth 2.0** - Authentification exclusive via Google Sign-In

**APIs Externes:**
- **NASA Earthdata API** - Données satellites (SMAP, NDVI, GPM, LST)
- **Google Maps API** - Cartes interactives des provinces

---

## 📊 Schéma de Base de Données

### 1. Table `users`

Stocke les informations des joueurs authentifiés via Google.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  google_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(100),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_email ON users(email);
```

**Colonnes:**
- `id`: Identifiant unique (UUID)
- `google_id`: ID Google de l'utilisateur
- `email`: Email Google
- `display_name`: Nom affiché
- `avatar_url`: URL photo de profil Google
- `created_at`: Date de création du compte
- `last_login`: Dernière connexion
- `updated_at`: Dernière mise à jour

---

### 2. Table `characters`

Stocke les personnages créés par les joueurs.

```sql
CREATE TABLE characters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female')),
  age_group VARCHAR(10) CHECK (age_group IN ('young', 'adult')),
  farm_type VARCHAR(20) CHECK (farm_type IN ('family', 'cooperative')),
  province_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_characters_user_id ON characters(user_id);
CREATE INDEX idx_characters_province_id ON characters(province_id);
```

**Colonnes:**
- `id`: Identifiant unique du personnage
- `user_id`: Référence vers l'utilisateur (clé étrangère)
- `name`: Nom personnalisé
- `gender`: Genre (male/female)
- `age_group`: Tranche d'âge (young <15 ans, adult ≥15 ans)
- `farm_type`: Type de ferme (family/cooperative)
- `province_id`: Province sélectionnée (estuaire, moyen-ogooue, etc.)

---

### 3. Table `provinces`

Référentiel des 9 provinces du Gabon avec métadonnées.

```sql
CREATE TABLE provinces (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  climate_type VARCHAR(50),
  nasa_bbox_coordinates JSONB, -- Bounding box pour filtrer données NASA
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO provinces (id, name, description, climate_type, nasa_bbox_coordinates) VALUES
('estuaire', 'Estuaire', 'Pluies abondantes, défis d''irrigation', 'tropical_humid', '{"min_lat": -0.5, "max_lat": 1.0, "min_lon": 9.0, "max_lon": 10.5}'),
('moyen-ogooue', 'Moyen-Ogooué', 'Climat équatorial, forte humidité', 'equatorial', '{"min_lat": -1.5, "max_lat": 0.0, "min_lon": 10.0, "max_lon": 11.5}'),
('haut-ogooue', 'Haut-Ogooué', 'Sécheresses potentielles', 'savanna', '{"min_lat": -2.5, "max_lat": -0.5, "min_lon": 12.5, "max_lon": 14.5}'),
('ngounie', 'Ngounié', 'Agriculture mixte, sols variés', 'mixed', '{"min_lat": -2.0, "max_lat": -1.0, "min_lon": 10.5, "max_lon": 11.5}'),
('nyanga', 'Nyanga', 'Zone côtière, salinité des sols', 'coastal', '{"min_lat": -3.5, "max_lat": -2.5, "min_lon": 10.5, "max_lon": 11.5}'),
('ogooue-ivindo', 'Ogooué-Ivindo', 'Forêt dense, biodiversité', 'rainforest', '{"min_lat": 0.0, "max_lat": 1.5, "min_lon": 12.5, "max_lon": 14.0}'),
('ogooue-lolo', 'Ogooué-Lolo', 'Savane arbustive', 'savanna', '{"min_lat": -1.5, "max_lat": 0.0, "min_lon": 11.5, "max_lon": 13.0}'),
('ogooue-maritime', 'Ogooué-Maritime', 'Zone côtière, aquaculture', 'coastal', '{"min_lat": -2.0, "max_lat": -1.0, "min_lon": 9.0, "max_lon": 10.5}'),
('woleu-ntem', 'Woleu-Ntem', 'Frontière nord, variété climatique', 'mixed', '{"min_lat": 1.5, "max_lat": 2.5, "min_lon": 10.5, "max_lon": 12.5}');
```

**Colonnes:**
- `id`: Identifiant (slug)
- `name`: Nom complet
- `description`: Description courte
- `climate_type`: Type de climat
- `nasa_bbox_coordinates`: Coordonnées bounding box pour API NASA (JSON)

---

### 4. Table `chapters`

Définit les chapitres du jeu (thématiques NASA).

```sql
CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description TEXT,
  nasa_data_type VARCHAR(50), -- SMAP, NDVI, GPM, LST, etc.
  icon_name VARCHAR(50), -- Nom de l'icône Lucide React
  unlock_requirement INTEGER DEFAULT 0, -- % completion du chapitre précédent
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO chapters (title, description, nasa_data_type, icon_name, unlock_requirement, display_order) VALUES
('Humidité du Sol', 'Maîtrisez les données SMAP pour optimiser l''irrigation', 'SMAP', 'Droplets', 0, 1),
('Santé de la Végétation', 'Utilisez NDVI pour la fertilisation optimale', 'NDVI', 'Sprout', 80, 2),
('Précipitations & Climat', 'Gérez le bétail avec les données GPM et LST', 'GPM', 'Cloud', 80, 3),
('Tendances Climatiques', 'Combinez les données pour des décisions éclairées', 'COMBINED', 'TrendingUp', 80, 4),
('Agriculture Durable', 'Applications réelles au Gabon', 'REAL_WORLD', 'Award', 80, 5);
```

---

### 5. Table `levels`

Définit les niveaux individuels dans chaque chapitre.

```sql
CREATE TABLE levels (
  id SERIAL PRIMARY KEY,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  level_number INTEGER NOT NULL,
  title VARCHAR(150) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('quiz', 'puzzle', 'simulation', 'action', 'analysis', 'debate', 'ar', 'visual', 'narrative', 'final')),
  description TEXT,
  min_score_to_pass INTEGER DEFAULT 80, -- % minimum pour réussir
  content JSONB, -- Questions, scénarios, etc. (structure dynamique)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(chapter_id, level_number)
);

CREATE INDEX idx_levels_chapter_id ON levels(chapter_id);
```

**Types de niveaux:**
- `quiz`: QCM
- `puzzle`: Énigmes/puzzles
- `simulation`: Simulations interactives
- `action`: Mini-jeux d'action
- `analysis`: Analyse de données
- `debate`: Scénarios à débattre
- `ar`: Réalité augmentée
- `visual`: Quiz visuels (images)
- `narrative`: Histoires interactives
- `final`: Défi final du chapitre

**Colonne `content` (JSONB):**
Structure flexible selon le type. Exemples:

**Quiz:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "Quelle profondeur mesure SMAP ?",
      "choices": ["0-5 cm", "10-20 cm", "50-100 cm"],
      "correct_answer": 0,
      "explanation": "SMAP mesure l'humidité superficielle (0-5 cm)."
    }
  ]
}
```

**Simulation:**
```json
{
  "scenario": "Arrosez une parcelle basée sur une carte SMAP",
  "smap_map_url": "/assets/smap-map-example.png",
  "threshold_values": { "dry": 10, "optimal": 30, "wet": 50 }
}
```

---

### 6. Table `game_progress`

Suit la progression des joueurs (chapitres/niveaux complétés).

```sql
CREATE TABLE game_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE CASCADE,
  level_id INTEGER REFERENCES levels(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(character_id, level_id)
);

CREATE INDEX idx_game_progress_character_id ON game_progress(character_id);
CREATE INDEX idx_game_progress_chapter_id ON game_progress(chapter_id);
```

---

### 7. Table `saves`

Sauvegardes manuelles et automatiques.

```sql
CREATE TABLE saves (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  save_type VARCHAR(10) CHECK (save_type IN ('auto', 'manual')),
  game_state JSONB NOT NULL, -- État complet du jeu (position, inventaire, etc.)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_saves_character_id ON saves(character_id);
CREATE INDEX idx_saves_created_at ON saves(created_at DESC);
```

**Colonne `game_state` (JSONB):**
```json
{
  "current_chapter": 2,
  "current_level": 5,
  "unlocked_chapters": [1, 2],
  "scores": {
    "chapter_1_level_1": 90,
    "chapter_1_level_2": 85
  },
  "settings": {
    "sound_volume": 70,
    "music_volume": 50,
    "language": "french"
  }
}
```

---

### 8. Table `achievements` (Optionnel - Badges)

Badges et réalisations débloqués.

```sql
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon_name VARCHAR(50),
  unlock_criteria JSONB, -- Conditions de déblocage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  character_id UUID REFERENCES characters(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(character_id, achievement_id)
);
```

---

### 9. Table `nasa_data_cache` (Optionnel - Cache)

Cache local des données NASA pour réduire les appels API.

```sql
CREATE TABLE nasa_data_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  province_id VARCHAR(50) REFERENCES provinces(id),
  data_type VARCHAR(50), -- SMAP, NDVI, GPM, LST
  data_date DATE,
  raw_data JSONB,
  processed_data JSONB, -- Données traitées pour le jeu
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(province_id, data_type, data_date)
);

CREATE INDEX idx_nasa_data_cache_province ON nasa_data_cache(province_id);
CREATE INDEX idx_nasa_data_cache_type_date ON nasa_data_cache(data_type, data_date);
```

---

## 🔐 Authentification & Sécurité

### Google OAuth 2.0

**Flow d'authentification:**
1. Utilisateur clique "Continuer avec Google"
2. Redirection vers Google OAuth consent screen
3. Google retourne un `id_token` (JWT)
4. Backend vérifie le token via Google API
5. Créer/mettre à jour l'utilisateur dans `users`
6. Créer une session Supabase
7. Retourner un token de session au frontend

**Configuration Supabase:**
```sql
-- Enable Google Auth Provider in Supabase Dashboard
-- Add Google OAuth Client ID and Secret
-- Set redirect URL: https://your-domain.com/auth/callback
```

**Sécurité:**
- **RLS (Row Level Security)** activé sur toutes les tables
- Politiques RLS pour isoler les données par utilisateur
- Tokens JWT avec expiration (1h par défaut)
- Refresh tokens pour sessions longues

**Exemple RLS Policy:**
```sql
-- Les utilisateurs ne peuvent voir que leurs propres données
CREATE POLICY user_isolation_policy ON characters
  FOR ALL USING (user_id = auth.uid());

CREATE POLICY user_isolation_progress ON game_progress
  FOR ALL USING (
    character_id IN (
      SELECT id FROM characters WHERE user_id = auth.uid()
    )
  );
```

---

## 🛠️ Edge Functions (Supabase Functions)

### 1. `fetch-nasa-data`

Récupère les données satellites NASA pour une province donnée.

**Endpoint:** `POST /functions/v1/fetch-nasa-data`

**Request Body:**
```json
{
  "province_id": "estuaire",
  "data_types": ["SMAP", "NDVI"],
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}
```

**Response:**
```json
{
  "data": {
    "SMAP": {
      "date": "2024-01-15",
      "values": [
        { "lat": 0.5, "lon": 9.5, "moisture": 25.3 }
      ]
    },
    "NDVI": {
      "date": "2024-01-15",
      "values": [
        { "lat": 0.5, "lon": 9.5, "ndvi": 0.75 }
      ]
    }
  },
  "cached": false
}
```

**Implémentation (TypeScript):**
```typescript
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  const { province_id, data_types, date_range } = await req.json()
  
  // Check cache first
  const cached = await checkCache(province_id, data_types, date_range)
  if (cached) return new Response(JSON.stringify(cached), { status: 200 })
  
  // Fetch from NASA API
  const nasaData = await fetchNASAData(province_id, data_types, date_range)
  
  // Store in cache
  await storeCache(province_id, data_types, date_range, nasaData)
  
  return new Response(JSON.stringify({ data: nasaData, cached: false }), { status: 200 })
})
```

**NASA API Endpoints:**
- **SMAP:** `https://api.nasa.gov/planetary/earth/assets?lon={lon}&lat={lat}&date={date}&api_key={KEY}`
- **NDVI:** Via NASA EarthData (nécessite compte et token)
- **GPM:** `https://gpm.nasa.gov/data/...`

---

### 2. `submit-level-score`

Soumet le score d'un niveau complété.

**Endpoint:** `POST /functions/v1/submit-level-score`

**Request Body:**
```json
{
  "character_id": "uuid-here",
  "level_id": 3,
  "score": 85,
  "answers": { ... }
}
```

**Response:**
```json
{
  "success": true,
  "passed": true,
  "unlocked_next": true,
  "chapter_progress": 40
}
```

**Logique:**
1. Vérifier que le personnage appartient à l'utilisateur authentifié
2. Valider le score (0-100)
3. Mettre à jour `game_progress`
4. Vérifier si le niveau suivant/chapitre suivant est débloqué
5. Retourner la progression mise à jour

---

### 3. `save-game`

Sauvegarde manuelle ou automatique de l'état du jeu.

**Endpoint:** `POST /functions/v1/save-game`

**Request Body:**
```json
{
  "character_id": "uuid-here",
  "save_type": "manual",
  "game_state": {
    "current_chapter": 2,
    "current_level": 5,
    ...
  }
}
```

---

### 4. `load-game`

Charge la dernière sauvegarde.

**Endpoint:** `GET /functions/v1/load-game?character_id=uuid-here`

**Response:**
```json
{
  "game_state": { ... },
  "saved_at": "2024-01-15T10:30:00Z"
}
```

---

## 📡 Intégration NASA API

### Données Disponibles

1. **SMAP (Soil Moisture Active Passive)**
   - Humidité du sol (0-5 cm de profondeur)
   - Résolution: ~9 km
   - Mise à jour: tous les 2-3 jours
   - **Limitation:** Mesure superficielle, adapter au contexte gabonais

2. **NDVI (Normalized Difference Vegetation Index)**
   - Santé de la végétation (0 = sol nu, 1 = végétation dense)
   - Source: Landsat, Sentinel-2
   - Résolution: 10-30m
   - Mise à jour: hebdomadaire/mensuelle

3. **GPM (Global Precipitation Measurement)**
   - Précipitations (mm/jour)
   - Résolution: ~10 km
   - Mise à jour: quotidienne

4. **LST (Land Surface Temperature)**
   - Température de surface (°C)
   - Source: MODIS
   - Résolution: 1 km
   - Mise à jour: quotidienne

### Configuration API

**Clé API NASA:**
Obtenir via: https://api.nasa.gov/

**Stockage sécurisé:**
```sql
-- Stocker dans Supabase Secrets
INSERT INTO vault.secrets (name, secret) VALUES ('NASA_API_KEY', 'your-key-here');
```

**Appel dans Edge Function:**
```typescript
const NASA_API_KEY = Deno.env.get('NASA_API_KEY')
```

---

## 🔄 Flux de Données

### 1. Nouvelle Partie
```
User -> Frontend -> Auth (Google) -> Backend
  -> Create User (if new) -> Create Character -> Select Province
  -> Load Chapter 1 Levels -> Return Game State
```

### 2. Jouer un Niveau
```
Frontend -> Request Level Data -> Backend
  -> Check Unlock Status -> Load Level Content
  -> (If simulation) Fetch NASA Data -> Return Level
  -> User Completes -> Submit Score -> Update Progress
  -> Check Chapter Unlock -> Return Updated State
```

### 3. Sauvegarde Automatique
```
Timer (5 min) -> Frontend captures state -> Backend
  -> Insert into saves (type: auto) -> Cleanup old saves (>10)
```

---

## 🧪 Tests & Validation

### Tests Unitaires (Backend)

**Supabase Edge Functions:**
- Test des fonctions avec `deno test`
- Mock des appels NASA API
- Validation des schémas JSON

### Tests d'Intégration

**Authentification:**
- [ ] Google OAuth flow complet
- [ ] Création automatique de compte
- [ ] Gestion des sessions

**Progression:**
- [ ] Déblocage de niveaux linéaire
- [ ] Déblocage de chapitre à 80%
- [ ] Calcul correct des scores

**NASA API:**
- [ ] Cache fonctionnel (hit/miss)
- [ ] Gestion des erreurs API (rate limit, timeout)
- [ ] Fallback si API indisponible

---

## 📈 Optimisations & Performance

### 1. Mise en Cache Agressive

**Stratégie:**
- Cacher les données NASA par province/date (expire après 7 jours)
- Utiliser Redis/Supabase Cache pour les données fréquentes
- Pré-charger les niveaux suivants en arrière-plan

### 2. Lazy Loading

**Frontend:**
- Charger uniquement le chapitre actif
- Images/assets à la demande
- Pagination des historiques de scores

### 3. Compression

**API Responses:**
- Activer gzip/brotli sur Supabase Edge
- Minimiser les payloads JSON

---

## 🚀 Déploiement

### 1. Configuration Lovable Cloud

**Activer Lovable Cloud:**
```bash
# Via l'interface Lovable ou API
```

**Migration Initiale:**
```sql
-- Exécuter les scripts SQL dans l'ordre:
1. users.sql
2. provinces.sql
3. characters.sql
4. chapters.sql
5. levels.sql
6. game_progress.sql
7. saves.sql
8. achievements.sql (optionnel)
9. nasa_data_cache.sql (optionnel)
```

### 2. Secrets & Variables d'Environnement

**Supabase Dashboard:**
- `NASA_API_KEY`: Clé NASA
- `GOOGLE_OAUTH_CLIENT_ID`: ID OAuth Google
- `GOOGLE_OAUTH_CLIENT_SECRET`: Secret OAuth Google

### 3. Edge Functions

**Déployer:**
```bash
# Via CLI Supabase
supabase functions deploy fetch-nasa-data
supabase functions deploy submit-level-score
supabase functions deploy save-game
supabase functions deploy load-game
```

---

## 📞 Support & Maintenance

### Monitoring

**Métriques à surveiller:**
- Taux d'erreur API NASA (> 5% = alerte)
- Temps de réponse Edge Functions (< 500ms idéal)
- Nombre de sauvegardes/jour (croissance utilisateurs)
- Cache hit rate (> 70% optimal)

### Logs

**Supabase Logs:**
- Activer logging détaillé pour Edge Functions
- Monitorer erreurs 500/400 dans le dashboard

### Backups

**Base de Données:**
- Backups automatiques quotidiens (Supabase)
- Rétention: 7 jours (plan gratuit), 30 jours (pro)

---

## 🎓 Ressources

**NASA APIs:**
- https://api.nasa.gov/
- https://earthdata.nasa.gov/

**Supabase Docs:**
- https://supabase.com/docs

**Google OAuth:**
- https://developers.google.com/identity/protocols/oauth2

---

## ✅ Checklist de Production

- [ ] Activer Google OAuth dans Supabase
- [ ] Configurer NASA API Key
- [ ] Migrer toutes les tables SQL
- [ ] Activer RLS sur toutes les tables
- [ ] Déployer les 4 Edge Functions
- [ ] Tester le flow complet (auth -> play -> save)
- [ ] Configurer monitoring/alertes
- [ ] Documenter les endpoints pour le frontend
- [ ] Tester avec données réelles NASA
- [ ] Vérifier performance (<500ms API responses)

---

**Version:** 1.0
**Dernière mise à jour:** Janvier 2025
**Auteur:** EcoFarm Gabon Team
