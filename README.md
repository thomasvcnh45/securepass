# 🔐 SecurePass – Gérez vos mots de passe en toute sécurité

**SecurePass** est une application de bureau moderne (Windows, basée sur Electron) utilisant les technologies web, conçue pour vous aider à stocker, générer et gérer vos mots de passe de façon sécurisée.
Grâce à une interface simple et efficace, gardez le contrôle sur vos identifiants et protégez vos données sensibles.

---

## 🎬 Démo vidéo

👉 [Voir la vidéo de présentation](assets/securepass.mp4)

---

## 🖼️ Aperçu


![Aperçu de SecurePass](assets/securepass.png)

*Des captures d'écran seront ajoutées prochainement pour illustrer l’interface.*

---

## ✨ Fonctionnalités principales

- 🔒 **Stockage sécurisé** : Sauvegardez vos mots de passe localement
- 🛡️ **Générateur de mots de passe** : Créez des mots de passe robustes en un clic (JS & WebAssembly)
- 🖥️ **Interface moderne** : Application web responsive et intuitive
- ⚡ **Performance** : Application rapide grâce à Vite et React
- 🧩 **Extensible** : Code source modulaire pour faciliter l’ajout de fonctionnalités
- 🖱️ **Application Desktop** : Fonctionne aussi comme application de bureau grâce à Electron

---

## 🛠️ Technologies utilisées

### 🔧 Frontend
- ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
- ![Lucide React](https://img.shields.io/badge/Lucide_React-000000?logo=lucide&logoColor=white)

### 🎨 UI & Design
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)
- ![Autoprefixer](https://img.shields.io/badge/Autoprefixer-DD3735?logo=autoprefixer&logoColor=white)
- ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?logo=postcss&logoColor=white)

### 🖥️ Application Desktop
- ![Electron](https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white)
- ![Electron Builder](https://img.shields.io/badge/Electron_Builder-47848F?logo=electron&logoColor=white)

### 🧪 Qualité & Outils Dev
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
- ![Globals](https://img.shields.io/badge/Globals-15AABF?logo=javascript&logoColor=white)

### 🔐 Sécurité & Chiffrement
- Utilisation de `crypto.getRandomValues` côté JS pour la génération sécurisée

### ⚙️ Autres
- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=white)

---

## 🚀 Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/votre-utilisateur/securepass.git

# Aller dans le dossier du projet
cd securepass

# Installer les dépendances
npm install

# Lancer le serveur de développement (web)
npm run dev

# Lancer l'application desktop (Electron)
npm run electron
```

---

## 🌐 Variables d'Environnement

*Aucune variable d’environnement n’est requise pour l’instant.*  
(Si besoin, ajoutez ici les instructions pour les clés ou configurations spécifiques.)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à proposer une pull request.

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
