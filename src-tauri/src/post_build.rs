fn main() {
    cc::Build::new()
        .cpp(true)
        .file("src/file_handle/permission.cpp")
        .flag("-std=c++20")
        .compile("main.a");
}
