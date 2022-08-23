export enum MenuCategories {
  LOTTERY = "LOTTERY",
  MEMBER = "MEMBER",
  SYSTEM = "SYSTEM",
  COMMON = "COMMOM",
  SERVER = "SERVER",
}

export enum DefaultMenuLinks {
  DASHBOARD = "/dashboard",
  PROFILE = "/profile",
}

export enum DefaultMenuCode {
  DASHBOARD = "dashboard",
  PROFILE = "profile",
}

export const menuCategoriesData = [
  { code: MenuCategories.COMMON, name: "Common" },
  { code: MenuCategories.SYSTEM, name: "System" },
  { code: MenuCategories.LOTTERY, name: "Lottery" },
  { code: MenuCategories.MEMBER, name: "Member" },
  { code: MenuCategories.SERVER, name: "Member" },
];

export type MenuData = {
  code?: string;
  name?: string;
  title?: string;
  description?: string;
  header?: string;
  url?: string;
  image?: string;
  Icon?: any;
  icon?: string;
  frame?: string;
  keywords?: string;
  catergoryCode?: MenuCategories;
  active?: boolean;
};

export const adminMenusData: MenuData[] = [
  {
      code: "user",
      title: "User",
      header: "User",
      url: "/user",
      icon: "FcBusinessman",
      catergoryCode: MenuCategories.SYSTEM,
  },
  {
      code: "setting",
      title: "Setting",
      header: "Setting",
      url: "/setting/COMMON",
      icon: "FcServices",
      catergoryCode: MenuCategories.SYSTEM,
  },
  {
      code: "job",
      title: "Jobs",
      header: "Jobs",
      url: "/job",
      icon: "FcWorkflow",
      catergoryCode: MenuCategories.SYSTEM,
  },
];