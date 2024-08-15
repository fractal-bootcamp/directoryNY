import { UserService } from "./lib/services/Users/service";
import SpaceListingService from "./lib/services/Space-Listing/service";
import UserListingService from "./lib/services/User-Listing/service";

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const usertest = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: "Bob",
  clerkId: makeid(5),
  twitterDisplay: "test display",
  twitterHandle: "testhandle",
  twitterPhoto:
    "https://images.pexels.com/photos/3139497/pexels-photo-3139497.jpeg?cs=srgb&dl=pexels-achraf210-3139497.jpg&fm=jpg",
};

async function logStuff() {
  //   const result = await UserService().create(usertest);
  const result2 = await UserService().getById("MCfqxS9aWPcFeGS3CtOZh4F0diY2");
  console.log("result2");

  // const spaceinput = {
  //     user_id: result.data.id;
  //     name: "Nice Apartment";
  //     description: "It is really nice. it is really nice. it is really nice";
  //     location: string;
  //     housemates: string;
  //     priceRange: string;
  //     website?: string;
  //     image?: string;
  //     phone?: string;
  //     email?: string;
  // }
  const user_listing = {
    // id: string;
    user_id: result.data.id,
    phone: "00000",
    email: "test@test.com",
    description:
      "A description. A description. A description. A description. A description",
    moveInTime: "ASAP",
    leaselength: "1-year lease",
    housematesCount: "3-5 roomies",
    website: "google.com",
  };

  const post = await UserListingService().create(user_listing);
  console.log("result", result, "post", post);
}
logStuff();
