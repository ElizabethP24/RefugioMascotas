import { Strategy } from 'passport-local';


export function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, async (username, password, done) => {
       const verifiedUser = await sql`
        select *
        from personas 
        where username = ${username.username} and password = ${username.password}`;
    
    if (verifiedUser) {

        done, (null, verifiedUser[0]);
    } else {
        done(null, false);

    }
}))
}




