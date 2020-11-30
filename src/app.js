import passport from 'passport';
import bodyParser from 'body-parser';
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
app.use(express.static('public'));
app.use(passport.initialize());
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

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
          .catch(err => console.log(err)); S
      })
  })
);


app.use(UserRoutes);
app.use(CourseRoutes);
app.use(PreCourseRoutes);
app.use(SemesterRoutes);
app.use(GradeRoutes);
app.use(UserCourseRoutes);

const portt = process.env.PORT || 3000;
var server = app.listen(portt, function () {
  console.log(`server running in ${portt}`);
});

export default server;
