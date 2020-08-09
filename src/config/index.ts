import MongoLink from '../dbs/MongoLink';

const dbAdress = process.env.MONGO_ADDRESS_LINKS || '';
const dbLinks = new MongoLink(dbAdress);

export { dbLinks };
