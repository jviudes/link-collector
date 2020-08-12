import * as express from 'express';
import { crawl } from '../utils/crawler';
import { isUrlValid } from '../utils/validator';
import { dbLinks } from '../config';

function handleCollector(): express.Router {
  const router = express.Router();
  router.get('/', handleGet());
  router.delete('/', handleDelete());
  return router;
}

function handleGet(): express.RequestHandler {
  return async (req: express.Request, res: express.Response) => {
    try {
      if (req.query.url) {
        if (!isUrlValid(<string>req.query.url)) throw new Error('invalid url');

        const linkHeader = await dbLinks.readLinkUrl(<string>req.query.url);
        if (linkHeader.length === 0) {
          //if there is no link record on the database crawl that link
          const urls = await crawl(<string>req.query.url);
          const document = {
            url: req.query.url,
            links: [...urls.keys()]
          };
          await dbLinks.createLink({ ...document });
          res.status(200).send(document);
          crawlBackground(document.links);
        } else {
          //else return link record
          const link = await dbLinks.readLink(<string>req.query.url);
          res.status(200).send(link);
        }
      } else {
        //if no url is specified return all records
        const links = await dbLinks.readAllLinks();
        res.status(200).send(links);
      }
    } catch (error) {
      return handleError(error, res);
    }
  };
}

function handleDelete(): express.RequestHandler {
  return async (req: express.Request, res: express.Response) => {
    try {
      if (req.query.url) {
        await dbLinks.deleteLink(<string>req.query.url);
        return res.status(204).send();
      } else {
        throw new Error('url must be specified');
      }
    } catch (error) {
      return handleError(error, res);
    }
  };
}

function handleError(err: any, res: any) {
  if (err instanceof TypeError) return res.status(400).send('internal error');
  return res.status(400).send(err.message);
}

async function crawlBackground(links: Array<any>) {
  for (const link of links) {
    const url = await dbLinks.readLinkUrl(link);
    if (url.length === 0) {
      const urls = await crawl(link);
      const document = {
        url: link,
        links: [...urls.keys()]
      };
      await dbLinks.createLink(document);
    }
  }
}

export { handleCollector, crawlBackground };
