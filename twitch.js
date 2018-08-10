
$(document).ready(function() {
  console.log('Ready');

  let updateColorClass = function(buttonId) {
    let inactiveButtons = $(buttonId).siblings();
    let activeButton = $(buttonId);
    inactiveButtons.removeClass('active').addClass('inactive');
    activeButton.removeClass('inactive').addClass('active');
  };

  $('#all').click(function() {
    $('li').show();
    updateColorClass(this);
  });

  $('#online').click(function() {
    $('.grey').hide();
    $('.purple').show();
    updateColorClass(this);
  });

  $('#offline').click(function() {
    $('.purple').hide();
    $('.grey').show();
    updateColorClass(this);
  });

  let ul = $('#list');

  const USERS = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "ESL_SC2", "noobs2ninjas", "epicenter_ru"];

  USERS.forEach(function(user) {

    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + user +  '?callback=?',  function(data) {
      let url = data.url;
      let link = "href=" + url + ' ' + 'target="_blank"';
      console.log(data);
      console.log(link);

      $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',  function(data) {
        let streamActive = data.stream;
        if (streamActive === null) {
          let li = $('<li><a ' + link + '>' + user + '</br>' + 'Status - Offline</a></li>');
          li.addClass('grey');
          li.attr('href', link);
          ul.append(li);
        } else {
            let whatGame = data.stream.game;
            let status = data.stream.channel.status;
            let info = 'Game: ' + whatGame + '</br>' + 'Show: ' + status;
            let li = $('<li><a ' + link + '>' + user + '</br>' + 'Status - Online</br>' + info + '</a></li>');
            li.addClass('purple');
            ul.append(li);
            console.log(whatGame);
            console.log(status);
          }
        console.log(data);
      });
    });
  });
});
