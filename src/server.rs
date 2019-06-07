use rocket_contrib::templates::Template;
use rocket::config::{Config, Environment};
use rocket::Request;

use crate::pages::{index::*, res::*, load_manifest::*};

pub fn launch() {
    let config = Config::build(Environment::Development)
        .address("localhost")
        .port(8080)
        .finalize().unwrap();
    rocket::custom(config)
//        .register(catchers![not_found])
        .mount("/", routes![index])
        .mount("/res", routes![js,css])
        .mount("/load", routes![load])
        .attach(rocket_contrib::templates::Template::fairing())
        .launch();
}