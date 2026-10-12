"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: LINNEAH OLOFSSON
 */

const searchButton = document.querySelector("#searchbutton");
const searchField = document.querySelector("#search");
const searchForm = document.querySelector("#searchform");

//Validerar inmatning till sökfältet
function validateSearch() {
  //Felmeddelande om fältet är tomt
  if (searchField.value.trim() === "") {
    console.log(1);
    writeError();
  } else {
    return true;
  }
}

//Skriver ut felmeddelande till DOM
function writeError() {}

//Hämtar recept från API
async function getRecipe() {}

//Skriver ut recept till DOM
function displayRecipe() {}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateSearch() === true) {
    console.log(2);
  }
});
