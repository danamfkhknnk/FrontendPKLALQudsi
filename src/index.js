import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./components/ErrorPage";
import Home from "./Home";
import LoginAdmin from "./Admin/LoginAdmin";
import EditPaket from "./Admin/EditPaket";
import CreatePaket from "./Admin/CreatePaket";
import GaleriAdmin from "./Admin/GaleriAdmin";
import PaketAdmin from "./Admin/PaketAdmin";
import TestiAdmin from "./Admin/TestiAdmin";
import KontakAdmin from "./Admin/KontakAdmin";
import Logout from "./Admin/Logout";
import UserProvider from "./context/userContect";

const router = createBrowserRouter([
  {
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "galeri", element: <GaleriAdmin /> },
      { path: "paket", element: <PaketAdmin /> },
      { path: "testi", element: <TestiAdmin /> },
      { path: "kontak", element: <KontakAdmin /> },
      { path: "paket/:id/edit", element: <EditPaket /> },
      { path: "paket/create", element: <CreatePaket /> },
      { path: "logout", element: <Logout /> },
    ],
  },
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <UserProvider>
        <LoginAdmin />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
