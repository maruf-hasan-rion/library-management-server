import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function server() {
  try {
    if (!config.database_url) {
      throw new Error("DATABASE_URL is missing");
    }

    await mongoose.connect(config.database_url);
    console.log("Database connected");

    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  } catch (error) {
    console.error("Server error:", error);
    process.exit(1);
  }
}

server();
