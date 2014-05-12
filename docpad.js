/* jshint -W014 */


var hljs;
function highlightCode(code, lang) {
	if (!hljs) {
		hljs = require('highlight.js');
		hljs.configure({tabReplace: '    '}); // 4 spaces
		hljs.registerLanguage('typescript', require('./lib/highlight/typescript'));
	}
	if (lang) {
		return hljs.highlight(lang, code).value;
	}
	return hljs.highlightAuto(code).value;
}

var docpadConfig = {
	templateData: {
		site: {
			url: 'http://definitelytyped.org',
			github: 'https://github.com/borisyankov/DefinitelyTyped',
			ref: 'github.com/borisyankov/DefinitelyTyped',
			home: '/',
			gh: {
				user: 'borisyankov',
				repo: 'DefinitelyTyped'
			},
			oldUrls: [],
			title: 'DefinitelyTyped',
			description: 'The repository for high quality TypeScript type definitions',
			tagline: 'The repository for high quality TypeScript type definitions',
			keywords: 'typescript, type, definition, declaration, repository, typing',
			styles: [
				'/styles/semantic.min.css',
				'/styles/highlight.css',
				'/styles/style.css'
			],
			scripts: [
				'//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js',
				'/scripts/semantic.min.js',
				'/scripts/script.js'
			],
			analytics: {
				id: 'UA-47495295-3',
				site: 'definitelytyped.org'
			}
		},
		badges: {
			basic: {
				link: 'http://definitelytyped.org',
				label: 'TypeScript definitions on DefinitelyTyped',
				svg_base: '//definitelytyped.org/badges/standard.svg',
				svg_flat: '//definitelytyped.org/badges/standard-flat.svg'
			}
		},
		link: {
			tsd: {
				web: 'http://www.tsdpm.com',
				npm: 'https://www.npmjs.org/package/tsd'
			}
		},
		getPreparedTitle: function() {
			if (this.document.title) {
				return '' + this.document.title + ' | ' + this.site.title;
			} else {
				return this.site.title;
			}
		},
		getPreparedDescription: function() {
			return this.document.description || this.site.description;
		},
		getPreparedKeywords: function() {
			return this.site.keywords.concat(this.document.keywords || []).join(', ');
		},
		getBadgeMarkdown: function(type) {
			var link = this.badges.basic.link;
			var label = this.badges.basic.label;
			var image = this.badges.basic.svg_base;
			if (type === 'flat') {
				image = this.badges.basic.svg_flat;
			}
			return '[![' + label +'](' + image +')](' + link +')';
		},
		getBadgeHTML: function(type) {
			var link = this.badges.basic.link;
			var label = this.badges.basic.label;
			var image = this.badges.basic.svg_base;
			if (type === 'flat') {
				image = this.badges.basic.svg_flat;
			}
			return '<a href="' + link +'"><img src="' + image +'" alt="' + label +'"></a>';
		}
	},
	collections: {
		pages: function() {
			return this.getCollection('documents').findAllLive({
				relativeOutDirPath: 'pages'
			});
		},
		guides: function() {
			return this.getCollection('documents').findAllLive({
				relativeOutDirPath: 'guides'
			});
		},
		directory: function() {
			return this.getCollection('documents').findAllLive({
				relativeOutDirPath: 'directory'
			});
		}
	},
	environments: {
		development: {
			templateData: {
				site: {
					url: false
				}
			}
		}
	},
	plugins: {
		marked: {
			markedOptions: {
				gfm: true,
				highlight: highlightCode
			}
		}
	},
	events: {
		serverExtend: function(opts) {
			var server = opts.server;
			var docpad = this.docpad;
			var latestConfig = docpad.getConfig();
			var oldUrls = latestConfig.templateData.site.oldUrls || [];
			var newUrl = latestConfig.templateData.site.url;
			return server.use(function(req, res, next) {
				if (oldUrls.indexOf(req.headers.host) >= 0) {
					return res.redirect(newUrl + req.url, 301);
				} else {
					return next();
				}
			});
		}
	}
};

module.exports = docpadConfig;
