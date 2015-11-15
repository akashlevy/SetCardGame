require({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.0.3.min'
    }
},
        ["game", "jquery", "domBinding", "layout", "board"],
function(game,    $,        domBinding,   layout,   board){
    "use strict";

    $(document).ready(function() {
      $.ajaxSetup({ cache: true });
      $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
          appId: '624872480987210',
          version: 'v2.4'
        });
        $('#loginbutton,#feedbutton').removeAttr('disabled');
        FB.getLoginStatus(updateStatusCallback);
      });
    });

    layout.region = $('#game-region')[0];
    layout.adjust();

    domBinding.fragmentToDom($('#game-region')[0]);

    $(window).resize(function(){
        layout.adjust();
    });

    $('.newgame-but').on("click", function(){
        // Make cards invisible/visible
        // Pause the game here too
        // If playing, check with user
        game.newGame();
    });

    $('#pause-but').on("click", function(){
        // Make cards invisible/visible
        // Pause/unpause the game (switch the labeL)
        game.timer.s
    });

    // Event handler for clicking a card
    $('.card-img').on("click", function(){
        if ($(this).css("box-shadow") == 'rgb(255, 0, 0) 0px 0px 10px 10px') {
          $(this).css("box-shadow", '0px 0px 0px 0px #000');
        }
        else {
          $(this).css("box-shadow", '0px 0px 10px 10px #f00');
        }

        var selected = [];
        var $rows = $("#card-table").find("tr");
        for (var row = 0; row < 3; row++) {
          var $columns = $($rows[row]).find("td .card-img");
          for (var col = 0; col < 4; col++) {
            if ($($columns[col]).css("box-shadow") == 'rgb(255, 0, 0) 0px 0px 10px 10px') {
              selected.push([row, col, $($columns[col])]);
            }
          }
        }

        if (selected.length == 3) {
          if (board.isSet(board.grid[selected[0][0]][selected[0][1]],
          board.grid[selected[1][0]][selected[1][1]],
          board.grid[selected[2][0]][selected[2][1]])){
            // Number of sets incremented
            board.sets++;
            $("#set-count").html("Sets: " + board.sets);

            // Cards disappear
            for (var i = 0; i < 3; i++) {
              selected[i][2].css("visibility", "hidden");
            }

            // Add more cards
            do{
              for (var i = 0; i < 3; i++) {
                  var card = board.cards.pop();
                  board.grid[selected[i][0]][selected[i][1]] = card;
                  domBinding.updateCardDisplayDelay(card, selected[i][0], selected[i][1]);
                  }
            } while (board.cards.length > 0 && !board.hasSet());
            if (board.cards.length==0 && !board.hasSet()){
              game.end();
            }
          }
          else {
            // Cards become unselected
            var $rows = $("#card-table").find("tr");
            for (var row = 0; row < 3; row++) {
              var $columns = $($rows[row]).find("td .card-img");
              for (var col = 0; col < 4; col++) {
                $($columns[col]).css("box-shadow", 'rgb(0, 0, 0) 0px 0px 0px 0px');
              }
            }

            // Number of sets decremented
            board.sets--;
            $("#set-count").html("Sets: " + board.sets);
          }
        }
    });
});
