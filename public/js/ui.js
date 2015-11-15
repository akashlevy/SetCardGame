define(function(){
    "use strict";

    var playing = false,
        button = document.createElement('button'),
        message = document.createElement('div'),
        endMessage = document.createElement("div");

    button.id = 'play-button';
    message.id = 'game-message';
    endMessage.id = "end-message";

    document.body.appendChild(button);
    document.body.appendChild(message);
    document.body.appendChild(endMessage);

    return {
        clearEvents: function(){
            $(button).off("click");
            $(arrow).off("click");
        },
        showButton: function(text){
            button.innerHTML = text;
            button.classList.add('show');
        },
        hideButton: function(text){
            button.classList.remove('show');
        },
        buttonClickOnce: function(cb){
            $(button).on("click", function(){
                cb();
                $(this).off("click");
            });
        },
        showWin: function(won){
            endMessage.innerHTML = "Sets";
            endMessage.classList.add("show");
        },
        hideWin: function(){
            endMessage.classList.remove("show");
        },
        showMessage: function(msg){
            message.innerHTML = msg;
            message.style.display = 'block';
        },
        hideMessage: function(){
            message.style.display = '';
        }
    };
});
