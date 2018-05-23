/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  renderTweets(data)
});

function calculateTimeSincePost(tweet) {

 // The number of milliseconds in one day
 var ONE_DAY = 1000 * 60 * 60 * 24

 // Convert both dates to milliseconds
 var date1_ms = tweet.created_at;
 var date2_ms = 0;
console.log(date2_ms, date1_ms);
 // Calculate the difference in milliseconds
 var difference_ms = Math.abs(date1_ms - date2_ms);

 console.log ("difference", Math.round(difference_ms/ONE_DAY));
 

}

function createTweetElement(tweet) {

calculatedDate = new Date(tweet.created_at).toLocaleDateString();
calculateTimeSincePost(tweet);
  let article = $('<article/>)');

  let header = $('<header/>');
  let image = $('<img>').attr('src', tweet.user.avatars.small).addClass('avatar');
  let name = $('<p>').html(tweet.user.name).addClass('name');
  let handle = $('<p>').html(tweet.user.handle).addClass('handle');

  let divForText = $('<div/>').addClass('tweet-text').append('<p>').html(tweet.content.text);

  let footer = $('<footer>')
  let date = $('<p>').addClass("date").html(calculatedDate)
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
    $('.container').append(tweet);
  }
}
//#region test tweet
const data = [{
    "user": {
      "name": "Newton",
      "avatars": {
        "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


//#endregion