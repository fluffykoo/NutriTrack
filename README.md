# TP : **NutriTrack - Suivi alimentaire, nutrition et objectifs**

### 🎯 Objectif

Créer une **application complète de suivi nutritionnel** qui permet à un utilisateur de :

- Ajouter des repas avec informations nutritionnelles (calories, protéines, glucides, lipides, etc.)
- Planifier ses menus sur la semaine
- Définir des **objectifs nutritionnels journaliers**
- Visualiser sa progression via des **graphiques dynamiques**
- Obtenir des recommandations alimentaires en fonction des objectifs (Bonus)
- Gérer plusieurs profils utilisateurs en utilisant le localStorage (Bonus)

---

## 📦 Fonctionnalités backend (Node.js / Express + JSON DB ou MongoDB) :

- Authentification simple (token ou localstorage)
- Gestion des repas (`POST /meals`, `GET /meals`)
- Objectifs nutritionnels (`POST /goals`, `GET /goals`)
- Calcul automatique des totaux journaliers (avec `reduce`)
- Génération de recommandations (filtrage + composition fonctionnelle)
- API REST bien organisée (routes RESTful, séparation des responsabilités)

---

## 💻 Fonctionnalités frontend (Vanilla JS) :

- Interface de dashboard : résumés des apports journaliers, graphiques
- Ajout de repas via un formulaire dynamique
- Visualisation des objectifs atteints (avec barres de progression)
- Recommandations en fonction des repas manquants
- Statistiques : top repas les plus riches, repas équilibrés, etc.

---

## 🧠 Concepts fonctionnels obligatoires :

- **Fonctions pures** pour la logique métier (calculs, filtrage)
- **Composition de fonctions** (`compose`, `pipe`)
- Usage intensif de `map`, `filter`, `reduce`
- Manipulation **immutables** des états (via `Object.freeze`, `Ramda`, ou libs maison)
- Séparation stricte des **fonctions pures / effets de bord**
- Intégration d’une petite lib fonctionnelle type `Ramda`

---

## 📈 Bonus possibles :

- Génération automatique de menus équilibrés avec contraintes
- Création d’une API nutrition open-source simulée
- Export vers un fichier `.csv` ou `.json`
- Tests unitaires des fonctions pures avec Jest