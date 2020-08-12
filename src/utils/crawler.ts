import * as cheerio from 'cheerio';
import { isUrlValid, isSubPath } from './validator';
import { spawnSync } from 'child_process';

function convertURL(url: string): string {
  try {
    const normalizedUrl = new URL(url);
    return normalizedUrl.href;
  } catch {
    //if no protocol is set to url assing http
    return 'http://' + url;
  }
}

async function crawl(url: string) {
  const urlSet = new Set();
  if (!isUrlValid(url)) return urlSet;

  url = convertURL(url);
  const { stdout } = spawnSync('curl', [url]);
  const response = stdout.toString();
  if (response.length) {
    const html = response;
    const $ = cheerio.load(html);
    const links = $('a');

    for (let i = 0; i < links.length; i++) {
      //iterate through links
      const link = links[i].attribs.href;
      if (isUrlValid(link)) {
        //if links is valid add it to the set
        const urlLink = new URL(link);
        urlSet.add(urlLink.href);
      } else {
        // chech if it is subPath
        if (isSubPath(link)) {
          const urlWithPath = new URL(link, url);
          urlSet.add(urlWithPath.href);
        }
      }
    }
  }
  return urlSet;
}
export { crawl };
