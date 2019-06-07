use rocket_contrib::templates::Template;
use std::collections::HashMap;

#[get("/")]
pub fn index() -> Template {
    return Template::render("pages/index", &HashMap::<&str,&str>::new());
}