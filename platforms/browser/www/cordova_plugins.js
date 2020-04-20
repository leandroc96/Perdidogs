cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-background-fetch/www/BackgroundFetch.js",
        "id": "cordova-plugin-background-fetch.BackgroundFetch",
        "pluginId": "cordova-plugin-background-fetch",
        "clobbers": [
            "window.BackgroundFetch"
        ]
    },
    {
        "file": "plugins/cordova-background-geolocation-lt/www/BackgroundGeolocation.js",
        "id": "cordova-background-geolocation-lt.BackgroundGeolocation",
        "pluginId": "cordova-background-geolocation-lt",
        "clobbers": [
            "window.BackgroundGeolocation"
        ]
    },
    {
        "file": "plugins/cordova-background-geolocation-lt/www/API.js",
        "id": "cordova-background-geolocation-lt.API",
        "pluginId": "cordova-background-geolocation-lt"
    },
    {
        "file": "plugins/cordova-background-geolocation-lt/www/DeviceSettings.js",
        "id": "cordova-background-geolocation-lt.DeviceSettings",
        "pluginId": "cordova-background-geolocation-lt"
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/src/browser/CameraProxy.js",
        "id": "cordova-plugin-camera.CameraProxy",
        "pluginId": "cordova-plugin-camera",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-background-fetch": "5.5.0",
    "cordova-background-geolocation-lt": "3.2.0",
    "cordova-plugin-geolocation": "4.0.2",
    "cordova-plugin-camera": "4.1.0"
}
// BOTTOM OF METADATA
});