$(document).ready(function() {
	//Array to hold different emotions for the buttons
	var gifArray = ["happy", "sad", "angry", "surprised", "despondent", "bored", "tired",
		"lonely", "scared", "cute", "excited"];

	//Creates the buttons at the top of the page
	function buttonCreator() {
		//Clears the div buttonPlace so that it can reload all of the array
		$('#buttonPlace').empty();

		//Iterates through the gifArray and makes a button for each element in the array
		for(var i = 0; i < gifArray.length; i++) {
			$('#buttonPlace').append("<button class='emotions' data-emotion=" + gifArray[i] + ">" + gifArray[i] + "</button>");
		}
	}

	//What happens when you click on the emotion buttons
	function onClickEmotions() {
		//Gets the value of the data-emotion from the button that was clicked
		var emo = $(this).attr('data-emotion');
		//Configures the URL needed to access the correct Giphy JSON
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emo + "&api_key=dc6zaTOxFJmzC&limit=10";

		//Clears the gifs already present so they don't stack
		$('#gifPlace').empty();
		
		//Ajax call to get the information from the Giphy JSON
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			//Stores the data instead of meta for easier access to the right portion of the JSON
			var results = response.data;

			//Iterates through the results
            for (var i = 0; i < results.length; i++) {
            	//Creates a div for each gif in the results
                var gifDiv = $('<div class="gif">')

                //Capitalizes the rating and sets it to N/A if there is no rating
                var rating = results[i].rating.toUpperCase();
                if(rating == "") {
                	rating = "N/A";
                }

                //Creates the visual of the rating and gifs, including the animate and still images
                var ratingText = $('<p>').text("Rating: " + rating);
                var emoImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                	results[i].images.fixed_height_still.url + ' data-animate=' +
                	results[i].images.fixed_height.url + ' data-state="still" class="emoImage">');

                //Appends the visuals to gifDiv
                gifDiv.append(ratingText);
                gifDiv.append(emoImage);

                //Appends each gif to gifPlace
                $('#gifPlace').append(gifDiv);
            }
            //Due to user feedback, added a description of what to do for clarity
            $('#gifPlace').append('<div class="text-center">[Click the images to animate them]</div>');
		});
	}

	//How you add an emotion button
	function addEmotion() {
		$('#addEmotion').on('click', function(){
			//Gets the value in the text input field
			var typed = $('#emotion-input').val().trim();
			//Adds it to the array of emotions
			gifArray.push(typed);
			//Recreates the buttons
			buttonCreator();
			//Returns false so it does not continue to another page
			return false;
		})
	}

	//Enables the user to click the images to have them pause or move
	function imageMove() {
		//Sets state to be the data in state for the images
		var state = $(this).attr('data-state');

		//Switches the source to the animate/still state depending on what it is currently at
	    if(state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	}

	//Runs the onClickEmotions if the emotion buttons are clicked
	$(document).on('click', '.emotions', onClickEmotions);
	//Runs the imageMove function if the images are clicked
	$(document).on('click', '.emoImage', imageMove);

	//Sets up the buttons and form when the page loads
	buttonCreator();
	addEmotion();
});