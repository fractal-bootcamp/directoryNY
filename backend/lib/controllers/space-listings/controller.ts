import express from "express";
import { SpaceListingService } from "../../services/SpaceListing/service";

const router = express.Router();

router.get('/all', async (req, res) => {
    const spaceListings = await SpaceListingService().getAllSpaceListings();
    if (spaceListings) {
        res.status(200).json(spaceListings);
    }
    else {
        res.status(404).json({ error: 'No space listings found' });
    }
});

router.get("/:spaceListingId", async (req, res) => {
    const spaceListing = await SpaceListingService().getSpaceListingById(req.params.spaceListingId);
    if (spaceListing) {
        res.status(200).json(spaceListing);
    } else {
        res.status(404).json({ error: "No space listing found" });
    }
});

router.post("/create", async (req, res) => {
    const newSpaceListing = req.body;
    const spaceListing = await SpaceListingService().createSpaceListing(newSpaceListing);
    if (spaceListing) {
        res.status(201).json(spaceListing);
    } else {
        res.status(404).json({ error: "No space listing created" });
    }
});

router.put("/:spaceListingId", async (req, res) => {
    const updatedSpaceListing = req.body;
    const spaceListing = await SpaceListingService().updateSpaceListing(updatedSpaceListing);
    if (spaceListing) {
        res.status(200).json(spaceListing);
    } else {
        res.status(404).json({ error: "No space listing updated" });
    }
});

router.delete("/:spaceListingId", async (req, res) => {
    const spaceListingId = req.params.spaceListingId;
    const spaceListing = await SpaceListingService().deleteSpaceListing(spaceListingId);
    if (spaceListing) {
        res.status(200).json(spaceListing);
    } else {
        res.status(404).json({ error: "No space listing deleted" });
    }
});


export default router;