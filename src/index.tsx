import { createRoot } from "react-dom/client";
import "./index.css";

const root = createRoot(document.querySelector("#root")!);
root.render(
	<>
		<App />
	</>
);

function App() {
	return <>INIT</>;
}

export const layouts: PathGroup[] = [
	{
		layout: <></>,
		path: "",
		paths: [],
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
