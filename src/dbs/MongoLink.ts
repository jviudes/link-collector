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

  async getAll() {
    return this.read(this._dbName, this._collectionName, {});
  }
}
