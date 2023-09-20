// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::Serialize;

use better_file_explorer::{get_elements, SystemElement};

#[derive(Serialize)]
struct Response {
    element_list: Vec<SystemElement>,
}

#[tauri::command]
fn get_elements_from_path(path: &str) -> Response {
    Response {
        element_list: get_elements(path).unwrap(),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_elements_from_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
