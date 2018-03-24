# skillsource
The goal of this application is to allow users to create courses containing steps necessary to create a skill.  Users have access to joining courses and following the steps set out by the creator in order to learn the skill.

# Tech Stack
###### Frontend Framework: React.js
###### Middleware for handling routing: Express.js
###### Backend server: Node.js
###### Database: MySQL
###### Database ORM: Sequelize

# Features implemented
###### Live-search on browse page
###### Users can now reply to comments
###### Each step has an estimated time to complete
###### Browse version of components show estimated time to complete the entire course
###### When creating steps, users can choose to upload images
###### Image uploads now handled by cloudinary
###### Implements microservice to capture screenshots and save to cloudinary
###### Adds css grid styling to browse page with previews of the steps
###### Adds a setting page for users to edit their email, password, and email preference settings
###### Server side, implements automatic daily emails when new users enroll in someone's created courses
###### Server side, implements automatic check if a user's courses are halfway through estimated time and emails a reminder
###### Users can edit their created courses

# Setup Dev Environment
```
npm install
npm start
```

# Database Setup
In one tab, ensure mysql is running by entering:
```
mysql.server start
```

If you are interested in accessing your database, enter:
```
mysql -u root -p
```

No password is required.  Double hit enter key to enter mysql

# NPM

`npm start` runs `webpack --watch` and `nodemon server/index.js` concurrently

You can visit the site at `localhost:3000`

