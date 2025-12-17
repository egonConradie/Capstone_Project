// =====================
// Constants
// =====================
const SAVED_ITEMS_KEY = "savedItems";
const COMMENTS_KEY = "comments";

// =====================
// Document Ready
// =====================
$(document).ready(function () {
  // ---------------------
  // Image Click → Redirect
  // ---------------------
  $("img").click(function () {
    const recipeKey = $(this).data("recipe");
    if (recipeKey) {
      window.location.href = "recipe.html?recipe=" + recipeKey;
    }
  });

  // ---------------------
  // URL Recipe Handling
  // ---------------------
  const urlParams = new URLSearchParams(window.location.search);
  const recipeKey = urlParams.get("recipe");

  const recipes = {
    fries: {
      title: "French Fries",
      about: "Crispy, golden fried potato sticks loved worldwide.",
      ingredients: ["4 large potatoes", "Oil for deep frying", "Salt to taste"],
      method:
        "Peel and cut potatoes into sticks. Rinse and dry. Fry until golden brown. Drain and sprinkle with salt.",
    },
    burger: {
      title: "Burger",
      about: "A juicy beef patty sandwiched in a bun with toppings.",
      ingredients: [
        "1 beef patty",
        "1 burger bun",
        "Lettuce, tomato, onion",
        "Cheese and sauces of choice",
      ],
      method:
        "Grill the patty. Toast the bun. Assemble with lettuce, tomato, cheese, sauces, and serve hot.",
    },
    spaghetti: {
      title: "Spaghetti Bolognese",
      about: "A classic Italian pasta dish with rich meat sauce.",
      ingredients: [
        "200g spaghetti",
        "250g ground beef",
        "1 onion, chopped",
        "2 cloves garlic, minced",
        "400g tomato sauce",
        "Olive oil",
      ],
      method:
        "Cook spaghetti. Sauté onions and garlic in oil, add beef and cook. Add tomato sauce and simmer. Serve over spaghetti.",
    },
  };

  const recipe = recipes[recipeKey];
  if (recipe) {
    $("#recipe-title").text(recipe.title);
    $("#recipe-about").text("About: " + recipe.about);

    let ingredientsHtml = "";
    recipe.ingredients.forEach((item) => {
      ingredientsHtml += `<li>${item}</li>`;
    });
    $("#recipe-ingredients").html(ingredientsHtml);
    $("#recipe-method").text(recipe.method);
  }

  // ---------------------
  // Save Recipe Button
  // ---------------------
  $(".save-btn").click(function (event) {
    event.stopPropagation();
    const recipeKey = $(this).data("recipe");
    let savedItems = JSON.parse(localStorage.getItem(SAVED_ITEMS_KEY)) || [];

    if (!savedItems.includes(recipeKey)) {
      savedItems.push(recipeKey);
      localStorage.setItem(SAVED_ITEMS_KEY, JSON.stringify(savedItems));
      alert("Recipe saved!");
    } else {
      alert("Recipe already saved.");
    }
  });

  // ---------------------
  // Comment Submission
  // ---------------------
  $(".submit-comment").click(function () {
    const commentInput = $(this).siblings(".comment-input");
    const commentsContainer = $(this).siblings(".comments-container");
    const commentText = commentInput.val().trim();
    const recipeKey = $(this).closest(".item").find("img").data("recipe");

    if (!commentText) {
      alert("Please write a comment.");
      return;
    }

    let comments = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};
    if (!comments[recipeKey]) {
      comments[recipeKey] = [];
    }

    comments[recipeKey].push(commentText);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));

    commentsContainer.append($("<p>").text(commentText));
    commentInput.val("");
  });

  // ---------------------
  // Load Existing Comments
  // ---------------------
  $(".item").each(function () {
    const recipeKey = $(this).find("img").data("recipe");
    const commentsContainer = $(this).find(".comments-container");
    const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY)) || {};

    if (comments[recipeKey]) {
      comments[recipeKey].forEach((comment) => {
        commentsContainer.append($("<p>").text(comment));
      });
    }
  });

  // ---------------------
  // Dropdown Hover
  // ---------------------
  $(".nav-item-dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").stop(true, true).slideDown(200);
    },
    function () {
      $(this).find(".dropdown-menu").stop(true, true).slideUp(200);
    }
  );
});

// ---------------------
// Like Button Effect
// ---------------------
$(".like-btn").click(function () {
  $(this).css({
    "background-color": "green",
    color: "white",
  });
});
