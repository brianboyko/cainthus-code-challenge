import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import * as dotenv from 'dotenv'; 
import * as path from 'path'; 

dotenv.config({path: path.resolve('../secret.env')});
console.log(process.env);  

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
