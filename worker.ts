import posthog from "posthog-js";
import {POSTHOG_ENDPOINT, POSTHOG_KEY, USERID} from "./env";

posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_ENDPOINT,
    autocapture: false,
    loaded: () => {
        // if I execute the main function from here. I get at least the correct values for the ff ab-checklist
        // main()
    }
});

// if I execute the main from here, I get wrong values for the ff ab-checklist
main();


function main(){
    console.log("Worker: Start Main: ", posthog.featureFlags.getFlagVariants());
    console.log("Worker: posthog checklist: ", posthog.featureFlags.getFlagVariants());

    posthog.identify(USERID, {
        "user-id": USERID
    });

    posthog.onFeatureFlags(function () {
        // feature flags should be available at this point
        console.log("Worker: checklist after load: ", posthog.getFeatureFlag("ab-checklist"));
    });
}
