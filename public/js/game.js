define(["jquery", "board", "Stopwatch"],
function($,        board,   Stopwatch){
    "use strict";

    return {
        paused: false,
        timer: new Stopwatch($("#timer")),
        newGame: function(){
            // Enable clicks

            // Start the timer
            this.timer.reset();
            this.timer.start();

            // Reset the board
            board.init();
        },
        end: function(){
            // Stop the timer
            this.timer.stop();

            // Disable clicks
        }
    };
});
