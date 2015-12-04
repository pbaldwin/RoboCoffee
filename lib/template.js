var fs = require('fs');
var Handlebars = require('handlebars');

var options = {
  source: './templates/'
};

var templateHash = {};

var registerTemplate = function (name, source) {
  return templateHash[name] = Handlebars.compile(source);
};

var getTemplateSource = function (name) {
  return fs.readFileSync(options.source + name + '.hbs', 'utf8');
};

var lookupTemplate = function (name) {
  var template;

  if (templateHash[name]) {
    template = templateHash[name];
    console.log('precompiled template');
  } else {
    template = registerTemplate(name, getTemplateSource(name));
    console.log('new template');
  }

  return template;
};

var renderTemplate = function (name, context) {
  var template = lookupTemplate(name);

  return template(context);
};

module.exports = {
  register  : registerTemplate,
  getSource : getTemplateSource,
  lookup    : lookupTemplate,
  render    : renderTemplate
};