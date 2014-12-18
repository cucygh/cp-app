
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('lot/ssq/ssq.html', { title: 'Express' });
};