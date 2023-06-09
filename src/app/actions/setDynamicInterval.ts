import { globals } from "../../sharedGlobals";

export function setDynamicInterval(func : Function) {
    var internalCallback = function() {
        func();
        let delay: number = globals.delay;
        window.setTimeout(internalCallback, delay);

    }

    internalCallback();
}