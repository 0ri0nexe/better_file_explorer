// voir à https://github.com/spacedriveapp/spacedrive/blob/f352a28dc883b20332138e5201580987119e181d/core/src/location/indexer/rules/seed.rs#L72
// pour les dossiers protégés
use std::fs;
use std::io::Error;
// use std::path::Path;

use serde;

#[derive(serde::Serialize)]
pub struct SystemElement {
    pub folder: bool,
    pub name: String,
}

pub fn get_elements(path: &str) -> Result<Vec<SystemElement>, Error> {
    let result: Vec<SystemElement> = fs::read_dir(path)?
        .map(|file| {
            let file = file.unwrap();
            let _metadatas = file.metadata().unwrap();
            println!("locked: {}", permissions::is_readable(path));
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
