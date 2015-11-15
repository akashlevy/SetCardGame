define(function(){
    "use strict";

    var numbers = ['one', 'two', 'three'];
    var colors = ['red', 'purple', 'green'];
    var textures = ['solid', 'striped', 'clear'];
    var shapes = ['squiggle', 'diamond', 'round'];

    var Card = function(id){
        this.id = id + 1;
        this.number = id % 3;
        this.color = Math.floor((id % 9) / 3);
        this.shape = Math.floor((id % 27) / 9);
        this.texture = Math.floor(id / 27);
     };

    return Card;
});
