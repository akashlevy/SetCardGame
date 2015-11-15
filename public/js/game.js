define(["ui", "board", "jquery", "Stopwatch"],
function(ui,   board,   $,        Stopwatch){
    "use strict";

    return {
        paused: false,
        timer: new Stopwatch($("#timer")),
        newGame: function(){
            // Start the timer
            this.timer.reset();
            this.timer.start();

            // Hide the message window
            ui.hideWin();
            ui.hideMessage();
            ui.hideButton();

            // Reset the board
            board.init();
        },
        end: function(){
            // Stop the timer
            timer.stop();

            // Show the message window
            ui.showWin();
            ui.showMessage();
            ui.showButton();
        }
    };
});
