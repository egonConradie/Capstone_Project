$(document).ready(function () {
  // Load saved recipes from localStorage
  let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

  if (savedItems.length > 0) {
    savedItems.forEach(function (itemHtml) {
      $("#saved-container").append(itemHtml); // Append the saved recipe HTML to the container
    });
  } else {
    $("#saved-container").html("<p>No saved recipes!</p>");
  }

  // Clear old or incorrect data from localStorage (optional, for debugging)
  localStorage.removeItem("savedRecipes");
});
// Save recipe to localStorage
$(".save-btn").click(function () {
  const recipeName = $(this).data("recipe");
  let savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];

  if (!savedRecipes.includes(recipeName)) {
    savedRecipes.push(recipeName);
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert("Recipe saved!");
  } else {
    alert("Recipe already saved.");
  }
});
