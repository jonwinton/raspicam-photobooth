var RaspiPhotoBooth = require('./lib/controllers/RaspiPhotoBooth'),
  _ = require('lodash')


var instance = undefined;

/**
 * Initialize the camera
 *
 * @return {Object}
 */
function init() {
  return module.exports.camera = instance = new RaspiPhotoBooth();
}

function getInstance() {
  return module.exports.camera;
}

/**
 * [still description]
 * @return {[type]} [description]
 */
function still() {
  instance.still();
}

module.exports.init = init;
module.exports.getInstance = getInstance;
module.exports.still = still;

