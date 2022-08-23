import * as admin from "firebase-admin";
import { configs } from "../configs";
import { ErrorHelper } from "./error.helper";
export class FirebaseHelper {
  app: admin.app.App;
  constructor() {
    let config = configs.firebase;
    if (config) {
      config.credential = admin.credential.cert(config.credential);
      if (admin.apps.length == 0) {
        this.app = admin.initializeApp(config);
      }
    }
  }

  get messaging() {
    return this.app.messaging();
  }
  async verifyIdToken(token: string) {
    try {
      return await admin.auth().verifyIdToken(token);
    } catch (err) {
      throw ErrorHelper.badToken();
    }
  }

  getUserByUID = async (uid: string) => {
    try {
      return await admin.auth().getUser(uid);
    } catch (err) {
      throw err
    }
  }

  async createUser(email: string, password: string) {
    console.log('Ci quan ne ban');
    try {
      return await admin.auth().createUser({
        email: email,
        password: password,
      });
    } catch (err) {
      throw err;
    }
  }
  async updateUser(uid: string, data: admin.auth.UpdateRequest) {
    try {
      return await admin.auth().updateUser(uid, data);
    } catch (err) {
      throw err;
    }
  }
  async deleteUser(uid: string) {
    try {
      return await admin.auth().deleteUser(uid);
    } catch (err) {
      throw err;
    }
  }
  async deleteUsers(uids: string[]) {
    try {
      return await admin.auth().deleteUsers(uids);
    } catch (err) {
      throw err;
    }
  }

  async uploadBuffer(buffer: any, filename: string) {
    const bucket = this.app.storage().bucket();
    const file = bucket.file(filename);
    // var buff = Buffer.from(buffer, 'binary').toString('utf-8');
    try {
      const stream = file.createWriteStream({
        metadata: {
          contentType: "application/pdf",
        },
      });
      stream.on("error", (err) => {
        console.log("err", err);
      });
      stream.on("finish", () => {
        console.log(filename);
      });
      stream.end(buffer);
    } catch (error) {
      throw ErrorHelper.externalRequestFailed(error.message);
    }
  }
  async getFile(filename: string) {
    const file = this.app.storage().bucket().file(filename);
    try {
      return await file.download().catch(() => {
        console.log(`File ${filename} không tồn tại.`);
      });
    } catch (error) {
      throw ErrorHelper.externalRequestFailed(error.message);
    }
  }
}

const firebaseHelper = new FirebaseHelper();

export { firebaseHelper };
