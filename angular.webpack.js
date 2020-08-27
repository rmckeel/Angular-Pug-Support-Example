const { AngularCompilerPlugin } = require("@ngtools/webpack");

/**
 * Custom Angular Webpack Configuration
 */
module.exports = (config, options) => {
  return addPugSupport(config);
};

/**
 * Add support for pug and pug partials, without requiring `ng add ng-cli-pug-loader`,
 * which does deep string manipulation of node_modules methods and is thus more brittle.
 *
 * Note this requires creating a new AngularCompilerPlugin with modified options to
 * set directTemplateLoading to false.
 *
 * If this plugin modification becomes undesirable in the future, the next best option is to
 * still push rules for pug and pug partials, but remove the HTML raw-loader rule and the
 * AngularCompilerPlugin modification.  So in module.exports, simply `return addSimplePugSupport(config)`
 * instead. Also see documentation for the addSimplePugSupport function.
 *
 * @param config
 * @returns {*}
 */
const addPugSupport = (config) => {
  config.module.rules.push({
    test: /\.(pug|jade)$/,
    exclude: /\.(include|partial)\.(pug|jade)$/,
    use: [{ loader: "apply-loader" }, { loader: "pug-loader" }],
  });
  config.module.rules.push({
    test: /\.(include|partial)\.(pug|jade)$/,
    loader: "pug-loader",
  });
  config.module.rules.push({ test: /.html$/, use: [{ loader: "raw-loader" }] });

  let pluginIndex = -1;
  // find existing AngularCompilerPlugin
  for (let iterator = 0; iterator < config.plugins.length; iterator++) {
    if (
      config.plugins[iterator].constructor &&
      "AngularCompilerPlugin" === config.plugins[iterator].constructor.name
    ) {
      pluginIndex = iterator;
      break;
    }
  }

  if (pluginIndex < 0) {
    console.error(
      "Could not find the configuration plugin AngularCompilerPlugin to set directTemplateLoading to false. Note Pug templating support may be broken."
    );
  } else {
    // swap out existing AngularCompilerPlugin for a new AngularCompilerPlugin instance with modified options
    const configuredOptions = config.plugins[pluginIndex]._options;
    configuredOptions.directTemplateLoading = false;
    config.plugins[pluginIndex] = new AngularCompilerPlugin(configuredOptions);
  }

  return config;
};

/**
 * Add support for pug and pug partials, without requiring `ng add ng-cli-pug-loader`,
 * which does deep string manipulation of node_modules methods and is thus more brittle.
 *
 * This method is simpler because it does not create a new AngularCompilerPlugin,
 * but does require that when a pug file is used, you wrap the templateUrl in require,
 * for example: `templateUrl: require("./example.component.pug")`.
 *
 * @param config
 * @returns {*}
 */
const addSimplePugSupport = (config) => {
  config.module.rules.push({
    test: /\.(pug|jade)$/,
    exclude: /\.(include|partial)\.(pug|jade)$/,
    use: [{ loader: "apply-loader" }, { loader: "pug-loader" }],
  });
  config.module.rules.push({
    test: /\.(include|partial)\.(pug|jade)$/,
    loader: "pug-loader",
  });

  return config;
};
