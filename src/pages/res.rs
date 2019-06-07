use std::path::{PathBuf, Path};

use rocket::response::NamedFile;

// distribute javascript
#[get("/js/<file..>")]
pub fn js(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("res/js/").join(file)).ok()
}

// distribute css
#[get("/css/<file..>")]
pub fn css(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("res/css/").join(file)).ok()
}
