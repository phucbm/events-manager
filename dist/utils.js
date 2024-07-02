"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidatedEventName = void 0;
/**
 * Get validated event name
 * make sure event name always has "on" at the beginning
 * @param name
 * @returns {string}
 */
function getValidatedEventName(name) {
    var newName = name;
    // make sure event name always has "on" at the beginning
    if (name.slice(0, 2) !== 'on') {
        newName = newName.charAt(0).toUpperCase() + newName.slice(1);
        newName = "on" + newName;
    }
    return newName;
}
exports.getValidatedEventName = getValidatedEventName;
