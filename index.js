var request = require('request');
var _ = require('lodash');


/**
 *
 * @param options
 * @constructor
 */
var Hipchat = function (options) {

    /**
     * Private Area
     */
    var pvt = new function () {
        var self = this;
        self.defaults = {
            host  : 'https://api.hipchat.com',
            url   : '/v1/rooms/message?auth_token=[auth_token]',
            //data  : 'room_id=[room_id]&from=[from]&message=[message]&message_format=[format]&color=[color]&notify=[notify]',
            color : 'gray',
            format: 'html'
        };


       /**
        * Get HipChat host
        * @returns {*}
        */
        self.getHost = function(){
          return options.host || self.defaults.host; 
        };

        /**
         * Get Url
         * @param config
         * @returns {*}
         */
        self.getUrl = function (config) {
            return self.parse(self.getHost() + self.defaults.url, _.assign({}, options, config || {}));
        };

        /**
         * Get Data
         * @param config
         * @returns {*}
         */
        self.getData = function (config) {
            //return self.parse(self.defaults.data, _.assign({}, options, config || {}));
            return {
                room_id       : config.room_id,
                from          : config.from,
                message       : config.message,
                message_format: config.format,
                color         : config.color,
                notify        : config.notify
            };
        };

        /**
         * parse
         * @param str
         * @param vars
         * @returns {*}
         */
        self.parse = function (str, vars) {
            vars = ( typeof(vars) == 'object' && vars != null && !vars.hasOwnProperty('length')) ? vars : {};
            for (var idx in vars) {
                var r = new RegExp('\\[' + idx + '\\]', 'gi');
                str = str.replace(r, vars[idx]);
            }
            return str;
        };

    };

    /**
     * basic Notify function (low level access)
     * @param config
     */
    this.notify = function (config, cb) {
        var config = _.assign({}, pvt.defaults, options, config);

        if (typeof(cb) !== 'function') {
            cb = function () {
            };
        }

        var url = pvt.getUrl(config);
        var data = pvt.getData(config);

        request.post(url, {form: data}, cb);
    };

    /**
     * Slightly higher level access
     * @param message
     * @param settings
     * @param notify
     */
    this.message = function (message, settings, notify, cb) {
        if (typeof(settings) !== 'object') {
            settings = {};
        }

        settings.message = message;

        if (typeof(notify) !== 'undefined') {
            settings.notify = (!!notify) ? '1' : '0';
        }

        this.notify(settings, cb);
    };

    /**
     * Info message
     * @param message
     * @param notify
     */
    this.info = function (message, notify, cb) {
        this.message(message, {color: 'gray'}, notify, cb);
    };

    /**
     * Success message
     * @param message
     * @param notify
     */
    this.success = function (message, notify, cb) {
        this.message(message, {color: 'green'}, notify, cb);
    };

    /**
     * Warning message
     * @param message
     * @param notify
     */
    this.warn = function (message, notify, cb) {
        this.message(message, {color: 'yellow'}, notify, cb);
    };

    /**
     * Error message
     * @param message
     * @param notify
     */
    this.error = function (message, notify, cb) {
        this.message(message, {color: 'red'}, notify, cb);
    };
};

module.exports = Hipchat;
