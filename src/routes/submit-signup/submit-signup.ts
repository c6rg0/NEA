import { default as express } from "express";

export = (() => {

  let router = express.Router();

  // mount express paths, any addition middleware can be added as well.
  // ex. router.use('/pathway', middleware_function, sub-router);

  return router;
})(); //<--- this is where I don't understand something....

