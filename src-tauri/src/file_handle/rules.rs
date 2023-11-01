extern "C" {
    fn isProtected(path: *const u8, len: usize) -> i32;
}

pub fn is_in_rules(path: &str) -> bool {
    let path_bytes = path.as_bytes();
    let path_bytes_ptr = path_bytes.as_ptr();
    let path_bytes_lenght = path_bytes.len();
    unsafe {
        let output = isProtected(path_bytes_ptr, path_bytes_lenght);
        return output == 0;
    }
}
