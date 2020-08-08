import * as cheerio from 'cheerio';
import { isUrlValid, isSubPath } from './validator';
import axios from 'axios';

async function crall(url: string) {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const links = $('a');
  const urls = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i].attribs.href;
    if (isUrlValid(link)) {
      const urlLink = new URL(link);
      urls.push(urlLink.href);
    } else {
      // chech if it is subPath
      if (isSubPath(link)) {
        const urlWithPath = new URL(link, url);
        urls.push(urlWithPath.href);
      }
    }
  }
  return urls;
}

export default crall;
