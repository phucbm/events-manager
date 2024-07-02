"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsManager = void 0;
/**
 * Events Manager v0.0.2
 * An util class to manage event with these features:
 * 1. Able to assign event via context.options or context.config
 * 2. Able to assign event via method on()
 * 3. Consistently fire an event with fire() method
 */
var utils_1 = require("./utils");
var EventsManager = /** @class */ (function () {
    function EventsManager(context, options) {
        if (context === void 0) { context = { options: {} }; }
        if (options === void 0) { options = { names: [] }; }
        this.context = context;
        this.options = __assign({ names: [] }, options);
        // list of event listeners
        this.eventsList = {};
    }
    // get event names
    EventsManager.prototype.eventNames = function () {
        return this.options.names || [];
    };
    /**
     * Fire an event
     * @param eventName
     * @param responseObj
     */
    EventsManager.prototype.fire = function (eventName, responseObj) {
        if (responseObj === void 0) { responseObj = {}; }
        if (!this.eventNames().includes(eventName)) {
            console.warn("Cannot fire unrecognized event \"".concat(eventName, "\""), this, responseObj);
            return;
        }
        var response = __assign({ instance: this.context, eventName: eventName }, responseObj);
        // check if event is assigned in context.options or context.config
        var contextOptions = this.context.config ? this.context.config : this.context.options;
        if (contextOptions) {
            var eventFromOption = contextOptions[eventName];
            if (typeof eventFromOption === 'function')
                eventFromOption(response);
        }
        // check if event is assigned via on() method
        var callbacks = this.eventsList[eventName];
        if (callbacks === null || callbacks === void 0 ? void 0 : callbacks.length) {
            callbacks.forEach(function (callback) {
                if (typeof callback === 'function')
                    callback(response);
            });
        }
    };
    /**
     * Add custom event listener
     */
    EventsManager.prototype.add = function (eventName, callback) {
        // validate event name
        eventName = (0, utils_1.getValidatedEventName)(eventName);
        // check if event name is recognized
        if (!this.eventNames().includes(eventName)) {
            console.warn("Cannot add unrecognized event \"".concat(eventName, "\". Allow:"), this.eventNames());
            return;
        }
        // add event listener
        if (!this.eventsList[eventName]) {
            this.eventsList[eventName] = [];
        }
        this.eventsList[eventName].push(callback);
    };
    return EventsManager;
}());
exports.EventsManager = EventsManager;
