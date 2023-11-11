// import { invoke } from "@tauri-apps/api/tauri";

import { getPreviousPath, showPath } from "./features/historic";
import { getElements } from "./features/explorer";
import { showSidebar } from "./features/sidebar";

document.addEventListener("keyup", async () => {
  getPreviousPath();
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("explorer")!.style.height = (window.innerHeight - document.getElementById("historic_bar")!.offsetHeight - 15).toString() + "px";
  getElements();
  showSidebar();
  showPath();
});

window.addEventListener("resize", () => {
  document.getElementById("explorer")!.style.height = (window.innerHeight - document.getElementById("historic_bar")!.offsetHeight - 15).toString() + "px";
})