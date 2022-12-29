
# OneWord_OneImage

Projet Transverse Equipe 7

# Setup

1. Installer Poetry  :
``https://python-poetry.org/docs/``

2. Installer les packages avec poetry (dossier racine) :

    ```bash
        poetry install
    ```

3. Installer les packages npm dans le dossier app/frontend :

    ```bash
        npm i
    ```

4. Lancer un build du frontend pour que le backend puisse récupérer les vues :

    ```bash
        npm run build
    ```

# Commandes utiles

- Activer l'environnement virtuel poetry :

    ```bash
        poetry shell 
    ```

- Lancer le projet django :
 Se mettre dans le dossier src :

    ```bash
        poetry run python manage.py runserver   
    ```

- Lancer le projet react :
 Se mettre dans le dossier frontend :

    ```bash
        npm start
    ```

- Lancer la migration de la base de données :
 Se mettre dans le dossier app :

    ```bash
        poetry run python manage.py migrate 
    ```

- Créer une migration quand il y a des changements sur le fichier models.py :
 Se mettre dans le dossier app :

    ```bash
        poetry run python manage.py makemigrations 
    ```
