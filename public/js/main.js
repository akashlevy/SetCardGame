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
              selected.push([row, col]);
            }
          }
        }

        if (selected.length == 3) {
          if (board.desk.isSet(board.desk.grid[selected[0][0]][selected[0][1]],
          board.desk.grid[selected[1][0]][selected[1][1]],
          board.desk.grid[selected[2][0]][selected[2][1]])){
            console.log("SET!");
            // Cards disappear
            // Number of sets incremented
            // Wait 250ms
            // Add more cards
          }
          else {
            console.log("NO SET!");
            // Cards unselected
            // Number of sets decremented
          }

        }

        // Display selection
        // Check whether three selected
        // Check
    });
});
