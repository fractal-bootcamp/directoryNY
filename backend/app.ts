import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import userRouter from "./lib/controllers/users/controller";
import auth from "./middleware/auth";
import spaceListingsRouter from "./lib/controllers/space-listings/controller";
import userListingsRouter from "./lib/controllers/user-listings/controller";

const app = express();
app.use(
  cors({
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);

app.use(express.json());
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const details = await auth.verifyIdToken(token);
  const userdetails = await auth.getUser(details.uid);
  //   todo: add userdetails to req
  console.log("userdetails: ", userdetails);

  req["user"] = details;
  next();
};

app.use(requireAuth);

app.use("/api", userRouter);

app.use('/api/space-listings', spaceListingsRouter);
app.use('/api/user-listings', userListingsRouter);


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/test", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
