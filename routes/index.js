
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
  res.render('lot/ssq/ssq.html', { title: 'Express' });
};