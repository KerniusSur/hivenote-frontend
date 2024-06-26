import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import PublicLayout from "layouts/PublicLayout";
import CalendarPage from "pages/CalendarPage";
import HomePage from "pages/HomePage";
import NotePage from "pages/NotePage";
import RegisterLoginPage from "pages/RegisterLoginPage";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "utils/RequireAuth";
import AppTheme from "./AppTheme";
import "./index.css";
import { ThemeContextProvider } from "utils/theme/ThemeContextProvider";

const root = createRoot(document.querySelector("#root")!);
root.render(
  <>
    <App />
    <ToastContainer
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      theme="dark"
    />
  </>
);

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          {layouts?.map((layout: PathGroup, i: number) => (
            <Route key={i} path={layout.path} element={layout?.layout}>
              {layout.paths?.map((component: PathItem) => (
                <Route
                  key={component.path}
                  path={component.path}
                  element={
                    <RequireAuth access={component.access} tag={component.tag}>
                      {component.element}
                    </RequireAuth>
                  }
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export const layouts: PathGroup[] = [
  {
    layout: <PublicLayout />,
    path: "",
    paths: [
      {
        path: "",
        element: <HomePage />,
        access: undefined,
        tag: "home-page",
      },
      {
        path: "login",
        element: <RegisterLoginPage />,
        access: undefined,
        tag: "login-page",
      },
      {
        path: "register",
        element: <RegisterLoginPage isRegisterPage />,
        access: undefined,
        tag: "register-page",
      },
      {
        path: "calendar",
        element: <CalendarPage />,
        access: undefined,
        tag: "calendar-page",
      },
      {
        path: "calendar/:eventId",
        element: <CalendarPage />,
        access: undefined,
        tag: "calendar-page-event-view",
      },
    ],
  },
  {
    layout: <PublicLayout />,
    path: "",
    paths: [
      {
        path: "note/:noteId",
        element: <NotePage />,
        access: "USER",
        tag: "note-page",
      },
    ],
  },
  {
    layout: <></>,
    path: "admin",
    paths: [],
  },
];

interface PathGroup {
  layout: JSX.Element;
  path: string;
  paths: PathItem[];
}

export interface PathItem {
  path: string;
  element: JSX.Element;
  menuLabel?: string;
  menuIcon?: JSX.Element;
  activeMenuIcon?: JSX.Element;
  access?: "USER" | "ADMIN" | "SUPER_ADMIN";
  tag: string;
}

export const getAllPublicMenuItems = () =>
  layouts[1].paths.filter((path) => path.menuIcon && path.menuLabel);
export const getAllAdminMenuItems = () =>
  layouts[2].paths.filter((path) => path.menuIcon && path.menuLabel);
