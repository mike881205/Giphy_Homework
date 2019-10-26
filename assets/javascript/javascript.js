// Initial array of bands
let bands = ["Every Time I Die", "Deftones", "Queens of the Stone Age", "New Found Glory"];


// Function for displaying band data
function renderButtons() {

    // Deleting the band buttons prior to adding new band buttons
    $("#buttons-view").empty();

    // Looping through the array of bands
    for (let i = 0; i < bands.length; i++) {

        // Dyanically generate buttons for each band in the array.
        let bandButton = $("<button>");
        // Adding a class
        bandButton.addClass("band");
        // Adding a data-attribute with a value of the band at index i
        bandButton.attr("data-band", bands[i]);
        // Providing the button's text with a value of the band at index i
        bandButton.text(bands[i]);
        // Adding the button to the HTML
        $("#buttons-view").append(bandButton);
    }
}

// Function for adding a band to the bands array
$("#add-band").on("click", function(event) {
    
    event.preventDefault();

    // Grab the text from the input box
    let band = $("#band-input").val().trim();

    // Add band entered in text box to bands array
    bands.push(band);

    renderButtons();
    
});

// Display list of bands
renderButtons();

// Function to retrieve and add gifs to the page
$(document).on("click", ".band", function(){

  $("#gifs-appear-here").empty();
  
  let bandData = $(this).attr("data-band");

  // Giphy API URL
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bandData + "&api_key=QZjqyqYS53kHPK9RXWncTF1pJXjuBPsy&limit=10"

  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
   
      let results = response.data

      for (var i = 0; i < results.length; i++) {

        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {


          // Creating a div for the gif
          let gifDiv = $("<div>");

          // Storing the result item's rating
          let rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          let p = $("<p>").text("Rating: " + rating);

          // Creating an image tag

         let stillUrl = results[i].images.fixed_height_still.url

         let animateUrl = results[i].images.fixed_height.url

          let stillBandImage = $("<img>").addClass("bandImage").attr("src", stillUrl).attr("data-state", "still").attr("data-still", stillUrl).attr("data-animate", animateUrl);

          //


          // Appending the paragraph and bandImage to the "gifDiv" div
          gifDiv.append(p);
          gifDiv.append(stillBandImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);

        }
      }
    });
})

// Function to pause/unpause gifs
$(document).on("click", ".bandImage", function() {

    var state = $(this).attr("data-state"); 

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }

});