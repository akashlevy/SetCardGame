define(["ui", "board", "jquery"],
function(ui,   board,   $){
    "use strict";

    var status = "prepare";

    var nextTimer = 0;

    return {
        newGame: function(){
            // Start the timer
            clearTimeout(nextTimer);
            ui.hideWin();
            status = 'prepare';
            this.proceed();
        },
        next: function(){
            console.log(status, "next");
            if (status == 'confirming'){

            } else if (status == 'playing'){

            }
            status = ({
                'prepare': 'playing',
                'playing': 'playing',
                'end': 'prepare',
            })[status];
            var waitTime = {
                'playing': 100,
                'endRound': 900,
                'distribute': 300,
                'end': 900
            };
            var wait = waitTime[status] || 0;
            nextTimer = setTimeout(this.proceed.bind(this), wait);
        },
        proceed: function(){
            ({
                'prepare': function(){
                    ui.hideMessage();
                    ui.hideButton();
                    board.init();
                },
                'playing': function(){

                },
                'end': function(){

                }
            })[status].bind(this)();
        }
    };
});
