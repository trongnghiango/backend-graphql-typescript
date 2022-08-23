import { Request, Response } from "express";
import { ErrorHelper } from "../../helpers";
export default [
  {
    method: "get",
    path: "/meta/details/:id",
    midd: [],
    action: async (req: Request, res: Response) => {
      const { id } = req.params;
      

      res.sendStatus(404);
    },
  },
];
