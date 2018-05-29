
$(document).ready(function() {
  console.log('Ready');

  // Update the css color class on the active and inactive buttons
  let updateButtonColorClass = function(buttonId) {
    let activeButton = $(buttonId);
    let inactiveButtons = $(buttonId).siblings();
    activeButton.removeClass('inactive').addClass('active');
    inactiveButtons.removeClass('active').addClass('inactive');
  };

  // Buttons to display 'all', 'online' and 'offline'
  // channels respectively, and update the button colors
  $('#all').click(function() {
    $('li').show();
    updateButtonColorClass(this);
  });

  $('#online').click(function() {
    $('.grey').hide();
    $('.purple').show();
    updateButtonColorClass(this);
  });

  $('#offline').click(function() {
    $('.purple').hide();
    $('.grey').show();
    updateButtonColorClass(this);
  });

  let ul = $('#list');

  const USERS = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "ESL_SC2", "noobs2ninjas", "epicenter_ru"];

  USERS.forEach(function(user) {

    // Request to get the url for the current user going through the forEach
    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + user +  '?callback=?',  function(data1) {
      let url = data1.url;
      let link = "href=" + url + ' ' + 'target="_blank"';

      // Request to get stream status for current user
      $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',  function(data2) {
        let streamActive = data2.stream;

        // If the stream is active, get additional info on which show and what game is streaming
        if (streamActive) {
          let whatGame = data2.stream.game;
          let status = data2.stream.channel.status;
          let info = 'Game: ' + whatGame + '</br>' + 'Show: ' + status;

          // Create an 'activeListItem' with color class 'purple' and append to the ul
          let activeListItem = $('<li><a ' + link + '>' + user + '</br>' + 'Status - Online</br>' + info + '</a></li>');
          activeListItem.addClass('purple');
          ul.append(activeListItem);
        } else {
          // If stream is inactive, create 'inactiveListItem' with color class 'grey' and append to ul
            let inactiveListItem = $('<li><a ' + link + '>' + user + '</br>' + 'Status - Offline</a></li>');
            inactiveListItem.addClass('grey');
            ul.append(inactiveListItem);
          }
      });
    });
  });
});
