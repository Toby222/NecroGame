export { default } from "next/app";

import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import { faCog, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

library.add(faPause, faPlay, faCog);
