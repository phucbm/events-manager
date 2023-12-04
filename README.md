# Events Manager

## Install

```shell
npm i @phucbm/events-manager
```

```js
import {EventsManager} from "@phucbm/events-manager";
```

In your plugin constructor

```js
// init events manager
this.events = new EventsManager(this, {
    names: ['onInit'] // register event names
});

// fire an event
this.events.fire('onInit', {source}); // the 2nd param is an object that will be passed to the callback
```

Create a method to assign late-events

```js
/**
 * Assign late-events
 */
function on(eventName, callback){
    this.events.add(eventName, callback);
}
```

## Use

```js
// add event from init
const instance = Plugin.init({
    onInit: data => {
        console.log('init', data)
    }
});

// add via method after init
instance.on('onInit', data => {
    console.log('init', data)
});

// with or without keyword on before the event name are all acceptable
instance.on('init', data => {
    console.log('init', data)
});
```