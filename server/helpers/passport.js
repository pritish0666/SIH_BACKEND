import passport from 'passport';
import { UserModel } from '../config/database.js';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'narcodes'; // Replace with your actual secret key

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.id });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));


