const passport=require("passport")

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID="253269159305-5eancqjtdhrgmsokrgjave48se3gj8l6.apps.googleusercontent.com"
const  GOOGLE_CLIENT_SECRET="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"


passport.use(new GoogleStrategy({
    clientID:  GOOGLE_CLIENT_ID  , 
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/oauthcallback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser(function(user,done){
    done(null,user);
});
passport.deserializeUser(function(user,done){
    done(null,user);
});

module.exports=passport