require({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.0.3.min'
    }
},
        ["game", "jquery", "domBinding", "layout", "board"],
function(game,    $,        domBinding,   layout,   board){
    "use strict";

    layout.region = $('#game-region')[0];
    layout.adjust();

    domBinding.fragmentToDom($('#game-region')[0]);

    $(window).resize(function(){
        layout.adjust();
    });

    $('.newgame-but').on("click", function(){
        // Pause the game here too
        // Unless first time
        if(confirm("This will end the current game. Are you sure?")){
            game.newGame();
        }
    });
    $('#pause-but').on("click", function(){
        // Pause the game
    });

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
            // Display SET! on console
            console.log("SET!");

            // Number of sets incremented
            board.sets++;
            $("#set-count").html("Sets: " + board.sets);

            // Cards disappear for 250ms
            for (var i = 0; i < 3; i++) {
              selected[i][2].css("visibility", "hidden");
            }

            // Wait 500ms
            setTimeout(function(){
              // Add more cards
              for (var i = 0; i < 3; i++) {
                var card = board.cards.pop();
                board.grid[selected[i][0]][selected[i][1]] = card;
                domBinding.updateCardDisplay(card, selected[i][0], selected[i][1]);
              }
            }, 500);

            // Make sure there is a set
          }
          else {
            console.log("NO SET!");

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

        // Display selection
        // Check whether three selected
        // Check
    });
});
