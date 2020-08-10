export default class MongoLink {
  constructor(dbAdress: string) {}

  async createLink(link: any) {}
  async readAllLinks() {}
  async readLinkUrl(url: string) {
    return [{ url: 'https://www.test.com.br' }];
  }
  async readLink(url: string) {}
  async deleteLink(url: string) {}
}
