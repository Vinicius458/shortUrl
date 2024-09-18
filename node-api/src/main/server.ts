import { setupApp } from "./config/app";
import dotenv from "dotenv";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;
const app = setupApp();
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
