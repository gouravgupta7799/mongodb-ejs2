const mongo = require('mongodb');

const mongoClint = mongo.MongoClient;
let db;
const connectMongo = (callback) => {
  mongoClint.connect('mongodb+srv://Gourav123:HP*F6a_3kUpSB$-@cluster0.dbhrseh.mongodb.net/?retryWrites=true&w=majority')
    .then(client => {
      console.log('connected');
      callback(client);
      db = client.db();
    })
    .catch(err => console.log(err));
};

exports.getdb = () => {
  if (db) {
    return db;
  }
  throw 'no database found'
}
exports.connectMongo = connectMongo;
