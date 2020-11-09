import express from 'express';
import bodyParser from 'body-parser';
import UserRoutes from './routes/user';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {User,AuthorizedUser} from './models/model';
import jwt from 'jsonwebtoken';


const app = express();


//middlewares
app.all('*', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
    next(); 
});
app.use(bodyParser.json({limit: '100mb'})); 
app.use(bodyParser.urlencoded({limit: '50mb','extended': 'true'})); 
app.use(bodyParser.json({type: 'application/vnd.api+json'})); 
app.use(passport.initialize());
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//how token extracted from the request
opts.secretOrKey = 'secret';//use for signature

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    
    let flag = Date.now()+10 >= jwt_payload.exp* 1000
    
    User.findAll({ where: { id: jwt_payload.id } })
      .then(user => {
        const x= AuthorizedUser.findOne({ where: { userId : user[0].dataValues.id } })
          .then(x => {
            if(x instanceof AuthorizedUser){
               return done(null, user);
            }
            else{
              return done(null, false);
            }
          })
          .catch(err => console.log(err));
      })
    
  })
);

//routes
app.use('/api/user', UserRoutes);


export default app;