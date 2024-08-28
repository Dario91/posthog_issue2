import posthog from "posthog-js";
import {POSTHOG_ENDPOINT, POSTHOG_KEY, USERID} from "./env";

console.log("Main: ident: ", posthog._isIdentified())
posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_ENDPOINT,
    autocapture: false,
    loaded: () => {
        setTimeout(main, 3000);
    },
});



function main(){
    console.log("Main: posthog main checklist: ", posthog.getFeatureFlag("ab-checklist"));

    posthog.identify(USERID, {
        "user-id": USERID
    });


    posthog.onFeatureFlags(function () {
        // feature flags should be available at this point
        // this is only being called once
        console.log("Main: Worker Posthog ff on loaded main: ", JSON.stringify(posthog.featureFlags.getFlagVariants()));
    });


    // simulating timout for async loading worker
    setTimeout(() => {
        console.log("Main: Loading worker")
        const w = new Worker("./worker.js");
    }, 3000)
}
