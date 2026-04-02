import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/mongodb.js";

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error connected Mongo:", err.message);
  }
};

startServer();
