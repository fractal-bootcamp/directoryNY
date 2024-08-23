import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import userRouter from "./lib/controllers/users/controller";
import auth, { requireAuth, userMiddleware } from "./middleware/auth";
import spaceListingsRouter from "./lib/controllers/space-listings/controller";
import userListingsRouter from "./lib/controllers/user-listings/controller";
import referralRoutes from "./lib/controllers/referrals/controller";

const app = express();
app.use(
	cors({
		allowedHeaders: ["Authorization", "Content-Type"],
	})
);

app.use(express.json());

// screen name is in the token response under reloadUserInfo.screenName	

app.use(requireAuth);
app.use(userMiddleware);

app.use("/api", userRouter);

app.use('/api/space-listings', spaceListingsRouter);
app.use('/api/user-listings', userListingsRouter);
app.use('/api/referral', referralRoutes);

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