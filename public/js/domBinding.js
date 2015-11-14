define(function(){

    var frag;

    var CardDisplay = function(dom){
        this.dom = $(dom);
        this.dom.on("click", function(){
            this.onClick && this.onClick();
        }.bind(this));
    };

    var PlayerDisplay = function(id, name){
        this.id = id;
        this.display = document.createElement('div');
        this.display.className = 'info-board board-' + id;
        this.nametext = document.createElement('div');
        this.nametext.className = 'player-name';
        this.nametext.innerHTML = name;
        this.setstext = document.createElement('div');
        this.setstext.className = 'player-sets';
        this.setstext.innerHTML = 0;

        this.display.appendChild(this.nametext);
        this.display.appendChild(this.scoretext);

        frag.appendChild(this.display);

        this.rank = null;
    };

    PlayerDisplay.prototype.setName = function(name){
        this.nametext.innerHTML = name;
    };


    PlayerDisplay.prototype.setHuman = function(yes){
        if(yes){
            this.display.className += " human";
        }
    };

    PlayerDisplay.prototype.setHighlight = function(yes){
        if(yes){
            $(this.display).addClass("highlight");
        } else {
            $(this.display).removeClass("highlight");
        }
    };

    PlayerDisplay.prototype.adjustPos = function(){
        var d = $(this.display);
        if(this.rank === null){
            var adjust = this.finaltext.classList.contains("show") ? 55 : 0;
            this.finaltext.classList.remove('show');
            d.css({
                marginLeft: -d.width() / 2 + adjust,
                marginTop: -d.height() / 2,
                transform: "",
                top: "",
                left: ""
            }).removeClass("table");
        } else {
            this.finaltext.classList.add('show');
            d.css({
                top: this.moveUp ? "20%" : "50%",
                left: "50%",
                marginLeft: -d.width() / 2 - 55,
                marginTop: -d.height() / 2,
                transform: "translateY(" + ((1.2 * d.height()) * (this.rank - 2)) + "px)"
            }).addClass("table");
        }
    };

    PlayerDisplay.prototype.setScoreText = function(text){
        this.scoretext.innerHTML = text;
    };

    PlayerDisplay.prototype.setFinalText = function(text){
        this.finaltext.innerHTML = text;
    };

    PlayerDisplay.prototype.highlight = function(){
        var b = this.scoretext.classList;
        b.add('highlight');
        setTimeout(function(){
            b.remove('highlight');
        }, 100);
    };

    return {
        fragmentToDom: function(dom){
            if(frag){
                dom.appendChild(frag);
                frag = null;
            }
        },
        createCardDisplay: function(id){
            if(!frag){
                frag = document.createDocumentFragment();
            }
            var display = document.createElement('div');
            display.className = 'card';

            frag.appendChild(display);

            return new CardDisplay(display);
        }
    };
});
