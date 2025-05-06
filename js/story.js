$(document).ready(function () {
  // Hide the story text slowly when button clicked
  $("#hideBtn").click(function () {
    $("#storyText").hide("slow"); //
  });

  //  Animate the heading when  button is clicked
  $("#animateBtn").click(function () {
    $("#storyTitle").animate(
      {
        fontSize: "30px", // Make the font size bigger
        marginLeft: "20px", // Move it a bit to the right
      },
      1000
    );
  });

  // chained effects when "Chained Effects" button is clicked
  $("#chainBtn").click(function () {
    $("#storyText").slideUp(1000); // Slide up
    $("#storyText").slideDown(1000); // slide down
    $("#storyText").fadeTo("slow", 0.5); // fade to half visible
    $("#storyText").fadeTo("slow", 1); // fade back to full visible
  });
});
