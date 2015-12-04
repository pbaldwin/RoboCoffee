/**
 * Author: Patrick Baldwin
 * router.js
 * The world's second tiniest "router"
 * Adapted from Joakim Bengston's "A Javscript Router in 20 Lines"
 *     - http://joakimbeng.eu01.aws.af.cm/a-javascript-router-in-20-lines/
 */

var routes = {};

var routeController = function () {
  console.log('You ran', this.name);
};

/**
 * Create new route
 * @param  {String} path          The path for our new route.
 * @param  {Function} controller  Function that is called when we hit our route.
 * @return {undefined}
 */
var route = function(path, controller) {
  controller = controller || routeController;
  routes[path] = {
    controller: controller,
    name: path
  };
};

/**
 * Init function for router
 *       compares window location against stored routes
 * @return {undefined}
 */
var runRoute = function (path) {
  path = path || '/';

  var route = routes[path] || {};
  if (route.controller) {
    route.controller(path);
  }
};

exports.route = route;
exports.runRoute = runRoute;