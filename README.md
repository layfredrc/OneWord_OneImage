# Project OneWordOneImage (OWOI) | Equipe 7

Badr TADJER | Frédéric LAY | Pierre-Louis SERGENT | Leo TRAN | Meo BIENFAIT | Younes BOUCHAKOUR

## Introduction

OneWordOneimage est un outil qui permet aux utilisateurs de créer des clips à base d'images synchronisées aux lyrics d'une musique.

Follow this link to see the source code : [Github](https://github.com/layfredrc/OneWord_OneImage/)

## Execution

### requirements

- Poetry
- Python ^3.10
- PostgreSQL
- Web Browser

### setup

1. Configure and launch the **``poetry``** environment

    Documentation : [Poetry](https://python-poetry.org/docs/)

    ```sh
    # Launch poetry
    $ poetry shell

    # First installation
    # Check the Python version
    $ poetry env info

    # First installation
    # Change the Python version (if less than 3.10^)
    $ poetry enve use < path_python_^3.10 >

    # Install the libraries of the environment
    $ poetry install
    ```

2. Install and build **``npm``** libraries

    ```sh
    # Install the npm libraries
    # path : app/frontend
    $ npm install

    # Build the frontend
    $ npm run build
    ```

3. Install and launch PostgreSQL

    Documentation : [PostgreSQL](https://www.postgresql.org/download/)

    ```yml
    # Whith these parameters
    USER: 'root'
    PASSWORD: 'password'
    ```

    ```sql
    -- Create Database 
    CREATE DATABASE owoidb;
    ```

4. ORM : Importation of the models on the Database (*``At the first launch only``*)

    ```sh
    # Create a version of the migration
    $ python manage.py migrate 

    # Apply the migration on the Database
    $ python manage.py makemigrations 
    ```

5. Launch the Django server

    ```sh
    # Create a superuser on the Database
    $ python manage.py createsuperuser
        > Username: admin
        > Email address: admin@example.com

    # Launch the Django server
    $ python manage.py runserver
    ```