import React, { useState } from "react";
// import { CreateSpaceListingArea } from "../compound/CreateSpaceListingArea";
import SpaceListingSection from "./SpaceListingsSection";
import LocationOnOutlinedIcon from "@mui/icons-material/OpenInNew";
import OpenInNew from "@mui/icons-material/OpenInNew";

export const SpaceListingPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNewListing = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <>
      <SpaceListingSection key={refreshTrigger} />
    </>
  );
};
