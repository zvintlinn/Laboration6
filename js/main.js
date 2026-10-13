"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: LINNEAH OLOFSSON
 */

const searchButton = document.querySelector("#searchbutton");
const searchField = document.querySelector("#search");
const searchForm = document.querySelector("#searchform");

const searchError = document.querySelector("#error");

const recipe = document.querySelector("#recipe");

//Validerar inmatning till sökfältet
function validateSearch() {
  //Felmeddelande om fältet är tomt
  if (searchField.value.trim() === "") {
    writeError();
  }

  //Om sökfältet är ifyllt
  else {
    searchError.innerHTML = "";
    return true;
  }
}

//Skriver ut felmeddelande till DOM
function writeError() {
  //Skriver ut felmeddelande över sökfältet
  searchError.innerHTML = "Du måste skriva in något i sökfältet.";
}

//Hämtar recept från API
async function getRecipe() {
  try {
    //Hämtar data med fetch
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${searchField.value.trim()}`,
    );

    //Konverterar json till javascript
    const data = await response.json();
    console.log(data);

    //Errormeddelande om response blir något annat än 200 ok
    if (!response.ok) {
      throw new Error("Något gick fel, försök igen senare.");
    }

    //Errormeddelande om recept inte finns
    if (data.recipes.length === 0) {
      throw new Error("Recept finns ej, prova igen.");
    }

    displayRecipe(data);

    //Fångar upp ev felmeddelanden
  } catch (error) {
    searchError.innerHTML = `${error}`;
  }
}

//Skriver ut recept till DOM
function displayRecipe(data) {
  //Lägger till en article som kommer innehålla receptet
  const sectionEl = document.querySelector("#recipe");
  const articleEl = document.createElement("article");
  sectionEl.appendChild(articleEl);

  //TITEL
  const titleEl = document.createElement("h3");
  titleEl.textContent = `${data.recipes[0].name}`;
  articleEl.appendChild(titleEl);

  //BILD
  const imageEl = document.createElement("img");
  imageEl.src = data.recipes[0].image;
  imageEl.alt = data.recipes[0].name;
  articleEl.appendChild(imageEl);

  //RECEPTINFO
  const divEl = document.createElement("div");
  divEl.className = "recipe-info";

  const servingsPel = document.createElement("p");
  const servingsTitle = document.createElement("strong");

  servingsTitle.textContent = `Servings:`;
  servingsPel.appendChild(servingsTitle);

  servingsPel.append(` ${data.recipes[0].servings}`);
  console.log(servingsTitle);

  divEl.appendChild(servingsPel);
  articleEl.appendChild(divEl);
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateSearch() === true) {
    getRecipe();
  }
});
