define(["Card", "jquery", "layout", "domBinding"],
function(Card,   $,        layout,   domBinding){
    return {
        cards: [],
        grid: [],
        sets: 0,
        init: function(){
            this.sets = 0;
            this.cards = [];
            for(var i = 0; i < 81; i++){
                this.cards.push(new Card(i));
            }
            this.shuffleDeck();
            this.grid = [];
            for (var i = 0; i < 3; i++){
              var row = [];
              for (var j = 0; j < 4; j++){
                var card = this.cards.pop();
                row.push(card);
                domBinding.updateCardDisplay(card, i, j);
              }
              this.grid.push(row);
            }
        },
        shuffleDeck: function(){
            for (var i = 80; i >= 0; i--) {
                var j = Math.round(Math.random() * (i));
                var temp = this.cards[i];
                this.cards[i] = this.cards[j];
                this.cards[j] = temp;
            }
        },
        isSet: function(a, b, c) {
          // Holds the values of card properties for easy access
          var values = {
            'shape' : [a.shape, b.shape, c.shape],
            'number' : [a.number, b.number, c.number],
            'color' : [a.color, b.color, c.color],
            'texture' : [a.texture, b.texture, c.texture]
          };

          // Tests each parameter
          for (prop in values) {
            if (!(values[prop][0] == values[prop][1] && values[prop][2] == values[prop][1]) &&
               (!(values[prop][0] != values[prop][1] &&
                  values[prop][1] != values[prop][2] &&
                  values[prop][2] != values[prop][0]))) {
                    return false;
            }
          }
          return true;
        }
    };
});
