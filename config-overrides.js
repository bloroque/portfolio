const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
  };

  // Désactive le plugin CaseSensitivePathsPlugin de CRA qui bloque
  // l'import de fichiers comme `Footer.module.css` alors que le fichier
  // sur disque s'appelle `footer.module.css` (Windows insensible à la casse).
  if (Array.isArray(config.plugins)) {
    config.plugins = config.plugins.filter(
      (plugin) =>
        plugin && plugin.constructor && plugin.constructor.name !== 'CaseSensitivePathsPlugin'
    );
  }

  // Ignore les warnings de source-map manquants (ex: @mediapipe/tasks-vision)
  config.ignoreWarnings = [
    ...(config.ignoreWarnings || []),
    /Failed to parse source map/,
  ];

  return config;
};
