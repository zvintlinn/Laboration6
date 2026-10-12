"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: LINNEAH OLOFSSON
 */

const searchButton = document.querySelector("#searchbutton");
const search = document.querySelector("#search");

//Validerar inmatning till sökfältet
function validateSearch() {
  if (search.value.trim() === "") {
    console.log("hej");
  }
}

//Skriver ut felmeddelande till DOM
function writeError() {}

//Hämtar recept från API
async function getRecipe() {}

//Skriver ut recept till DOM
function displayRecipe() {}

searchButton.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateSearch() === true) {
  }
});
