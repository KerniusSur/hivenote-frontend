import { createRoot } from "react-dom/client";
import "./index.css";
import AppTheme from "./AppTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "layouts/PublicLayout";
import HomePage from "pages/HomePage";
import { ThemeProvider } from "@emotion/react";
import RegisterLoginPage from "pages/RegisterLoginPage";

const root = createRoot(document.querySelector("#root")!);
root.render(<App />);

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <BrowserRouter>
        <Routes>
          {layouts?.map((layout: PathGroup, i: number) => (
            <Route key={i} path={layout.path} element={layout?.layout}>
              {layout.paths?.map((component: PathItem) => (
                <Route
                  key={component.path}
                  path={component.path}
                  element={component.element}
                />
              ))}
            </Route>
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
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
        access: [],
      },
      {
        path: "login",
        element: <RegisterLoginPage />,
        access: [],
      },
      {
        path: "register",
        element: <RegisterLoginPage isRegisterPage />,
        access: [],
      },
    ],
  },
  {
    layout: <></>,
    path: "",
    paths: [],
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
  access: string[];
}

export const getAllPublicMenuItems = () =>
  layouts[1].paths.filter((path) => path.menuIcon && path.menuLabel);
export const getAllAdminMenuItems = () =>
  layouts[2].paths.filter((path) => path.menuIcon && path.menuLabel);
