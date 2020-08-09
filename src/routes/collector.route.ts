import * as express from 'express';
import { crawCurl } from '../utils/parser';
// import { dbLinks } from '../config';

function handleCollector(): express.Router {
  const router = express.Router();

  router.get('/', handleGet());

  return router;
}

function handleGet(): express.RequestHandler {
  return async (req: express.Request, res: express.Response) => {
    try {
      //scrapper
      if (!req.query.url) {
        throw new Error('url query must me specified');
      }
      const urls = await crawCurl(<string>req.query.url);
      // for (const url of urls) {
      //   console.log(url);
      //   const test = await crall(<string>url);
      //   console.log(test);
      // }
      return res.status(200).send(urls);
    } catch (error) {
      return handleError(error, res);
    }
  };
}

function handleError(err: any, res: any) {
  if (err.code === 'ENOTFOUND') return res.status(400).send('not a valid url');
}

export default handleCollector;
