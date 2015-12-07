var RoboCoffee = require('./RoboCoffee');

var robocoffee = new RoboCoffee();

robocoffee.route('/', 'index');

robocoffee.route('/foo');

robocoffee.route('/bar', null, 'alternate');

function run(route) {
  robocoffee.runRoute(route);
}

['/', '/foo', '/bar'].forEach(run);