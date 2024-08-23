import express from "express";
import { UserListingService } from "../../services/UserListing/service";

const router = express.Router();

router.get('/all', async (req, res) => {
    const userListings = await UserListingService().getAllUserListings();
    if (userListings) {
        res.status(200).json(userListings);
    }
});

router.get("/:userListingId", async (req, res) => {
    const userListing = await UserListingService().getUserListingById(
        req.params.userListingId
    );
    if (userListing) {
        res.status(200).json(userListing);
    } else {
        res.status(404).json({ error: "No user listing found" });
    }
});

router.post("/create", async (req, res) => {
    const newUserListing = req.body;
    const userListing = await UserListingService().createUserListing(newUserListing);
    if (userListing) {
        res.status(201).json(userListing);
    } else {
        res.status(404).json({ error: "No user listing created" });
    }
});

router.put("/:userListingId", async (req, res) => {
    const updatedUserListingId = req.params.userListingId;
    const updatedUserListing = req.body;
    const userListing = await UserListingService().updateUserListing(updatedUserListingId, updatedUserListing);
    if (userListing) {
        res.status(200).json(userListing);
    } else {
        res.status(404).json({ error: "No user listing updated" });
    }
});

router.delete("/:userListingId", async (req, res) => {
    const userListingId = req.params.userListingId;
    const userListing = await UserListingService().deleteUserListing(userListingId);
    if (userListing) {
        res.status(200).json(userListing);
    } else {
        res.status(404).json({ error: "No user listing deleted" });
    }
});

export default router;  