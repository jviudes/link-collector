import Mongo from './Mongo';

export default class MongoLink extends Mongo {
  private _dbName = 'Links';
  private _collectionName = 'All';

  constructor(dbAdress: string) {
    super(dbAdress);
  }

  async createLink(link: any) {
    return this.create(this._dbName, this._collectionName, link);
  }

  async readAllLinks() {
    return this.read(this._dbName, this._collectionName, [
      {
        $match: {}
      },
      { $project: { _id: 0 } }
    ]);
  }

  async readLinkUrl(url: string) {
    return this.read(this._dbName, this._collectionName, [
      {
        $match: { url: url }
      },
      { $project: { url: 1, _id: 0 } }
    ]);
  }

  async readLink(url: string) {
    return this.read(this._dbName, this._collectionName, [
      {
        $match: { url: url }
      },
      { $project: { _id: 0 } }
    ]);
  }

  async deleteLink(url: string) {
    return this.delete(this._dbName, this._collectionName, { url: url });
  }
}
