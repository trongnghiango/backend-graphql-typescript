import { CrudService } from "../../../base/crudService";
import { NewsModel } from "./news.model";
class NewsService extends CrudService<typeof NewsModel> {
  constructor() {
    super(NewsModel);
  }
}

const newsService = new NewsService();

export { newsService };
