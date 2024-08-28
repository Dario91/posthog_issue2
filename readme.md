# Issue Description

---

I am attempting to use PostHog feature flags within a WebWorker. However, when I try to access a feature flag (e.g., `ab-checklist`), the PostHog JavaScript API returns an incorrect value.

Additionally, when I use the `posthog.onFeatureFlags()` method, it triggers an endless loop, continuously returning the wrong value for the feature flag.

This issue only occurs when a Release Condition is specified (as shown in the screenshot below). If I remove the Release Condition, the correct value is returned, but the loop still persists.

---

# Steps to Reproduce

1. Install the required dependencies by running the following command:

   ```bash
   npm install
   ```

2. Add your `PostHog key` and `UserID` in the `env.ts` file.

3. Start the application with:

   ```bash
   npm start
   ```

If you open the console, you should notice that the logs in `worker.ts` (line 27) are being called repeatedly.

This issue does not occur in the main thread (`index.ts`); it only appears in the WebWorker thread. Additionally, the values logged are incorrect. They are correct the first time the `onFeatureFlags` callback is triggered but then get overwritten with incorrect values.

I expect to receive the value `test` from PostHog, but instead, I am getting either `control` or `false`.

---

## Console Screenshot
![console_screenshot](images/Console_log_Screenshot_infinite_callbacks.png)

---

## Posthog Feature Flag Config
![console_screenshot](images/Posthog_Config_feature_flag_ab-checklist.png)
