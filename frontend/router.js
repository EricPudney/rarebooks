import home from "./pages/home.js";
import add from "./pages/add.js";
import books from "./pages/books.js";

async function route() {

  switch (location.hash) {
    case "#add":
      $('main').html(await add());
      break;
    case "":
      $('main').html(await home());
      break;
    case "#books":
      $('main').html(await books());
  }
}

window.onhashchange = route;
window.onload = route;