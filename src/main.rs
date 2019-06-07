#![feature(proc_macro_hygiene)]
#![feature(custom_attribute)]
#![feature(decl_macro)]
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate rocket;

mod iif_manifest;
mod server;
mod pages;

fn main() {
//    let args: Vec<String> = std::env::args().collect();
//    if let Some(url) = args.get(1) {
//        let resp = reqwest::get(url)?.text()?;
//        let manifest: iif_manifest::Manifest = serde_json::from_str(&resp).unwrap();
//        println!("{:?}", manifest.get_images());
//    }
//    Ok(())
    server::launch();
}
