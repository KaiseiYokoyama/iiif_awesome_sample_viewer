use crate::iif_manifest::Manifest;

#[post("/", data = "<url>")]
pub fn load(url: String) -> reqwest::Result<String> {
    let resp = reqwest::get(&url)?.text()?;
    let manifest: Manifest = serde_json::from_str(&resp).unwrap();
    return Result::Ok(serde_json::to_string(&manifest.get_images()).unwrap());
}