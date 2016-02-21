// CONSTANTS
var COLOR_TO_HUE_VALUE = new Map();
COLOR_TO_HUE_VALUE.set("red", 0);
COLOR_TO_HUE_VALUE.set("yellow", 12750);
COLOR_TO_HUE_VALUE.set("green", 25500);
COLOR_TO_HUE_VALUE.set("blue", 46920);
COLOR_TO_HUE_VALUE.set(null, 46920);

var ANALYSIS_TO_COLOR = new Map();
ANALYSIS_TO_COLOR.set("POSITIVE", "green");
ANALYSIS_TO_COLOR.set("NEGATIVE", "red");
ANALYSIS_TO_COLOR.set("NEUTRAL", "yellow");

var DEFAULT_LAMP_STATE = {
    "on": true,
    "bri": 254,
    "hue": 46920,   // BLUE
    "sat": 254,
    "alert": "select",
    "transitiontime": 10
};

var lampStateMapper = function(analysis) {
    lampState = {};

    if(analysis === "DEFAULT") {
        return DEFAULT_LAMP_STATE;
    }

    lampState.hue = COLOR_TO_HUE_VALUE.get(ANALYSIS_TO_COLOR.get(analysis));
    return lampState;
};

exports = module.exports = lampStateMapper;




