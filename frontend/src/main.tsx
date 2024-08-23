import React from "react";
import ReactDOM from "react-dom/client";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PeopleListingSection from "./components/pages/PeopleListingSection.tsx";
import { SpaceListingPage } from "./components/pages/SpaceListingPage.tsx";
import MainLayout from "./components/layouts/MainLayout.tsx";
import { Login } from "./components/pages/Login.tsx";
import UnprotectedHomepage from "./components/pages/UnprotectedHomepage.tsx";
import UnprotectedLayout from "./components/layouts/UnprotectedLayout.tsx";
import ApplyPage from "./components/pages/ApplyPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <PeopleListingSection />
      },
      {
        path: "spaces",
        element: <SpaceListingPage />
      },
      // {
      //   path: "test",
      //   element: <Test />
      // }
    ]
  },
  {
    path: "/login",
    element: <UnprotectedLayout />,
    children: [
      {
        index: true,
        element: <UnprotectedHomepage />
      },
      {
        path: "apply",
        element: <ApplyPage />
      }

    ]
  },
  // {
  //   path: "/login",
  //   element: <Login />
  // }

])



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);
