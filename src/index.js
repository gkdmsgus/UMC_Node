import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleListStoreReviews, handleListMyReviews } from "./controllers/review.controller.js";
import { handleListStoreMissions, handleListMyMissions, handleCompleteMission } from "./controllers/mission.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);
app.get("/api/v1/users/:userId/reviews", handleListMyReviews);
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);
app.get("/api/v1/users/:userId/missions", handleListMyMissions);
app.patch("/api/v1/users/:userId/missions/:missionId/complete", handleCompleteMission);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});