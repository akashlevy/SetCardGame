define(["Card", "jquery", "layout"],
function(Card,   $,        layout){
    var cards = [];

    for(var i = 0; i < 81; i++){
        cards.push(new Card(i));
    }

    return {
        cards: cards,
        init: function(){
            this.desk.init();
        },
        shuffleDeck: function(){
            for (var i = 80; i > 0; i--) {
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
                  row[j].push(cards.pop())
                }
                cards.push(row);
              }
            }
        }
    };
});
