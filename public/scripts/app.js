$(document).ready(function () {
  const EXTRA_CHARACTERS_ON_SERIALIZE = 5;
  const MAX_TWEET_LENGTH = 140;

  $('#tweet-form').submit(function (event) {
    event.preventDefault();
    let values = $(this).serialize()
    let tweetLength = values.length - EXTRA_CHARACTERS_ON_SERIALIZE;

    if (tweetLength === 0) {
      setMessage("Your tweet is empty");
      $('#.tweet-form').find('input').hide();
    } else if (tweetLength > MAX_TWEET_LENGTH) {
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

function calculateTimeSincePost(timeCreatedAt) {

  let now = new Date();
  let timePassed = now - timeCreatedAt;

  var days, hours, minutes, seconds;
  seconds = Math.floor(timePassed / 1000);
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  days = Math.floor(hours / 24);
  hours = hours % 24;

  let returnTimePassedString = "Posted ";
  if (days < 1) {
    if (seconds > 1) {
      returnTimePassedString += parseTime(days, 'day');
      returnTimePassedString += parseTime(hours, 'hour');
      returnTimePassedString += parseTime(minutes, 'minute');
      returnTimePassedString += parseTime(seconds, 'second');
    } else {
      returnTimePassedString += '1 second'
    }
  } else {
    returnTimePassedString += parseTime(days, 'day');
  }
  returnTimePassedString = returnTimePassedString.replace(/,\s*$/, "");
  returnTimePassedString += " ago."
  return returnTimePassedString;
};

function parseTime(value, name) {
  if (value >= 1 && value < 2) {
    return value + ' ' + name + ', ';
  } else if (value >= 2) {
    return value + ' ' + name + 's, ';
  }
  return '';
}

function toggleComposeForm() {
  const COMPOSE_BOX_ANIMATION_TIME = 100;
  if ($('.container').is(":visible")) {
    $('.container').slideUp(COMPOSE_BOX_ANIMATION_TIME);
  } else {
    $('.container')
      .slideDown(COMPOSE_BOX_ANIMATION_TIME)
      .find('.form_text_area')
      .focus()
  }
}

var setMessage = function (message) {
  let messageDiv = $('#flash-message-div');
  $(messageDiv).find('span#flash-message').html(message);
  $(messageDiv).show()
}

function createTweetElement(tweet) {

  // TODO Time not implemented
  calculatedDate = calculateTimeSincePost(tweet.created_at);
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

  $(header).append(image).append(name).append(handle);
  $(footer).append(date).append(flagImage).append(retweetImage).append(heartImage);
  $(article).append(header);
  $(article).append(divForText);
  $(article).append(footer);

  return article;
}

function renderTweets(tweetArray) {
  for (var i = 0; i < tweetArray.length; i++) {
    var tweet = createTweetElement(tweetArray[i]);
    $('#tweet-list').prepend(tweet);
  }
}