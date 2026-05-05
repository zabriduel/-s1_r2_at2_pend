import express from "express";
import { EnvVar } from "./config/envVar";
import router from "./routes/routes";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5500",
  }),
);
app.use(express.json());
app.use("/", router);
app.use("/images", express.static("uploads/images"));

app.listen(EnvVar.SERVER_PORT, () => {
  console.log(`Servidor rodando em http://localhost:${EnvVar.SERVER_PORT}`);
});
