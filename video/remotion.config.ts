/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

// Rspack is disabled deliberately. On Remotion 4.0.523 it bundled with no
// errors but emitted no JS, so `remotion render` failed looking for bundle.js.
// Webpack (the default) works. Try re-enabling after a Remotion upgrade.
// Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
