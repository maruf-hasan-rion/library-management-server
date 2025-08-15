import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function server() {
  try {
    await mongoose.connect(config.database_url!);

    app.listen(config.port, () => {
      console.log(`Server Running on port ${config.port}`);
    });
  } catch (error) {
    console.error(`Server error ${server}`, error);
  }
}

server();
