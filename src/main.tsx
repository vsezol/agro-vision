import ReactDOM from "react-dom/client";
import App from "./app/index.tsx";
import "./index.css";
import { setVhVariable } from "./shared/lib/set-vh-variable.ts";

setVhVariable();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
