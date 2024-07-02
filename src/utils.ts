/**
 * Get validated event name
 * make sure event name always has "on" at the beginning
 * @param name
 * @returns {string}
 */
export function getValidatedEventName(name: string): string {
    let newName = name;

    // make sure event name always has "on" at the beginning
    if (name.slice(0, 2) !== 'on') {
        newName = newName.charAt(0).toUpperCase() + newName.slice(1);
        newName = "on" + newName;
    }

    return newName;
}
