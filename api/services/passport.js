const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken"); // to generate signed token


const { JWT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

const maxAge = 3 * 24 * 60 * 60;
const create_token = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: maxAge });
};

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {

        //get the user data from google
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          email: profile.emails[0].value,
          token: create_token(profile.id),
          googleAccessToken: accessToken,
          googleRefreshToken: refreshToken,
        };

        done(null, newUser);

      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.googleId);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    done(err, id);
  });
};
