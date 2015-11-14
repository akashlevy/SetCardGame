define(["Card", "jquery", "layout"],
function(Card,   $,        layout){
    var cards = [];

    for(var i = 0; i < 81; i++){
        cards.push(new Card(i));
    }

    return {
        cards: cards,
        init: function(){
            this.shuffleDeck();
            this.desk.init();
        },
        shuffleDeck: function(){
            for (var i = 80; i >= 0; i--) {
                var j = Math.round(Math.random() * (i));
                var temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
            }
        },
        desk: {
            cards: [],
            selected: [],
            sets: 0,
            init: function(){
              for (var i = 0; i < 3; i++){
                var row = [];
                for (var j = 0; j < 4; j++){
                  row[j].push(cards.pop());
                  domBinding.updateCardDisplay(card, i, j);
                }
                this.cards.push(row);
              }
            },
            isSet: function(a, b, c) {
              // Holds parameters of set.
              // True corresponds to keeping the property the same,
              // and false corresponds to differing the property
              var same = {
                'shape' : true,
                'number' : true,
                'color' : true,
                'texture' : true
              };

              // Holds the values of card properties for easy access
              var values = {
                'shape' : [a.shape, b.shape, c.shape],
                'number' : [a.number, b.number, c.number],
                'color' : [a.color, b.color, c.color],
                'texture' : [a.texture, b.texture, c.texture]
              };

              // Tests each parameter
              for (prop in same) {
                // Is parameter matching same or different?
                same[prop] = values[prop][0] === values[prop][1];
                // If the sameness property differs between pairs of cards in set,
                // Then not a valid set
                if((values[prop][1] === values[prop][2]) !== same[prop]
                    || (values[prop][0] === values[prop][2]) !== same[prop]) {
                  console.log(values);
                  console.log(prop);
                  return false;
                }
              }
              return true;
            },
            hasSets: function() {
              var cards = this.cards;
              function k_combinations(set, k) {
              	var i, j, combs, head, tailcombs;

              	if (k > set.length || k <= 0) {
              		return [];
              	}

              	if (k == set.length) {
              		return [set];
              	}

              	if (k == 1) {
              		combs = [];
              		for (i = 0; i < set.length; i++) {
              			combs.push([set[i]]);
              		}
              		return combs;
              	}

              	// Assert {1 < k < set.length}

              	combs = [];
              	for (i = 0; i < set.length - k + 1; i++) {
              		head = set.slice(i, i+1);
              		tailcombs = k_combinations(set.slice(i + 1), k - 1);
              		for (j = 0; j < tailcombs.length; j++) {
              			combs.push(head.concat(tailcombs[j]));
              		}
              	}
              	return combs;
              };

              function sFact(num)
              {
                  var rval = 1;
                  for (var i = 2; i <= num; i++)
                      rval = rval * i;
                  return rval;
              }

              var combs = k_combinations(cards, sFact(cards.length)/sFact(cards.length - 3)/6);

              for (prop of combs) {
                if(this.isSet(combs[prop].map(function(e) {
                  return card[e];
                }))) {
                  return true;
                }
              }

              return false;
            }
        }
    };
});
