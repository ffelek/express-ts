<!-- @format -->

# Express-TS : API RESTful

API RESTful permettant de gérer une liste de produits en étant préalablement connecté.

### Technologies utilisées

L'API a été réalisée avec une application Express écrite en TypeScript connectée à une base de données MySQL.

### Installation du serveur hébergeant l'API

Une fois le code github cloné `git clone https://github.com/fhibois/express-ts.git [nom-du-dossier-de-destination]`, lancer `npm i`, `pnpm i` ou `yarn install` depuis le dossier racine du projet (`cd [nom-du-dossier-de-destination]`) afin d'installer les dépendances listées dans le fichier package.json. Pour ce qui est de la base de données SQL, le véritable fichier .env possédant les variables nécessaires à sa connection n'est pas disponible ici pour des raisons de sécurité. 

Pour la faire fonctionner, il vous suffit de renommer le fichier `.env.template` en `.env` et de remplir les variables avec les configurations de votre propre base SQL (en ce qui concerne son architecture, vous trouverez un fichier SQL importable `sandbox.sql`, présent à la racine. Un faux compte admin y est déjà créé pour tester les différentes fonctionnalités nécessitant ce rôle. Son identifiant est 'admin' et son mot de passe 'admin'). 
Toujours dans le fichier `.env`, vous pouvez également choisir une Token_key sécurisée pour votre projet.

Une fois ces étapes réalisées, le lancement du server se fera avec la commande `npm run serve`. Si tout s'est bien passé, le message "Listening on port 5000" s'affichera dans votre console.

### (Notes)

Ce projet a été réalisé avec l'IDE WebStorm de JetBrains.
