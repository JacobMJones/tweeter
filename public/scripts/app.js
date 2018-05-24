/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
 
  $('#tweet-form').submit(function (event) {
    event.preventDefault();
    let values = $(this).serialize()
    let tweetLength = values.length - 5;

    if (tweetLength === 0) {
      setMessage("Your tweet is empty");
      $('#.tweet-form').find('input').hide();
    } else if (tweetLength > 140) {
      setMessage("Your tweet is too long");
    } else {

      $.ajax('/tweets', {
        data: values,
        success: function () {
          console.log('post method worked')
        },
        error: function (err) {
          console.log('error in render', err)
        },
        method: 'POST'
      })
      loadTweets();
    }
    

  });

  function loadTweets() {
    $.ajax({
      dataType: "json",
      method: 'GET',
      url: '/tweets',
      success: function (returnedTweets) {
        renderTweets(returnedTweets)
      },
      error: function (err) {
        console.log('error in loads', err);
      }
    });
  }

  loadTweets();
});

function calculateTimeSincePost(tweet) {

}

function toggleComposeForm(){
 
  if($('.container').is(":visible")){
    $('.container').slideUp(100);
  }
  else{
    $('.container')
      .slideDown(100)
      .find('text_area')
      .focus()
    
  }

}
var setMessage = function (message) {
  let messageDiv = $('#flash-message-div');
  $(messageDiv).find('span#flash-message').html(message);
  $(messageDiv).show()
}



function createTweetElement(tweet) {
  //time not implemented
  calculatedDate = new Date(tweet.created_at).toLocaleDateString();
  calculateTimeSincePost(tweet);
  let article = $('<article/>)');

  let header = $('<header/>');
  let image = $('<img>').attr('src', tweet.user.avatars.small).addClass('avatar');
  let name = $('<p>').text(tweet.user.name).addClass('name');
  let handle = $('<p>').text(tweet.user.handle).addClass('handle');

  let divForText = $('<div/>').addClass('tweet-text').append('<p>').text(tweet.content.text);

  let footer = $('<footer>')
  let date = $('<p>').addClass("date").text(calculatedDate)
  let flagImage = $('<img>').attr('src', "images/flag.png").addClass('footer-icon')
  let retweetImage = $('<img>').attr('src', "images/retweet.png").addClass('footer-icon')
  let heartImage = $('<img>').attr('src', "images/heart.png").addClass('footer-icon')

  $(footer).append(date).append(flagImage).append(retweetImage).append(heartImage);
  $(article).append(header);
  $(article).append(divForText);
  $(header).append(image).append(name).append(handle);
  $(article).append(footer);

  return article;
}

function renderTweets(tweetArray) {
  for (var i = 0; i < tweetArray.length; i++) {
    var tweet = createTweetElement(tweetArray[i]);
    $('#tweet-list').prepend(tweet);
  }
}