use serde;

use super::rules::{self, is_in_rules};

#[derive(serde::Serialize)]
pub struct SystemElement {
    pub folder: bool,
    pub name: String,
}

impl SystemElement {
    pub fn build(folder: bool, name: String, path: &str) -> Option<SystemElement> {
        match is_in_rules(path) {
            true => Some(SystemElement { folder, name }),
            false => None,
        }
    }
}
