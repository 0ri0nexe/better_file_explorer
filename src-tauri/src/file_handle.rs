// voir à https://github.com/spacedriveapp/spacedrive/blob/f352a28dc883b20332138e5201580987119e181d/core/src/location/indexer/rules/seed.rs#L72
// pour les dossiers protégés
mod rules;
pub mod system_element;

use std::fs;
use std::io::Error;

use rules::is_in_rules;
use system_element::SystemElement;

pub fn get_elements(path: &str) -> Result<Vec<SystemElement>, Error> {
    let result: Vec<SystemElement> = fs::read_dir(path)?
        .filter_map(|entry| {
            let file = entry.ok()?;
            SystemElement::build(
                !file.path().is_file(),
                String::from(file.file_name().to_string_lossy()),
                file.path().to_str().unwrap(),
            )
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
