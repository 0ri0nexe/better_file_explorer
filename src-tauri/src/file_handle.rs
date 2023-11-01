mod rules;
pub mod system_element;

use std::fs;
use std::io::Error;

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
