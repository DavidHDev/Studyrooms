# Proof of Concept - StudyRooms Web App
![Logo](/client-app/public/assets/SRBlack.png)

## General Information
Avand ca scop atingerea unei anume complexitati in varianta finala a aplicatiei, am decis ca si "best practices", ca aceasta sa fie multi-layered si impartita in 5 sub-proiecte + aplicatia Client-Side. Asta ne asigura un "separation of concerns" mai clar, deci schimbarea unuia dintre straturi nu ar trebui sa cauzeze un impact arhitectural semnificativ in celelalte straturi.

Asadar, avem 6 componente principale care alcatuiesc aplicatia: API, Application, Domain, Persistence, Client-App.

## Technologies
![Logo](/client-app/public/assets/techstack.png)
Prima versiune

-> Baza proiectului este construita cu ASP.NET Core, Entity Framework Core ca si Object Relational Mapper si SQLite pentru baza de date(SQL Server pentru versiunea publicată pe Azure). Aplicatia se foloseste de MVC pentru definirea si crearea de controllere.

-> Pentru Front-End(Client Side) am folosit React.js impreuna cu Typescript iar ca si CSS framework am ales Semantic UI React, componentele fiind customizate conform designului pe care l-am creat. 

## Running The Application
Am folosit Visual Studio Code ca si development environment pentru a avea acces facil la un terminal GIT Bash si NPM avand in vedere ca aplicatia foloseste React.

Pentru a rula aplicatia. Trebuie prima data sa **rulam API-ul** care va porni serverul pe portul `localhost:5000`.

Apoi, intram in folderul **client-app** si pornim serverul de development al aplicatiei React pe portul `localhost:3000`.

**Exista doua optiuni pentru a putea face asta**

1. Putem deschide doua ferestre Command Prompt(cmd) si sa rulam ambele componentele prin CLI.

*Pentru API*
-> `dotnet restore` (la nivelul solutiei)

-> `cd Studyrooms/API/`

-> `dotnet watch run`

*Pentru Aplicatia Client*

-> `cd Studyrooms/client-app/`

-> `npm install`

-> `npm start`

2. Folosind Visual Studio 2019

*Pentru API*

Rulam API-ul din interfata grafica. 

![Tutorial](/client-app/public/assets/apitut.png)

*Pentru Aplicatia Client*

Rulam comenzile `cd Studyrooms/client-app/` si apoi `npm install` si `npm start` in CMD pentru a porni serverul de development.
