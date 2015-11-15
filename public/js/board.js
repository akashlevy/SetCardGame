define(["Card", "jquery", "layout", "domBinding"],
function(Card,   $,        layout,   domBinding){
    return {
        cards: [],
        grid: [],
        sets: 0,
        init: function(){
            // Initialize number of sets to 0
            this.sets = 0;
            $("#set-count").html("Sets: " + this.sets);

            // Add all 81 cards to the deck and shuffle
            this.cards = [];
            for(var i = 0; i < 81; i++){
                this.cards.push(new Card(i));
            }
            this.shuffleDeck();

            // Add 12 cards to the grid
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

            // If no sets, restart
            if (!this.hasSet()){
              this.init();
            }
        },
        shuffleDeck: function(){
            for (var i = 80; i >= 0; i--){
                var j = Math.round(Math.random() * (i));
                var temp = this.cards[i];
                this.cards[i] = this.cards[j];
                this.cards[j] = temp;
            }
        },
        isSet: function(a, b, c) {
          if (a === undefined || b === undefined || c === undefined) {
            return false;
          }
          // Holds the values of card properties for easy access
          var values = {
            'shape' : [a.shape, b.shape, c.shape],
            'number' : [a.number, b.number, c.number],
            'color' : [a.color, b.color, c.color],
            'texture' : [a.texture, b.texture, c.texture]
          }
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
        },
        hasSet: function() {
          var work_list = [] // List of cards in play
          for (var i = 0; i < this.grid.length; i++){
            for (var j = 0; j < this.grid[i].length; j++){
              work_list.push(this.grid[i][j]);
            }
          }
          for (var a = 0; a < work_list.length-2; a++){
            for (var b = a+1; b < work_list.length-1; b++){
              for (var c = b+1; c < work_list.length; c++){
                if (this.isSet(work_list[a],work_list[b],work_list[c])){
                  return true;
                }
              }
            }
          }
          return false;
        }
    };
});
