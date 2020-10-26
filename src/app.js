import express from 'express';
import bodyParser from 'body-parser';
import UserRoutes from './routes/user';
import RoleRoutes from './routes/role';
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


//routes
app.use('/api/user', UserRoutes);
app.use('/api/role', RoleRoutes);

export default app;