## Basic login system node application

### Feature-less app

- No multi-language
- No logging to files
- Minimum quality error handling
- No private services
- No environment configuration
- No best practices

## INSTRUCTIONS

- open mongo shell and type the next command <code>use login_system</code>
- after creating the database you need to do this <code>db.users.createIndex({email:1}, {unique:true})</code>
- clone project, and open the project directory in terminal
- run <code>npm install</code> to install all packages
- run <code>npm start</code> to start the project
