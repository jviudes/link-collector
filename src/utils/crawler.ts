import * as cheerio from 'cheerio';
import { isUrlValid, isSubPath } from './validator';
import { spawnSync } from 'child_process';

function covertURL(url: string): string {
  //if no protocol is set to url assing http
  if (isUrlValid(url)) {
    try {
      const normalizedUrl = new URL(url);
      return normalizedUrl.href;
    } catch {
      return 'http://' + url;
    }
  }
  return url;
}

async function crawl(url: string) {
  url = covertURL(url);
  const { stdout } = spawnSync('curl', [url]);
  const response = stdout.toString();
  const urlSet = new Set();
  if (response.length) {
    const html = response;
    const $ = cheerio.load(html);
    const links = $('a');
    for (let i = 0; i < links.length; i++) {
      const link = links[i].attribs.href;
      if (isUrlValid(link)) {
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
