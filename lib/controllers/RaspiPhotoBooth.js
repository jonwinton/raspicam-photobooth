'use strict';

var defaultConfig = require('../config/defaults'),
  events = require('events'),
  spawn = require('child_process').spawn,
  fs = require('fs'),
  _ = require('lodash');

/**
 * [RaspiPhotoBooth description]
 */
var RaspiPhotoBooth = function (arg) {

  /**
   * State tracker for whether or not a
   * process is currently being run
   *
   * @type {Boolean}
   */
  this.runningProcess = false;

  /**
   * Options for images/gif creation
   *
   * @type {Object}
   */
  this.opts = defaultConfig;
};

// Alias prototype
var proto = RaspiPhotoBooth.prototype;

proto.gif = function() {
  //TODO: READ DOCS FOR `--thumb none`, reduces filesize
};

proto.still = function() {
  var cmd = spawn('raspistill', [
    '-f',
    '-o', '~/Desktop/hello.jpg'
  ]);

  cmd.on('close', function(code) {
    console.log('Exited with code: ', code);
  });
};

/**
 * Get a value from the configurable
 * options.
 *
 * @returns {String|Number}
 **/
proto.get = function (opt) {
  if (!this.opts[opt]) {
    throw new Error('Option does not exist:', opt);
  }

  return this.opts[opt];
};

/**
 * Set an option within the `this.opts` object.
 * Unrecognized options are not configurable.
 *
 * @param {String}
 * @param {String|Number}
 **/
proto.set = function (opt, value) {
  if (!this.opts[opt]) {
    throw new Error('Option is not configurable via this module:', opt);
  }

  this.opts[opt] = value;
};

module.exports = RaspiPhotoBooth;
