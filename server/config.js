require("dotenv").config();

module.exports = {
  db: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.jqdgw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
