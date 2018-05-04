


//1. User Story: I can see whether Free Code Camp is currently streaming on Twitch.tv.
// 2. User Story: I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel. 
// 3. User Story: if a Twitch user is currently streaming, I can see additional details about what they are streaming.

// Notes:

// I can click a tab to display all channels
// I can click a tab to see all online channels
// I can click a tab to see all offline channels

// Requests: /users/user, channels/channel
// and /streams/stream

$(document).ready(function() {
  console.log('Ready');

  let ul = document.getElementById('list');
  let listIdNumber = 1;

  const USERS = ["OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "ESL_SC2", "noobs2ninjas", "epicenter_ru"];

  //const ACTION = ["channels/", "users/", "streams/"];

  USERS.forEach(function(user) {
    let li = $('').attr('id', listIdNumber);

    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + user +  '?callback=?',  function(data) {
      let linkHolder = document.createElement('a');
      let link = data.url;
      linkHolder.setAttribute('href', link);
      linkHolder.setAttribute('target', '_blank');
      //$(li).append(linkHolder);
      console.log(data);
      console.log(link);

      $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?',  function(data) {
          let streamActive = data.stream;
          if (streamActive === null) {
          li = $('<li>' + user + '</br>' + 'Status - Offline</li>');
          $(li).addClass('blue');
          $('ul').append(li);
          $(li).append(linkHolder);

        }
          if (streamActive !== null) {
            let whatGame = data.stream.game;
            let status = data.stream.channel.status;
            li = $('<li>' + user + '</br>' + 'Status - Online</br></li>');
            $(li).addClass('green');
            $('ul').append(li);
            let info = 'Game: ' + whatGame + '</br>' + 'Show: ' + status;
            $(li).append(info);
            $(li).append(linkHolder);
            console.log(whatGame);
            console.log(status);
          }
          console.log(data);
        });
        listIdNumber++;
      });
  });
});
