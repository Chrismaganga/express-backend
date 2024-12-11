module.exports = function (api) {
    api.cache(true);
  
    const presets = [ ... ];
    const plugins = [ ... ];
  
    if (process.env["ENV"] === "prod") {
      plugins.push(...);
    }
  
    return {
      presets,
      plugins
    };
  }