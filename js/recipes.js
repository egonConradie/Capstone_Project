// Wait for the document to be fully loaded
$(document).ready(function () {
  //Execute on image click
  $("img").click(function () {
    let recipeName = $(this).attr("data-recipe"); // Get the 'data-recipe' attribute from clicked image
    //check if recipe exist
    if (recipeName) {
      // Redirect to recipe.html with the selected recipe as URL parameter
      window.location.href = "recipe.html?recipe=" + recipeName;
    }
  });

  const currentPage = window.location.pathname; // Get the current page's path

  // Get the query string from the URL (?recipe=burger)
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString); // Parse query parameters
  const recipeKey = urlParams.get("recipe"); // Get the value of recipe

  // Recipes object information
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
    pizza: {
      title: "Pizza",
      about: "Basic homemade pizza dough with favorite toppings.",
      ingredients: [
        "2 cups flour",
        "1 packet dry yeast",
        "3/4 cup warm water",
        "1 tbsp olive oil",
        "1 tsp salt",
      ],
      method:
        "Mix all ingredients into a dough. Let rise 1 hour. Roll out and add toppings. Bake at 220°C for 12-15 minutes.",
    },
    shawarma: {
      title: "Beef Shawarma",
      about: "Middle Eastern spiced beef in flatbread with veggies.",
      ingredients: [
        "500g beef strips",
        "Shawarma spice mix",
        "Yogurt and lemon juice",
        "Flatbreads",
        "Tomato, cucumber, onion",
      ],
      method:
        "Marinate beef in spices, yogurt, and lemon. Cook in pan until browned. Serve in flatbread with veggies.",
    },
    waffle: {
      title: "Waffles",
      about: "Crispy on the outside, fluffy on the inside breakfast classic.",
      ingredients: [
        "2 cups flour",
        "2 eggs",
        "1 1/2 cups milk",
        "1/3 cup melted butter",
        "1 tbsp sugar",
        "1 tsp baking powder",
        "Pinch of salt",
      ],
      method:
        "Mix dry ingredients. Beat eggs and mix with milk and butter. Combine with dry mix. Pour into waffle iron and cook until golden.",
    },
    granola: {
      title: "Granola from Scratch",
      about: "Homemade crunchy granola, perfect for breakfast.",
      ingredients: [
        "3 cups rolled oats",
        "1/2 cup honey or maple syrup",
        "1/3 cup coconut oil",
        "1 cup nuts/seeds",
        "1 tsp cinnamon",
        "1 tsp vanilla extract",
      ],
      method:
        "Mix all ingredients. Spread on baking tray. Bake at 160°C for 20-25 mins, stirring halfway. Cool and store.",
    },
    chowmein: {
      title: "Beef Chow Mein",
      about: "Stir-fried noodles with beef and vegetables in soy sauce.",
      ingredients: [
        "200g beef strips",
        "1 packet chow mein noodles",
        "1 bell pepper, sliced",
        "1 carrot, julienned",
        "Soy sauce and garlic",
        "Oil",
      ],
      method:
        "Boil noodles and drain. Stir-fry beef, remove. Stir-fry veggies. Add beef back, add sauce, then toss noodles in.",
    },
    thai: {
      title: "Thai Red Curry",
      about: "Creamy spicy Thai curry with coconut milk and vegetables.",
      ingredients: [
        "2 tbsp red curry paste",
        "1 can coconut milk",
        "1 cup chicken or tofu",
        "Vegetables (bell pepper, bamboo shoots)",
        "Fish sauce, lime juice",
      ],
      method:
        "Fry curry paste. Add coconut milk, simmer. Add meat/veggies and cook until done. Add fish sauce and lime juice. Serve with rice.",
    },
  };
  // Get the recipe object based on the recipe key from the URL
  const recipe = recipes[recipeKey];

  if (recipe) {
    // Display the recipe details on the page
    $("#recipe-title").text(recipe.title); // Set the recipe title
    $("#recipe-about").text("About: " + recipe.about); // Set the 'about' description

    // Generate the ingredients list dynamically...
    let ingredientsHtml = "";
    for (let i = 0; i < recipe.ingredients.length; i++) {
      ingredientsHtml += "<li>" + recipe.ingredients[i] + "</li>";
    }
    $("#recipe-ingredients").html(ingredientsHtml); // Add ingredients to the page

    // Show the cooking method
    $("#recipe-method").text(recipe.method);
  } else {
    // Display message if recipe not found
    $("#recipe-content").html("<p>Recipe not found.</p>");
  }
});

//function when save button is clicked
$(document).ready(function () {
  $(".save-btn").click(function (event) {
    event.stopPropagation();

    // Get the parent `.item` div containing the recipe
    const recipeHtml = $(this).closest(".item").prop("outerHTML");

    // Retrieve existing saved items from localStorage
    let savedItems = JSON.parse(localStorage.getItem("savedItems")) || [];

    // Check if the recipe is already saved
    if (!savedItems.includes(recipeHtml)) {
      savedItems.push(recipeHtml); // Add the recipe HTML to the saved items array
      localStorage.setItem("savedItems", JSON.stringify(savedItems)); // Save to localStorage
      alert("Recipe saved!");
    } else {
      alert("Recipe is already saved!");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const commentInput = document.getElementById("comment-input");
  const submitCommentButton = document.getElementById("submit-comment");
  const commentsContainer = document.getElementById("comments-container");

  // Load existing comments from localStorage
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach((comment) => {
    const commentElement = document.createElement("p");
    commentElement.textContent = comment;
    commentsContainer.appendChild(commentElement);
  });

  // Handle comment submission
  submitCommentButton.addEventListener("click", () => {
    const comment = commentInput.value.trim();
    if (comment) {
      // Save comment to localStorage
      savedComments.push(comment);
      localStorage.setItem("comments", JSON.stringify(savedComments));

      // Display the comment
      const commentElement = document.createElement("p");
      commentElement.textContent = comment;
      commentsContainer.appendChild(commentElement);

      // Clear the input field
      commentInput.value = "";
    } else {
      alert("Please write a comment before submitting.");
    }
  });
});
// Comment submission for each recipe
$(document).ready(function () {
  $(".submit-comment").click(function () {
    const commentInput = $(this).siblings(".comment-input"); // Get the associated input
    const commentsContainer = $(this).siblings(".comments-container"); // Get the associated comments container
    const commentText = commentInput.val().trim(); // Get the comment text
    const recipeKey = $(this).closest(".item").find("img").data("recipe"); // Get the recipe key

    if (commentText) {
      // Load existing comments for this recipe from localStorage
      let savedComments = JSON.parse(localStorage.getItem("comments")) || {};
      if (!savedComments[recipeKey]) {
        savedComments[recipeKey] = [];
      }

      // Save the new comment
      savedComments[recipeKey].push(commentText);
      localStorage.setItem("comments", JSON.stringify(savedComments));

      // Display the comment
      const commentElement = $("<p></p>").text(commentText);
      commentsContainer.append(commentElement);

      // Clear the input field
      commentInput.val("");
    } else {
      alert("Please write a comment before submitting.");
    }
  });

  // Load existing comments for each recipe on page load
  $(".item").each(function () {
    const recipeKey = $(this).find("img").data("recipe"); // Get the recipe key
    const commentsContainer = $(this).find(".comments-container"); // Get the associated comments container

    // Load comments from localStorage
    const savedComments = JSON.parse(localStorage.getItem("comments")) || {};
    if (savedComments[recipeKey]) {
      savedComments[recipeKey].forEach((comment) => {
        const commentElement = $("<p></p>").text(comment);
        commentsContainer.append(commentElement);
      });
    }
  });
});
//hover affect to dropdown on home
$(document).ready(function () {
  $(".nav-item-dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").stop(true, true).slideDown(200);
    },
    function () {
      $(this).find(".dropdown-menu").stop(true, true).slideUp(200);
    }
  );
});
//like button color change
$(".like-btn").click(function () {
  $(this).css("background-color", "green"); // Change button background to green
  $(this).css("color", "white"); // Change text color to white for better visibility
});

$(document).ready(function () {
  // Redirect to recipe.html when an image is clicked
  $("img").click(function () {
    const recipeKey = $(this).data("recipe"); // Get the recipe key from the image
    if (recipeKey) {
      // Redirect to recipe.html with the recipe key as a URL parameter
      window.location.href = "recipe.html?recipe=" + recipeKey;
    }
  });

  // Save recipe to localStorage when "Save for Later" is clicked
  let totalSaves = 0;
  $(".save-btn").click(function (event) {
    event.stopPropagation();
    totalSaves++;
    const recipeKey = $(this).data("recipe"); // Get the recipe key
    let savedItems = JSON.parse(localStorage.getItem("savedItems")) || []; // Load saved items from localStorage

    if (!savedItems.includes(recipeKey)) {
      savedItems.push(recipeKey); // Add the recipe key to the saved items array
      localStorage.setItem("savedItems", JSON.stringify(savedItems)); // Save to localStorage
      alert("Recipe saved!" + "Total saves" + totalSaves);
    } else {
      alert("Recipe is already saved!");
    }
  });
});
/*
  References:
  1) FreeCodeCamp.org: Full JavaScript Course 2024 (Video) 
    https://www.youtube.com/watch?v=-8LTPIJBGwQ&t=7154s&ab_channel=freeCodeCamp.org
  2) W3Schools: JavaScript Window Location
    https://www.w3schools.com/js/js_window_location.asp
  3)  MDN Web Docs: URLSearchParams
    https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
   4) StackOverflow: How to obtain the query string from the current URL with JavaScript
    https://stackoverflow.com/questions/9870512/how-to-obtain-the-query-string-from-the-current-url-with-javascript
  5) SEMrush Blog: URL Parameters Explained
    https://www.semrush.com/blog/url-parameters/
  6) StackOverflow: Difference between URL parameters and query strings
    https://stackoverflow.com/questions/39266970/what-is-the-difference-between-url-parameters-and-query-strings
  7)https://www.geeksforgeeks.org/design-a-recipe-app-in-html-css-javascript/?ref=ml_lbp
  8)Recipe details (titles, descriptions, ingredients, and cooking methods) were assisted/generated using AI to spare time (Chatgpt) to complete content.
 
*/
