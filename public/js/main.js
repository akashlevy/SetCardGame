require({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-2.0.3.min'
    }
},
        ["game", "jquery", "domBinding", "layout"],
function(game,    $,        domBinding,   layout){
    "use strict";

    layout.region = $('#game-region')[0];
    layout.adjust();

    domBinding.fragmentToDom($('#game-region')[0]);
    game.adjustLayout();

    $(window).resize(function(){
        layout.adjust();
        game.adjustLayout();
    });

    $('.newgame-but').on("click", function(){
        // Pause the game
        if(confirm("This will end the current game. Are you sure?")){
            game.newGame();
        }
    });
    $('#pause-but').on("click", function(){
        // Pause the game
    });
});
