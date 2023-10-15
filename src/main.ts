// import { invoke } from "@tauri-apps/api/tauri";

import { getPreviousPath, showPath } from "./features/historic";
import { getElements } from "./features/explorer";
import { showSidebar } from "./features/sidebar";

document.addEventListener("keyup", async () => {
  getPreviousPath();
  console.log("fait");
});

window.addEventListener("DOMContentLoaded", () => {
  getElements();
  showSidebar();
  showPath();
});