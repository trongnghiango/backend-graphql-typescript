import _ from "lodash";
import passport from "passport";
import * as PassportGoogleOauth20 from "passport-google-oauth20";
import * as PassportFacebook from "passport-facebook";
import * as PassportTwitter from "passport-twitter";
// import {
//   Customer,
//   CustomerModel,
//   CustomerRole,
//   CustomerStatus,
//   Provider,
// } from "../graphql/modules/customer/customer.model";
import { throws } from "assert";
import { ErrorHelper } from "../helpers";
import { UserModel, UserRole } from "../graphql/modules/user/user.model";
// import { CustomerHelper } from "../graphql/modules/customer/customer.helper";

const GoogleStrategy = PassportGoogleOauth20.Strategy;
const FacebookStrategy = PassportFacebook.Strategy;
const TwitterStrategy = PassportTwitter.Strategy;

// passport.serializeUser((user, done) => {
//   // console.log("serializeUser", user);
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   // console.log("deserializeUser", user);
//   // User.findById(id).then(user => {
//   //   done(null, user);
//   // });
//   done(null, user);
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_APP_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_APP_CLIENT_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//       proxy: true,
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => checkProfile(Provider.GOOGLE, profile, done)
//   )
// );

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       passReqToCallback: true,
//       profileFields: ["id", "emails", "name"],
//     },
//     async (req, token, res, profile, done) => checkProfile(Provider.FACEBOOK, profile, done)
//   )
// );

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: process.env.TWITTER_CONSUMER_KEY,
//       consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//       callbackURL: process.env.TWITTER_CALLBACK_URL,
//     },
//     async (token, tokenSecret, profile, done) => checkProfile(Provider.TWITTER, profile, done)
//   )
// );

// const checkProfile = async (provider: Provider, profile, done) => {
//   const info = getProviderInfo(provider, profile);

//   if (!info) {
//     throw ErrorHelper.unauthorized();
//   }

//   const { providerId, email } = info;
//   const user = await UserModel.findOne({ role: UserRole.ADMIN });

//   if (email && providerId) {
//     let customerByMail = await CustomerModel.findOne({ email });
//     // kiem tra profile.id
//     if (customerByMail) {
//       // neu co => done null
//       customerByMail.providerId = providerId;
//       customerByMail.provider = provider;
//     } else {
//       const code = await CustomerHelper.generateCode();
//       const referralCode = email.split("@")[0];
//       const params: Customer = {
//         code,
//         email,
//         role: CustomerRole.CUSTOMER,
//         status: CustomerStatus.ACTIVE,
//         referralCode,
//         providerId,
//         provider,
//         userId: user.id,
//       };
//       customerByMail = new CustomerModel(params);
//     }
//     await customerByMail.save();
//     return done(null, { id: customerByMail.id });
//   }

//   let customer = await CustomerModel.findOne({ providerId, provider });
//   if (customer) {
//     return done(null, { id: customer.id });
//   } else {
//     const code = await CustomerHelper.generateCode();
//     const params: Customer = {
//       code,
//       role: CustomerRole.CUSTOMER,
//       referralCode: await CustomerHelper.generateReferalCode(code),
//       providerId,
//       provider,
//       userId: user.id,
//     };
//     customer = new CustomerModel(params);
//     await customer.save();

//     return done(null, { id: customer.id });
//   }
// };

// const getProviderInfo = (
//   provider: Provider,
//   profile
// ): {
//   providerId?: string;
//   email?: string;
// } => {
//   switch (provider) {
//     case Provider.FACEBOOK:
//       return {
//         providerId: profile.id,
//       };
//     case Provider.TWITTER:
//       return {
//         providerId: profile.id,
//       };
//     case Provider.GOOGLE: // google
//       return {
//         providerId: profile.id,
//         email: profile.emails[0].value,
//       };
//     default:
//       return null;
//   }
// };
