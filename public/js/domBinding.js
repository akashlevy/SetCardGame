define(function(){

    var frag;

    return {
        fragmentToDom: function(dom){
            if(frag){
                dom.appendChild(frag);
                frag = null;
            }
        },
        updateCardDisplay: function(card, i, j){
          var $rows = $("#card-table").find("tr");
          for (var row = 0; row < 3; row++) {
            var $columns = $($rows[i]).find("td img");
            $($columns[j]).attr("src", "img/" + card.id + ".gif");
            $($columns[j]).css("box-shadow", "rgb(0, 0, 0) 0px 0px 0px 0px");
            $($columns[j]).css("visibility", "visible");
          }
        },
        updateCardDisplayDelay: function(card, i, j){
            var $rows = $("#card-table").find("tr");
            for (var row = 0; row < 3; row++) {
              var $columns = $($rows[i]).find("td img");
              $($columns[j]).css("box-shadow", "rgb(0, 0, 0) 0px 0px 0px 0px");
              if (card !== undefined) {
                $($columns[j]).attr("src", "img/" + card.id + ".gif");

                // Wait 500ms to make visible
                setTimeout(function(){$($columns[j]).css("visibility", "visible");}, 500);
              }
            }
        }
    };
});
