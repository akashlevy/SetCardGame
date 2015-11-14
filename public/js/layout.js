define(function(){
    return {
        width: 500,
        height: 500,
        cardSep: 30,
        cardHeight: 80,
        cardWidth: 123,
        rowMargin: 10,
        boardHeight: 55,
        boardWidth: 250,
        region: null,
        adjust: function(){
            if(!this.region) return;
            this.width = this.region.offsetWidth;
            this.height = this.region.offsetHeight;
        }
    };
});
