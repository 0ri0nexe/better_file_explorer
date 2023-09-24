// import { invoke } from "@tauri-apps/api/tauri";

import { getPreviousPath, showPath } from "./features/historic";
import { getElements } from "./features/explorer";

document.addEventListener("keyup", async () => {
  getPreviousPath();
  console.log("fait");
});

window.addEventListener("DOMContentLoaded", () => {
  getElements();
  showPath();
});