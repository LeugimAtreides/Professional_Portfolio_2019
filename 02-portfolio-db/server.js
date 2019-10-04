import mongoose from "mongoose";
import { dbParams as config } from "./config";
import Logger from ".Logger";

require("./models/projects");
require("./models/documents");

class DbConn {
  constructor() {
    this.connecting = false;
    this.timer = 0;
    this.reconnect = this.reconnect.bind(this);
    this.dbURI = `mongodb://${config.host}:${config.port}/${config.database}`;
    mongoose.connection.on("connected", this.connected.bind(this));
    mongoose.connection.on("disconnected", this.disconnected.bind(this));
    mongoose.connection.on("error", this.error.bind(this));
  }

  async initModels() {
    try {
      Logger.info(this.dbURI);
      await mongoose.connect(this.dbURI);
      return Promise.resolve(0);
    } catch (err) {
      Logger.info("Cannot connect to database");
      Logger.info(err.toString());
      return Promise.resolve();
    }
  }

  async reconnect() {
    this.timer += 1;
    if (this.timer === 5) {
      Logger.info("CRITICAL FAILURE, CANNOT CONNECT TO DB");
      this.connecting = false;
      return Promise.resolve();
    }
  }

  connected() {
    Logger.info("Connected to DB");
    this.timer = 0;
  }

  disconnected() {
    Logger.info("disconnected from DB, retrying connection");
    if (!this.connecting) {
      this.connecting = true;
      this.reconnect();
    }
  }

  error(err) {
    Logger.info(`Error occurred ${err}, retrying connection`);
    if (!this.connecting) {
      this.connecting = true;
      this.reconnect();
    }
  }
}

export default dbConn;
