const express = require("express");
const axios = require('axios')
const app = express();

//register view engine
app.set('view engine', 'ejs');
//
//listen for request
app.listen(process.env.PORT || 3000);
//
app.get('/', async (req, res) => {

  const results = await axios('https://disease.sh/v3/covid-19/all')
  console.log(results.data)


  res.render('index', {
    totalCases : results.data.cases,
    recovered: results.data.recovered,
    todayCases : results.data.todayCases,
    todayRecovered: results.data.todayRecovered,
    totalDeaths : results.data.deaths,
    todayDeaths : results.data.todayDeaths,
    active : results.data.active,
    critical : results.data.critical
  });
});
//
app.get('/about', (req, res) => {
  res.render('about');
});
//
app.get('/contact', (req,res) => {
  res.render('contact');
});
//
app.use((req, res) => {
  res.status(404).render('404');
});
