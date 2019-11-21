var express = require('express');
var router = express.Router();
const request = require('request')
const API_URL = 'https://api.chucknorris.io/jokes/random'

const categories = ["animal", "career", "celebrity", 
                    "dev", "explicit", "fashion",
                    "food", "history", "money", "movie",
                    "music", "political", "religion",
                    "science", "sport", "travel"]

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { categories: categories , joke: 0});
});

router.post('/', function (req, res, next) {
  let category = (req.body.category === 'random') ? "" : 
  `?category=${req.body.category}`;
  request(API_URL+category, function (err, response, body) {
    body = JSON.parse(body);
    res.render('index', {
      categories: categories,
      joke:{
        category: (body.categories.length) ?
        (body.categories[0]) : "random", 
        j: body.value
      }
    });
  })
})


module.exports = router;



// { "categories": [], 
// "created_at": "2016-05-01 10:51:41.584544", 
// "icon_url": "https://assets.chucknorris.host/img/avatar/chuck-norris.png", 
// "id": "ufs7OGMYSaijieW--a3BKQ", "updated_at": "2016-05-01 10:51:41.584544", 
// "url": "https://api.chucknorris.io/jokes/ufs7OGMYSaijieW--a3BKQ", 
// "value": "Chuck Norris CAN handle the truth." }
