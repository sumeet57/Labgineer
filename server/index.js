import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";

const port = env.port || 3000;

connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
