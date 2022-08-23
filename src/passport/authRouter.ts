import express from "express";
import session from "express-session";
import passport from "passport";
// import { CustomerHelper } from "../graphql/modules/customer/customer.helper";
// import { CustomerModel, CustomerStatus } from "../graphql/modules/customer/customer.model";
import "./passport";

export default ({ app }: { app: express.Application }) => {
//   const googlePasspost = passport.authenticate("google", {
//     session: false,
//   });

//   const facebookPasspost = passport.authenticate("facebook", {
//     session: false,
//   });

//   const twitterPasspost = passport.authenticate("twitter", {
//     session: false,
//   });
//   const callBackGooglePasspost = passport.authenticate("google");
//   const callBackFacebookPasspost = passport.authenticate("facebook");
//   const callBackTwitterPasspost = passport.authenticate("twitter");

//   app.get("/auth/google", googlePasspost);
//   app.get("/auth/facebook", facebookPasspost);
//   app.get("/auth/twitter", twitterPasspost);

//   app.get("/auth/google/callback", callBackGooglePasspost, callback);
//   app.get("/auth/facebook/callback", callBackFacebookPasspost, callback);
//   app.get("/auth/twitter/callback", callBackTwitterPasspost, callback);
// };

// const callback = async (request: any, response: any, next: any) => {
// //   console.log("request.body", request.user);
//   const url = process.env.PUBLIC_URI;
//   const errUrl = `${url}/error`;
//   try {
//     if (!request?.user) {
//       response.status(500).redirect(errUrl);
//     }

//     const customer = await CustomerModel.findById(request.user?.id);
//     if (!customer) {
//       return response.status(500).redirect(errUrl);
//     }
//     if (customer.status === CustomerStatus.DEACTIVE) {
//       return response.status(500).redirect(errUrl);
//     }

//     const token = new CustomerHelper(customer).generateAccessToken();
//     const tokenUrl = `${url}/token?code=${token}`;
//     // console.log("tokenUrl", tokenUrl);
//     return response.status(200).redirect(tokenUrl);
//   } catch (error) {
//     return response.status(500).redirect(errUrl);
//   }
};
