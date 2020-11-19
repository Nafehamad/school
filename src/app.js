import passport from 'passport';
import bodyParser from 'body-parser';
import socket from 'socket.io';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import express from 'express';
import { User, AuthorizedUser } from './entity/relation';
import UserRoutes from './entity/user/user.route';
import CourseRoutes from './entity/course/course.route';
import PreCourseRoutes from './entity/precourse/precourse.route';
import SemesterRoutes from './entity/semester/semester.route';
import GradeRoutes from './entity/grade/grade.rout';
import UserCourseRoutes from './entity/usercourse/usercourse.route';

const app = express();


//middlewares
app.all('*', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
  next();
});
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', 'extended': 'true' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(passport.initialize());
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//how token extracted from the request
opts.secretOrKey = 'secret';//use for signature

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {

    User.findAll({ where: { id: jwt_payload.id } })
      .then(user => {
        const x = AuthorizedUser.findOne({ where: { userId: user[0].dataValues.id } })
          .then(x => {
            if (x instanceof AuthorizedUser) {
              return done(null, user);
            }
            else {
              return done(null, false);
            }
          })
          .catch(err => console.log(err));
      })

  })
);

//routes
app.use(UserRoutes);
app.use(CourseRoutes);
app.use(PreCourseRoutes);
app.use(SemesterRoutes);
app.use(GradeRoutes);
app.use(UserCourseRoutes);



var server = app.listen(process.env.PORT, function () {
  console.log('server run on 8085');
});

app.use(express.static('public'));
var io = socket(server);


io.on('connection', function (socket) {
  console.log('made socket connected');

  socket.on('chat', function (data) {
    io.sockets.emit('chat', data);
  });
});


//export default app;