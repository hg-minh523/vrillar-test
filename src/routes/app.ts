import { Application } from 'express';
import { search } from '../controllers/search.controllers';
export const routes = (app : Application) => {
    app.get('/search/:year/:type/:detail',search.searchMutiple);
    app.get('/search/:year/:type',search.search);

}