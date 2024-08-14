import React from "react";
import ReactDOM from "react-dom/client";


import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import PeopleListingSection from "./components/pages/PeopleListingSection.tsx";
import { SpaceListingPage } from "./components/pages/SpaceListingPage.tsx";
import MainLayout from "./components/layouts/MainLayout.tsx";
import { Login } from "./components/pages/Login.tsx";
import MapView from "./components/pages/MapView.tsx";

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
      {
        path: "map",
        element: <MapView />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }

])



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);