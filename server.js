var gzippo = require('gzippo');
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get('/scrape', function(req, res) {
  url = 'http://buses.co.uk/travel/placesserved.aspx';

  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);

      var output = [];

      $('.serviceListTable .bgCol').each(function(i, element){
        var place = $(this);

        output.push(place.text());
      });

      res.send(output);
      //res.send(JSON.stringify(output, null, 4));

      // $(' ').filter(function() {
      //   var data = $(this);

      //   var test = data.children('.bgCol');

      //   res.send(test.text());

      //   //JSON.stringify(json, null, 4)
      // });
    }
  });
});

app.listen(process.env.PORT || 5000);