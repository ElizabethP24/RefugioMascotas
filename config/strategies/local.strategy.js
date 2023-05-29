import passport from "passport"
import { Strategy } from 'passport-local';
import sql from '../database.js';

export function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
        console.log(username, password);
       const verifiedUser = await sql`
        select *
        from usuarios
        where username = ${username} and password = ${password}`;
      if (verifiedUser) {
        done(null, verifiedUser[0]);
    } else {
        done(null, false);

    }
}))
}




