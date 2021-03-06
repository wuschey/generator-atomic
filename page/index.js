'use strict';
var util = require('util');
var path = require('path');
var s = require("underscore.string");
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.argument('modulename', { type: String, required: false });
  this.argument('description', { type: String, required: false });
  this.pkg = require('../package.json');
};

util.inherits(Generator, yeoman.generators.Base);



Generator.prototype.promptConfig = function promptConfig() {
  var cb = this.async(),
    welcomeMsg = 'generator-atomic:page version: ' + this.pkg.version,
    prompts;

  console.log(welcomeMsg);

  prompts = [
    {
      name: 'modulename',
      message: 'Name this page'
    },
    {
      name: 'description',
      message: 'Describe this page'
    },
    {
      name: 'author',
      message: 'Whats your name? (the author)',
      store: true
    }
  ];

  if(this.modulename) {
    prompts = [];
  }

  this.prompt(prompts, function(props) {
    this.modulename = props.modulename || this.modulename;
    this.author = props.author || this.config.get('author');
    this.description = props.description || this.description || 'Page description here';

    this.appname   = this.config.get('appname');
    this.projectName = this.config.get('projectName');
    this.namespace = this.config.get('namespace');
    this.modulenameCamelized = s.camelize(this.modulename);

    this.config.set('author', this.author);

    this.config.save();

    cb();
  }.bind(this));
};

Generator.prototype.sourceFiles = function sourceFiles() {

  this.copy('module.jade', 'app/5_pages/'+ this.modulenameCamelized +'/'+ this.modulenameCamelized +'.jade');
  this.copy('module.spec', 'app/5_pages/'+ this.modulenameCamelized +'/'+ this.modulenameCamelized +'.spec');
  this.copy('module.yaml', 'app/5_pages/'+ this.modulenameCamelized +'/'+ this.modulenameCamelized +'.yaml');

};

Generator.prototype.install = function() {
  if (this.options['skip-install']) {
    return;
  }
  this.spawnCommand('grunt', ['injector']);

};
