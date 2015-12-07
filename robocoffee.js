'use strict';

/**
 * Vendor Dependencies
 */
var _ = require('lodash');
var fs = require('fs');
var marked = require('marked');

/**
 * Lib dependencies
 */
var router = require('./lib/router');
var template = require('./lib/template');


var properties = {};
var options = {};


var writeFile = function (fileName, page) {
  fs.writeFile(options.dist + '/' + fileName, page, function (err) {
    if (err) throw err;
    console.log('Wrote ' + fileName);
  });
}

var readFile = function (dataPath, templatePath) {
  var self = this;

  fs.readFile(options.content + '/' + dataPath +'.md', 'utf8', function (err, data) {
    if (data) {
      var page = template.render(templatePath, { content : marked(data) } );
      writeFile(dataPath + '.html', page);
    }
  });
};


/**
 * RoboCoffee Constructor
 */
var RoboCoffee = function (opts) {
  var defaults = {
    content: './content',
    templates: './templates',
    dist: './dist'
  };

  options = _.assign(defaults, opts);

  this.register('defaultTemplate', 'default');
  this.register('defaultController', readFile);
};

/**
 * Register property with RoboCoffee property hash.
 * @param  {string} key   Lookup key.
 * @param  {any} value Property to store. Can be any valid JavaScript type.
 * @return {undefined}
 */
RoboCoffee.prototype.register = function (key, value) {
  properties = properties || {};

  properties[key] = value;
};

/**
 * Retrieve property from RoboCoffee property hash.
 * @param  {String} key Lookup key.
 * @return {any} Returns stored property. Can be any valid JavaScript type.
 */
RoboCoffee.prototype.retrieve = function (key) {
  properties = properties || {};

  return properties[key];
};

/**
 * Registers Route
 * @param  {String} route      [Route]
 * @param  {Function} controller [Controller function for route.]
 * @param  {String} controller [Path to data file for route. (default is route)]
 * @param  {String} template   [path to template that controller should render]
 * @return {[type]}            [description]
 */
RoboCoffee.prototype.route = function (route, controller, templatePath) {

  var self = this;

  var dataPath;

  if (typeof controller == 'string') {
    dataPath = controller;
    controller = this.retrieve('defaultController');
  } else {
    dataPath = route.indexOf('/') === 0 ? route.slice(1) : route;
    controller = controller || this.retrieve('defaultController');
  }

  templatePath = templatePath || this.retrieve('defaultTemplate');

  // Make sure the controller function is called with 'robocoffee' as context;
  var c = function (route) {
    controller.call(self, dataPath, templatePath);
  }

  router.route(route, c);
};

/**
 * Wraps router.runroute()
 * @param  {string} route Lookup key for router.
 * @return {undefined}
 */
RoboCoffee.prototype.runRoute = function (route) {
  router.runRoute(route);
};

module.exports = RoboCoffee;
