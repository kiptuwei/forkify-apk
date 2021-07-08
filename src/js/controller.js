// import View from './views/View.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable';
import 'regenerator-runtime';
// import { async } from 'regenerator-runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //console.log(typeof id);
    recipeView.renderSpiner();
    //0) update results view to highlight the selected results
    resultsView.update(model.getSearchResultsPage());
    //0') update bookmark
    bookmarksView.update(model.state.bookmarks);
    //1) loading recipe
    await model.loadRecipe(id);

    //2) rendering recipe
    recipeView.render(model.state.recipe);
    //debugger;
  } catch (err) {
    //alert(err);
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    //1. Get query results
    const query = searchView.getQuery();
    //searchView.nullQuery();
    resultsView.renderSpiner();
    // console.log(query);
    //2. load search results
    await model.loadSearchResults(query);
    //3.render results
    //console.table(model.getSearchResultsPage(4));

    resultsView.render(model.getSearchResultsPage());
    //4. Render pagination
    //console.log(model.state.search)
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (page) {
  //1. Render new results;
  resultsView.render(model.getSearchResultsPage(page));
  //1. Rendew New pagination buttons
  paginationView.render(model.state.search);
};

const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlDeleteBookmark = function(){
  //delete bookmark
  model.deleteBookmark(model.state.recipe.id);

  //update user interface
  bookmarksView.render(model.state.bookmarks)
}

const controlAddBookmark = function () {
  //1) Add/delete a bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //2)update recipe view
  recipeView.update(model.state.recipe);
  //3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlServings = function (newServings) {
  //Update recipe servings
  model.updateServings(newServings);
  //Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //show spinner
    addRecipeView.renderSpiner();

    await model.uploadRecipe(newRecipe);

    //render added recipe
    recipeView.render(model.state.recipe);

    //success meassage
    addRecipeView.renderMessage();
    
    //render bookmark
    bookmarksView.render(model.state.bookmarks);

    //change URL ID
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close  modal window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    //reset html
    addRecipeView.resetMarkup();
  } catch (err) {
    console.log(err);
    // addRecipeView.renderError(err.message);
  }
};

const newFeature = function(){
  console.log('welcom to apk');
}
const init = function () {
  bookmarksView.addHandlerRender(controlBookmark);
  bookmarksView.addHandlerDelete(controlDeleteBookmark)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  newFeature();
  console.log(`jiwjc`);
};

init();
