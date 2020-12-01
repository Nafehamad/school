# School Application
Node JS application built using express js, Mysql and Sequelise. Containing the real the real world example(CRUD,Auth). The application is about school where manager,teacher and student interact with each other through courses and grades. 

# How to use
* Each user should have an account with valid email.
* Each user should verify her account through his valid email.
* Each user has specific role to determine his work.
* User with student role can signup courses,update his profile and show his grade.
* Grade assign only by user who has teacher role.
* Manager can view all information.

# Quick start 

 ><text style="color:grey">#clone repository</text><br>
$ git clone https://github.com/Nafehamad/school.git <br>

><text style="color:grey">#change directory to cloned app</text><br>
$ cd school

><text style="color:grey">#install mysql to your machine</text><br>

><text style="color:grey">#install the dependencies with npm</text><br>
$ npm install

><text style="color:grey">#start running App</text><br>
$ npm run dev

# requirements
You'll need to run this app:

* node and npm .<br>
* Ensure you're running Node (v12.0.0.0) and NPM (6.9.0) to avoid any unexpected result .

# Dependencies
* [expressjs](https://expressjs.com/) - The server for handling and routing HTTP requests.
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication.
* [passport](https://github.com/jaredhanson/passport) - For handling user authentication.
* [mysql](https://github.com/mysqljs/mysql) - For modeling and mapping mysql data to javascript.
* [socket](https://github.com/socketio/socket.io) - real time asending data.
* [sequelise](https://github.com/sequelize/sequelize) - Sequelize is a promise-based Node.js ORM.
* [babel](https://github.com/babel/babel) - Babel is a tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain   features natively, Babel will help you compile those features down to a supported version.

# Application Structure
 **app.js** - The entry point to our application. This file defines our express server. It also requires the routes we'll be using in the application.<br>
 **config** - This folder contain require configuration.<br>
 **entity** - This include:
  * **model** - This folder contains the schema definitions.<br>
  * **route** - This folder contains the route definitions for our API.<br>
  * **repository** - This folder contains functions that access database.<br>
  * **controller** - This folder contains functions implementation.<br>
