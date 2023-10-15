use std::fs;
// use std::path::Path;
use serde;
use std::io::Error;

#[derive(serde::Serialize)]
pub struct SystemElement {
    pub folder: bool,
    pub name: String,
}

pub fn get_elements(path: &str) -> Result<Vec<SystemElement>, Error> {
    let result: Vec<SystemElement> = fs::read_dir(path)?
        .map(|file| {
            let file = file.unwrap();
            SystemElement {
                folder: !file.path().is_file(),
                name: String::from(file.file_name().to_string_lossy()),
            }
        })
        .collect();
    Ok(result)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn getting_element() {
        get_elements("F:/");
    }
}
