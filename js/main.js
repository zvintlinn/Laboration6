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

    const apiError = document.querySelector("#message");
    apiError.innerHTML = "";
    displayRecipe(data);

    //Fångar upp ev felmeddelanden
  } catch (error) {
    const apiError = document.querySelector("#message");
    apiError.innerHTML = `${error}`;
  }
}

//Raderar tidigare sökt recept
function deleteRecipe() {
  const sectionEl = document.querySelector("#recipe");
  sectionEl.innerHTML = "";
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

  //variabler för strong och p
  const servingsPel = document.createElement("p");
  const servingsTitle = document.createElement("strong");
  const prepPel = document.createElement("p");
  const prepTitle = document.createElement("strong");
  const cookingPel = document.createElement("p");
  const cookingTitle = document.createElement("strong");
  const difficultPel = document.createElement("p");
  const difficultTitle = document.createElement("strong");

  //servings
  servingsTitle.textContent = `Servings:`;
  servingsPel.appendChild(servingsTitle);

  servingsPel.append(` ${data.recipes[0].servings}`);

  //Prep time
  prepTitle.textContent = `Prep time:`;
  prepPel.appendChild(prepTitle);

  prepPel.append(` ${data.recipes[0].prepTimeMinutes}`);

  //Cooking time
  cookingTitle.textContent = `Cooking time:`;
  cookingPel.appendChild(cookingTitle);

  cookingPel.append(` ${data.recipes[0].cookTimeMinutes}`);

  //Difficulty
  difficultTitle.textContent = `Difficulty:`;
  difficultPel.appendChild(difficultTitle);

  difficultPel.append(` ${data.recipes[0].difficulty}`);

  divEl.appendChild(servingsPel);
  divEl.appendChild(prepPel);
  divEl.appendChild(cookingPel);
  divEl.appendChild(difficultPel);
  articleEl.appendChild(divEl);

  //INGREDIENSER
  const ingH4El = document.createElement("h4");

  ingH4El.textContent = "Ingredients";
  articleEl.appendChild(ingH4El);

  const ingListEl = document.createElement("ul");

  //loop för att lista alla ingredienser
  data.recipes[0].ingredients.forEach((element) => {
    const liEl = document.createElement("li");
    liEl.textContent = element;
    ingListEl.appendChild(liEl);
  });

  articleEl.appendChild(ingListEl);

  //INSTRUKTIONER
  const instH4El = document.createElement("h4");

  instH4El.textContent = "Instructions";
  articleEl.appendChild(instH4El);

  const instListEl = document.createElement("ol");

  //loop för instruktioner
  data.recipes[0].instructions.forEach((element) => {
    const liEl = document.createElement("li");
    liEl.textContent = element;
    instListEl.appendChild(liEl);
  });

  articleEl.appendChild(instListEl);
}

searchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validateSearch() === true) {
    deleteRecipe();
    getRecipe();
  }
});
