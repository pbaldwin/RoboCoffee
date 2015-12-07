var RoboCoffee = require('./RoboCoffee');

var robocoffee = new RoboCoffee();

robocoffee.route('/', function () {
  var controller = this.retrieve('defaultController');
  controller.call(this, 'index');
});

robocoffee.route('/foo');

function run(route) {
  robocoffee.runRoute(route);
}

['/', '/foo'].forEach(run);