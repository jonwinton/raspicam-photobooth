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
   * A placeholder for the child process
   * that will be running at any given time.
   * Stored globally so that we might reference
   * it at anytime.
   *
   * @type {Null|Object}
   */
  this.childProcess = null;

  /**
   * Options for images/gif creation
   *
   * @type {Object}
   */
  this.opts = {
    output: '/home/pi/Desktop/hello.jpg',
    preview: '0,0,400,400',
    timeout: 2000,
    quality: 50,
    width: 400,
    height: 400,
    thumb: 'none'
  };
};

// Alias prototype
var proto = RaspiPhotoBooth.prototype;

proto.gif = function () {
  //TODO: READ DOCS FOR `--thumb none`, reduces filesize
};


proto.still = function () {
  this.childProcess = spawn('raspistill', this.constructArgsArray());

  // Update state
  this.runningProcess = true;
  // Put listeners on the child process
  this.attachChildProcessListeners();
};

/**
 * [constructArgsArray description]
 * @return {[type]} [description]
 */
proto.constructArgsArray = function () {
  var args = [];

  _.forIn(this.opts, function (value, key) {
    args.push(`--${key}`);

    // Make sure flags aren't being pushed
    if (_.toString(value) !== 'true' && _.toString(value) !== 'false') {
      args.push(_.toString(value));
    }
  });

  return args;
};

/**
 * [attachChildProcessListeners description]
 * @return {[type]} [description]
 */
proto.attachChildProcessListeners = function () {
  var self = this;
  var dout, derr;

  this.childProcess.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
    dout = data;
  });

  this.childProcess.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
    derr = data;
  });

  this.childProcess.on('close', function (code) {
    console.log('closed with code', code);
    self.runningProcess = false;
    self.child_process = null;
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

