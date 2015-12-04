var RoboCoffee = require('./RoboCoffee');

var robocoffee = new RoboCoffee();

robocoffee.route('/', function () {
  var controller = robocoffee.get('defaultController');
  controller.call(robocoffee, 'index');
});

robocoffee.route('/foo');

function run(route) {
  robocoffee.runRoute(route);
}

['/', '/foo'].forEach(run);