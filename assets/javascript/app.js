$(document).ready(function() {
	var gifArray = ["happy", "sad", "angry", "surprised", "despondent", "bored", "tired",
		"lonely", "scared", "cute", "excited"];


	function buttonCreator() {
		$('#buttonPlace').empty();

		for(var i = 0; i < gifArray.length; i++) {
			$('#buttonPlace').append("<button class='emotions' data-emotion=" + gifArray[i] + ">" + gifArray[i] + "</button>");
		}
	}

	function onClickEmotions() {
		var emo = $(this).attr('data-emotion');
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emo + "&api_key=dc6zaTOxFJmzC&limit=10";

		$('#gifPlace').empty();
		
		$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
			var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $('<div class="gif">')
                var rating = results[i].rating.toUpperCase();
                var ratingText = $('<p>').text("Rating: " + rating);
                var emoImage = $('<img src=' + results[i].images.fixed_height_still.url + ' data-still=' +
                	results[i].images.fixed_height_still.url + ' data-animate=' +
                	results[i].images.fixed_height.url + ' data-state="still" class="emoImage">');

                gifDiv.append(ratingText);
                gifDiv.append(emoImage);

                $('#gifPlace').prepend(gifDiv);
            }

		});
	}

	function addEmotion() {
		$('#addEmotion').on('click', function(){
			var typed = $('#emotion-input').val().trim();
			gifArray.push(typed);
			buttonCreator();
			return false;
		})
	}

	function imageMove() {
		var state = $(this).attr('data-state');

	    if(state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }
        else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
	}


	$(document).on('click', '.emotions', onClickEmotions);


	$(document).on('click', '.emoImage', imageMove);

	buttonCreator();
	addEmotion();
});