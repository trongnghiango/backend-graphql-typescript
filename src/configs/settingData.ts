import { SettingType } from "../graphql/modules/setting/setting.model";
import { adminMenusData, menuCategoriesData } from "../helpers/menu.helper";

export enum SettingGroupSlug {
  COMMON = "COMMON",
  WEBSITE_SETTING = "WEBSITE_SETTING",
  MESSAGE_TEMPLATE = "MESSAGE_TEMPLATE",
  NFT_SETTING = "NFT_SETTING",

}
export enum SettingKey {
  // Cấu hình chung
  TITLE = "TITLE", // Tiêu đề ứng dụng
  WEBSITE_DOMAIN = "WEBSITE_DOMAIN",
  LOGO_URL = "LOGO_URL",
  MAINTENANCE = "MAINTENANCE",

  // cấu hình website
  USE_MENU_CATEGORY = "USE_MENU_CATEGORY",
  ADMIN_MENU = "ADMIN_MENU",
  MENU_CATEGORIES = "MENU_CATEGORIES",

  //Cấu hình NFT
  LISTING_SERVICE_FEE = "LISTING_SERVICE_FEE",
}
export const SETTING_DATA = [
  {
    slug: SettingGroupSlug.COMMON,
    name: "Common setting",
    desc: "Common setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.string,
        name: "Website Title",
        key: SettingKey.TITLE,
        value: `Ather sphere`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Website Domain",
        key: SettingKey.WEBSITE_DOMAIN,
        value: `http://athersphere.fe.izweb.site/`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.string,
        name: "Logo url",
        key: SettingKey.LOGO_URL,
        value: `/images/logo.png`,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.boolean,
        name: "Maintenance",
        key: SettingKey.MAINTENANCE,
        value: false,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.WEBSITE_SETTING,
    name: "Website setting",
    desc: "Website setting here",
    icon: "far fa-tachometer-alt",
    readOnly: false,
    settings: [
      {
        type: SettingType.boolean,
        name: "Use menu category",
        key: SettingKey.USE_MENU_CATEGORY,
        value: true,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Admin Menu",
        key: SettingKey.ADMIN_MENU,
        value: adminMenusData,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
      {
        type: SettingType.object,
        name: "Menu CategoriesData",
        key: SettingKey.MENU_CATEGORIES,
        value: menuCategoriesData,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
  {
    slug: SettingGroupSlug.NFT_SETTING,
    name: "NFT setting",
    desc: "NFT setting here",
    icon: "FcSettings",
    readOnly: true,
    settings: [
      {
        type: SettingType.number,
        name: "Listing service fee",
        key: SettingKey.LISTING_SERVICE_FEE,
        value: 5,
        isActive: true,
        isPrivate: false,
        readOnly: false,
      },
    ],
  },
];
