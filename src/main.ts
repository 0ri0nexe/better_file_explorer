// import { invoke } from "@tauri-apps/api/tauri";

// import { tests } from "./features/historic";
import { getElements } from "./features/explorer"


window.addEventListener("DOMContentLoaded", () => {
  getElements();
});