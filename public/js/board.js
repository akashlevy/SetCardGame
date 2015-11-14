define(["Card", "jquery", "layout"],
function(Card,   $,        layout){
    var cards = [];

    for(var i = 0; i < 81; i++){
        cards.push(new Card(i));
    }

    return {
        cards: cards,
        init: function(){
            this.desk.cards.length = 0;
            this.desk.players.length = 0;
            var self = this;
            this.cards.forEach(function(c){
                c.parent = self;
                c.display.setSelectable(false);
            });
        },
        shuffleDeck: function(){
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
            }
        },
        desk: {
            cards: [],
            sets: 0,
            init: function(){
              for var(i = 0; i < 3; i++){
                var row = [];
                for var(j = 0; j < 4; j++){
                  row[j].push(card)
                }
                cards.push(row);
              }
            }
            getPosFor: function(ind){
                var pos = {
                    x: 0,
                    y: layout.cardHeight / 2 + layout.cardWidth / 2,
                    z: ind + 52,
                    rotateY: 0
                };
                pos.rotation = this.cards[ind].pos.rotation;
                return pos;
            },
            addCard: function(card, player){
                card.ind = this.cards.length;
                this.cards.push(card);
                this.players.push(player);
                card.parent = this;
            },
            adjustPos: function(){
                this.cards.forEach(function(c){
                    c.adjustPos();
                });
            },
            score: function(){
                var max = 0;
                for(var i = 1; i < 4; i++){
                    if(this.cards[i].suit === this.cards[max].suit && (this.cards[i].num > this.cards[max].num)){
                        max = i;
                    }
                }
                var p = this.players[max],
                    self = this;
                var nextTime = 600,
                    time = 800;
                if(window.isDebug){
                    nextTime = 0;
                    time = 0;
                }
                var info = [this.players[max], [].concat(this.cards)];
                this.players.length = 0;
                this.cards.length = 0;

                return info;
            }
        }
    };
});
