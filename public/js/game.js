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
                currentPlay = board.cards[26].parent.playedBy.id;
                played = 0;
            } else if (status == 'playing'){
                currentPlay = (currentPlay + 1) % 4;
                played++;
            }
            if(played == 4){
                status = 'endRound';
                played = 0;
            } else if (status == 'endRound' && players[0].row.cards.length === 0){
                status = 'end';
            } else {
                status = ({
                    'prepare': 'playing',
                    'playing': 'playing',
                    'end': 'prepare',
                })[status];
            }
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
