import Mongo from '../dbs/Mongo';

const dbAdress = process.env.MONGO_ADDRESS_LINKS || '';
const dbLinks = new Mongo(dbAdress);

export { dbLinks };
