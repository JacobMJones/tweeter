/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

function createTweetElement(tweet){

console.log(tweet);



let article = document.createElement('article');
let header = document.createElement('header');
let name = $('<p>').html(tweet.user.name).addClass('name');
let handle = $('<p>').html(tweet.user.handle).addClass('handle');
let divForText = $('<div/>').addClass('tweet-text').append('<p>').html(tweet.content.text);
let footer = document.createElement('footer');

let image = $('<img>').attr('src', tweet.user.avatars.small);
$(article).append(header); 
$(article).append(divForText);
$(header).append(image).append(name).append(handle);





$('.container').append(article);

}


let testObject = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  }

  $(document).ready(function () {
  createTweetElement(testObject);
  });