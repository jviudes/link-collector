// eslint-disable-next-line no-unused-vars
import { MongoClient, FilterQuery, UpdateQuery, UpdateOneOptions } from 'mongodb';

export default class Mongo {
  protected _connection: MongoClient;
  protected dbAdress: string;
  constructor(dbAdress: string) {
    this.dbAdress = dbAdress;
  }

  private async connect() {
    try {
      this._connection = await MongoClient.connect(`mongodb://${this.dbAdress}`, { useUnifiedTopology: true });
      console.log('[DB] Connected');
    } catch (error) {
      console.log('[DB] Error', error);
    }
  }

  async create(dbName: string, collectionName: string, docs: any) {
    if (!this._connection) await this.connect();
    return this._connection.db(dbName).collection(collectionName).insertOne(docs);
  }

  async read(dbName: string, collectionName: string, pipeline?: object[]) {
    if (!this._connection) await this.connect();
    return this._connection.db(dbName).collection(collectionName).aggregate(pipeline).toArray();
  }

  async update(
    dbName: string,
    collectionName: string,
    filter: FilterQuery<any>,
    update: UpdateQuery<any> | Partial<any>,
    options?: UpdateOneOptions
  ) {
    if (!this._connection) await this.connect();
    return this._connection.db(dbName).collection(collectionName).updateOne(filter, update, options);
  }

  async delete(dbName: string, collectionName: string, filter: FilterQuery<any>) {
    if (!this._connection) await this.connect();
    return this._connection.db(dbName).collection(collectionName).deleteOne(filter);
  }
}
