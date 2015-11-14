define(["domBinding"],
function(domBinding){
    "use strict";

    var numbers = ['one', 'two', 'three'];
    var colors = ['red', 'green', 'purple'];
    var textures = ['solid', 'striped', 'clear'];
    var shapes = ['diamond', 'round', 'squiggle'];

    var Card = function(id){
        this.id = id + 1;
        this.number = id % 3;
        this.color = (id % 9)/3;
        this.texture = (id % 27)/9;
     };

    return Card;
});
