// CONSTANTS
var HUE_BRIDGE_IP       = "<YOUR_HUE_BRIDGE_IP>";
var HUE_USERNAME        = "<YOUR_HUE_BRIDGE_USERNAME>";
var HUE_LAMP_ID         = 1;

var logger = require('./logger.js');
var hue = require('node-hue-api');

var hueApi = new hue.HueApi(HUE_BRIDGE_IP, HUE_USERNAME);

var signalHue = function(lampState) {
    hueApi.setLightState(HUE_LAMP_ID, lampState)
        .then(function(result) {
            logger.info("Applied lampState " + JSON.stringify(lampState) + " to lamp " + HUE_LAMP_ID);
        })
        .fail(function(error) {
            logger.error("Unable to apply lampState " + JSON.stringify(lampState) + " to lamp " + HUE_LAMP_ID + ". Error = " + error);
        })
        .done();
};

exports = module.exports = signalHue;


