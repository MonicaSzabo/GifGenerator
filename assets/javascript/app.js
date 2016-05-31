$(document).ready(function() {
	var gifArray = ["happy", "sad", "ambivalent", "angry", "surprised",];


	function buttonCreator() {
		for(var i = 0; i < gifArray.length; i++) {
			$('#buttonPlace').append("<button class='emotions' data-emotion=" + gifArray[i] + ">" + gifArray[i] + "</button>");
		}
	}

	function onClickEmotions() {
		$(".emotions").on('click', function() {
			var emo = $(this).data('emotion');
			//var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + emo + "&limit=10";

			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + emo + "&api_key=dc6zaTOxFJmzC&limit=10";
			
			$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
				var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    if(results[i].rating == "r") {

                    }
                    else {
                        var gifDiv = $('<div class="gif">')
                        var ratingText = $('<p>').text("Rating: " + results[i].rating);
                        var emoImage = $('<img src=' + results[i].images.fixed_height.url + '>');

                        gifDiv.append(ratingText);
                        gifDiv.append(emoImage);

                        $('#gifPlace').prepend(gifDiv);
                    }
                }
			});
		});
	}

	function addEmotion() {
		$('#addEmotion').on('click', function(){
			var typed = $('#emotion-input').val().trim();

			gifArray.push(typed);

			$('#buttonPlace').empty();
			buttonCreator();
			return false;
		})		
	}

	buttonCreator();
	onClickEmotions();
	addEmotion();

});