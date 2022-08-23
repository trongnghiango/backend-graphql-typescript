import { SettingHelper } from "../graphql/modules/setting/setting.helper";
import expressLoader from "./express";
import { Logger } from "./logger";

import "../scheduler";
import { LogHelper } from "../helpers/log.helper";

export default ({ expressApp }: any) => {
  expressLoader({ app: expressApp });
  LogHelper.getHeading(" --------- Welcome to 🐒🐒🐒 MONKEY-KING.JS 🍌🍌🍌 ---------");
  Logger.info("🐵🐵🐵 Load Source Successfully 🐵🐵🐵");
};
