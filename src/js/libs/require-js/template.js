define(function (require) {
	'use strict';

	var
		TemplateLoader,
		Text = require('text');
	/**
	 * A class that loads Hogan Templates.
	 *
	 * @constructor
	 * @this {TemplateLoader}
	 * @property {Object} buildMap The stored source for builds.
	 * @property {String} CACHE_BUST_FLAG The flag used to enable cache busting.
	 * @property {String} CACHE_BUST_QUERY_PARAM The param used to enable cache busting.
	 * @return {TemplateLoader}
	*/
	TemplateLoader = function () {
		this.buildMap = {};
		this.CACHE_BUST_FLAG = 'bust';
		this.CACHE_BUST_QUERY_PARAM = '!bust';
		return this;
	};

	TemplateLoader.prototype = {
		/**
		 * Cache bust a url.
		 *
		 * @this {TemplateLoader}
		 * @param {String} url The url to process.
		 * @return {String}
		 */
		cacheBust: function (url) {
			url = url.replace(this.CACHE_BUST_FLAG, '');
			url += (url.indexOf('?') < 0) ? '?' : '&';
			return url + this.CACHE_BUST_QUERY_PARAM + '=' + Math.round(2147483647 * Math.random());
		},

		/**
		 * Load a template file and compile it, or store it for the build.
		 *
		 * @this {TemplateLoader}
		 * @param {String} name The template name.
		 * @param {Function} req Require.
		 * @param {Function} onLoad The loaded callback.
		 * @param {Object} config The requirejs config.
		 */
		load: function (name, req, onLoad, config) {
			if (config.isBuild && config.inlineTemplates === false) {
				onLoad(null);
			} else {
				var url = req.toUrl(name).replace('.js', '') + '.mustache';
				Text.get(url, function (data) {
					if (config.isBuild) {
						this.buildMap[name] = data;
						onLoad(data);
					} else {
						onLoad(data);
					}
				}.bind(this), onLoad.error);
			}
		},

		/**
		 * Avoid caching references to cache busted requests.
		 *
		 * @this {TemplateLoader}
		 * @param {String} name The plugin name.
		 * @param {Function} normalize The RJS normalize method.
		 * @return {String}
		 */
		normalize: function (name, normalize) {
			//used normalize to avoid caching references to a "cache busted" request
			return (name.indexOf(this.CACHE_BUST_FLAG) === -1) ? name : this.cacheBust(name);
		},

		/**
		 * Write out data into the build file.
		 *
		 * @this {TemplateLoader}
		 * @param {String} pluginName The plugin name.
		 * @param {String} moduleName The module name.
		 * @param {Function} write Writes the data into the build.
		 */
		write: function (pluginName, moduleName, write) {
			if (moduleName in this.buildMap) {
				var content = this.buildMap[moduleName];
				write('define("' + pluginName + '!' + moduleName + '", function(){ return ' + content + ';});\n');
			}
		}
	};

	// Export
	return new TemplateLoader();
});