export default class MongoLink {
  constructor(dbAdress: string) {}

  async createLink(link: any) {}
  async readAllLinks() {}
  async readLinkUrl(url: string) {
    if (url === 'https://www.test2.com.br') throw TypeError("Cannot read property 'db' of undefined");
    if (url === 'https://www.test1.com.br') return [];
    return [{ url: 'https://www.test.com.br' }];
  }
  async readLink(url: string) {}
  async deleteLink(url: string) {}
}
