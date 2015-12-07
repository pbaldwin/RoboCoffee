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

var readFile = function (name) {
  var self = this;

  if (name.indexOf('/') === 0) {
    name.slice(0, 1);
  }

  fs.readFile(options.content + '/' + name +'.md', 'utf8', function (err, data) {
    if (data) {
      var page = template.render(self.retrieve('defaultTemplate'), { content : marked(data) } );
      writeFile(name + '.html', page);
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

  this.assign('defaultTemplate', 'default');
  this.assign('defaultController', readFile);
};

RoboCoffee.prototype.assign = function (key, value) {
  properties = properties || {};

  properties[key] = value;
};

RoboCoffee.prototype.retrieve = function (key) {
  properties = properties || {};

  return properties[key];
};

RoboCoffee.prototype.route = function (route, controller) {
  controller = controller || this.retrieve('defaultController');

  var self = this;

  var c = function (path) {
    controller.call(self, path);
  }

  router.route(route, c);
};

RoboCoffee.prototype.runRoute = function (route) {
  router.runRoute(route);
};

module.exports = RoboCoffee;
