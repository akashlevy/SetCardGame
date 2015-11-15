var sys = require('sys');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  sys.print("running");
});

app.get('/', routes.dashboard.index);
app.post('/*', function(request, response) {
  response.redirect('/');
});
