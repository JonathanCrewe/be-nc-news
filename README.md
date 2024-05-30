# Northcoders News API


---

Hosted version: https://be-nc-news-wz3p.onrender.com/api/


This is a REST API which provides access to articles and comments from a news database. A full list of endpoints can be found in the "endopints.json" file. 

---

## Setting Up
1. Install Node and Postgres if not already on your machine.

2. Clone the repository from https://github.com/JonathanCrewe/be-nc-news. 

3. Install project dependencies using 'npm install'.

4. Add ".env.test" and ".env.development" files. Each should set PGDATABASE to the appropriate database. 

5. Add an ".env.production" file which should set the DATABASE_URL for remote hosting.

6. Run 'npm run setup-dbs' to create the test and development databases. 

7. Run 'npm run seed' to populate the databases. 

8. Tests can be run using 'npm test' (for all tests) or 'npm test filename' for specific test files. 

---

Versions:  
Node.js v21.7.2 
Postgres v14.11. 

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
