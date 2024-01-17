var axios = (function e(t){function n(e,t,r){var a,o={};if(Array.isArray(e))return e.concat(t);for(a in e)o[r?a.toLowerCase():a]=e[a];for(a in t){var i=r?a.toLowerCase():a,u=t[a];o[i]=i in o&&"object"==typeof u?n(o[i],u,"headers"==i):u;}return o}function r(e,r,a,o,i){var u="string"!=typeof e?(r=e).url:e,c={config:r},s=n(t,r),f={};o=o||s.data,(s.transformRequest||[]).map(function(e){o=e(o,s.headers)||o;}),s.auth&&(f.authorization=s.auth),o&&"object"==typeof o&&"function"!=typeof o.append&&"function"!=typeof o.text&&(o=JSON.stringify(o),f["content-type"]="application/json");try{f[s.xsrfHeaderName]=decodeURIComponent(document.cookie.match(RegExp("(^|; )"+s.xsrfCookieName+"=([^;]*)"))[2]);}catch(e){}return s.baseURL&&(u=u.replace(/^(?!.*\/\/)\/?/,s.baseURL+"/")),s.params&&(u+=(~u.indexOf("?")?"&":"?")+(s.paramsSerializer?s.paramsSerializer(s.params):new URLSearchParams(s.params))),(s.fetch||fetch)(u,{method:(a||s.method||"get").toUpperCase(),body:o,headers:n(s.headers,f,!0),credentials:s.withCredentials?"include":i}).then(function(e){for(var t in e)"function"!=typeof e[t]&&(c[t]=e[t]);return "stream"==s.responseType?(c.data=e.body,c):e[s.responseType||"text"]().then(function(e){c.data=e,c.data=JSON.parse(e);}).catch(Object).then(function(){return (s.validateStatus?s.validateStatus(e.status):e.ok)?c:Promise.reject(c)})})}return t=t||{},r.request=r,r.get=function(e,t){return r(e,t,"get")},r.delete=function(e,t){return r(e,t,"delete")},r.head=function(e,t){return r(e,t,"head")},r.options=function(e,t){return r(e,t,"options")},r.post=function(e,t,n){return r(e,n,"post",t)},r.put=function(e,t,n){return r(e,n,"put",t)},r.patch=function(e,t,n){return r(e,n,"patch",t)},r.all=Promise.all.bind(Promise),r.spread=function(e){return e.apply.bind(e,e)},r.CancelToken="function"==typeof AbortController?AbortController:Object,r.defaults=t,r.create=e,r}());

var name$1 = "@tryghost/content-api";
var version = "1.11.20";
var repository = "https://github.com/TryGhost/SDK/tree/main/packages/content-api";
var author = "Ghost Foundation";
var license = "MIT";
var main = "cjs/content-api.js";
var unpkg = "umd/content-api.min.js";
var module = "es/content-api.js";
var source = "lib/content-api.js";
var files = [
	"LICENSE",
	"README.md",
	"cjs/",
	"lib/",
	"umd/",
	"es/"
];
var scripts = {
	dev: "echo \"Implement me!\"",
	pretest: "yarn build",
	test: "NODE_ENV=testing c8 --all --reporter text --reporter cobertura mocha './test/**/*.test.js'",
	build: "rollup -c",
	lint: "eslint . --ext .js --cache",
	prepare: "NODE_ENV=production yarn build",
	posttest: "yarn lint"
};
var publishConfig = {
	access: "public"
};
var devDependencies = {
	"@babel/core": "7.23.7",
	"@babel/polyfill": "7.12.1",
	"@babel/preset-env": "7.23.8",
	"@rollup/plugin-json": "6.1.0",
	c8: "9.1.0",
	"core-js": "3.35.0",
	"eslint-plugin-ghost": "3.4.0",
	mocha: "10.2.0",
	rollup: "2.79.1",
	"rollup-plugin-babel": "4.4.0",
	"rollup-plugin-commonjs": "10.1.0",
	"rollup-plugin-node-resolve": "5.2.0",
	"rollup-plugin-polyfill-node": "0.12.0",
	"rollup-plugin-replace": "2.2.0",
	"rollup-plugin-terser": "7.0.2",
	should: "13.2.3",
	sinon: "17.0.1"
};
var dependencies = {
	redaxios: "^0.5.1"
};
var packageInfo = {
	name: name$1,
	version: version,
	repository: repository,
	author: author,
	license: license,
	main: main,
	"umd:main": "umd/content-api.min.js",
	unpkg: unpkg,
	module: module,
	source: source,
	files: files,
	scripts: scripts,
	publishConfig: publishConfig,
	devDependencies: devDependencies,
	dependencies: dependencies
};

// Changed to redaxios to add support for Vercel edge functions

// @NOTE: this value is dynamically replaced based on browser/node environment
const USER_AGENT_DEFAULT = false;
const packageVersion = packageInfo.version;
const defaultAcceptVersionHeader = 'v5.0';
const supportedVersions = ['v2', 'v3', 'v4', 'v5', 'canary'];
const name = '@tryghost/content-api';

/**
 * This method can go away in favor of only sending 'Accept-Version` headers
 * once the Ghost API removes a concept of version from it's URLS (with Ghost v5)
 *
 * @param {string} [version] version in `v{major}` format
 * @returns {string}
 */
const resolveAPIPrefix = version => {
  let prefix;

  // NOTE: the "version.match(/^v5\.\d+/)" expression should be changed to "version.match(/^v\d+\.\d+/)" once Ghost v5 is out
  if (version === 'v5' || version === undefined || version.match(/^v5\.\d+/)) {
    prefix = `/content/`;
  } else if (version.match(/^v\d+\.\d+/)) {
    const versionPrefix = /^(v\d+)\.\d+/.exec(version)[1];
    prefix = `/${versionPrefix}/content/`;
  } else {
    prefix = `/${version}/content/`;
  }
  return prefix;
};
const defaultMakeRequest = _ref => {
  let {
    url,
    method,
    params,
    headers
  } = _ref;
  return axios[method](url, {
    params,
    paramsSerializer: parameters => {
      return Object.keys(parameters).reduce((parts, k) => {
        const val = encodeURIComponent([].concat(parameters[k]).join(','));
        return parts.concat(`${k}=${val}`);
      }, []).join('&');
    },
    headers
  });
};

/**
 *
 * @param {Object} options
 * @param {String} options.url
 * @param {String} options.key
 * @param {String} [options.ghostPath]
 * @param {String|Boolean} options.version - a version string like v3, v4, v5 or boolean value identifying presence of Accept-Version header
 * @param {String|Boolean} [options.userAgent] - value controlling the 'User-Agent' header should be sent with a request
 * @param {Function} [options.makeRequest]
 * @param {String} [options.host] Deprecated
 */
function GhostContentAPI(_ref2) {
  let {
    url,
    key,
    host,
    version,
    userAgent,
    ghostPath = 'ghost',
    makeRequest = defaultMakeRequest
  } = _ref2;
  /**
   * host parameter is deprecated
   * @deprecated use "url" instead
   */
  if (host) {
    // eslint-disable-next-line
    console.warn(`${name}: The 'host' parameter is deprecated, please use 'url' instead`);
    if (!url) {
      url = host;
    }
  }
  if (this instanceof GhostContentAPI) {
    return GhostContentAPI({
      url,
      key,
      version,
      userAgent,
      ghostPath,
      makeRequest
    });
  }
  if (version === undefined) {
    throw new Error(`${name} Config Missing: 'version' is required. E.g. ${supportedVersions.join(',')}`);
  }
  let acceptVersionHeader;
  if (typeof version === 'boolean') {
    if (version === true) {
      acceptVersionHeader = defaultAcceptVersionHeader;
    }
    version = undefined;
  } else if (version && !supportedVersions.includes(version) && !version.match(/^v\d+\.\d+/)) {
    throw new Error(`${name} Config Invalid: 'version' ${version} is not supported`);
  } else {
    if (version === 'canary') {
      // eslint-disable-next-line
      console.warn(`${name}: The 'version' parameter has a deprecated format 'canary', please use 'v{major}.{minor}' format instead`);
      acceptVersionHeader = defaultAcceptVersionHeader;
    } else if (version.match(/^v\d+$/)) {
      // eslint-disable-next-line
      console.warn(`${name}: The 'version' parameter has a deprecated format 'v{major}', please use 'v{major}.{minor}' format instead`);
      acceptVersionHeader = `${version}.0`;
    } else {
      acceptVersionHeader = version;
    }
  }
  if (!url) {
    throw new Error(`${name} Config Missing: 'url' is required. E.g. 'https://site.com'`);
  }
  if (!/https?:\/\//.test(url)) {
    throw new Error(`${name} Config Invalid: 'url' ${url} requires a protocol. E.g. 'https://site.com'`);
  }
  if (url.endsWith('/')) {
    throw new Error(`${name} Config Invalid: 'url' ${url} must not have a trailing slash. E.g. 'https://site.com'`);
  }
  if (ghostPath.endsWith('/') || ghostPath.startsWith('/')) {
    throw new Error(`${name} Config Invalid: 'ghostPath' ${ghostPath} must not have a leading or trailing slash. E.g. 'ghost'`);
  }

  // Commented out because key is handled with api routes
  // if (key && !/[0-9a-f]{26}/.test(key)) {
  //     throw new Error(`${name} Config Invalid: 'key' ${key} must have 26 hex characters`);
  // }

  if (userAgent === undefined) {
    userAgent = USER_AGENT_DEFAULT;
  }
  const api = ['posts', 'authors', 'tags', 'pages', 'settings', 'tiers', 'newsletters', 'offers'].reduce((apiObject, resourceType) => {
    function browse() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      let memberToken = arguments.length > 1 ? arguments[1] : undefined;
      return makeApiRequest(resourceType, options, null, memberToken);
    }
    function read(data) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let memberToken = arguments.length > 2 ? arguments[2] : undefined;
      if (!data || !data.id && !data.slug) {
        return Promise.reject(new Error(`${name} read requires an id or slug.`));
      }
      const params = Object.assign({}, data, options);
      return makeApiRequest(resourceType, params, data.id || `slug/${data.slug}`, memberToken);
    }
    return Object.assign(apiObject, {
      [resourceType]: {
        read,
        browse
      }
    });
  }, {});

  // Settings, tiers & newsletters only have browse methods, offers only has read
  delete api.settings.read;
  delete api.tiers.read;
  delete api.newsletters.read;
  delete api.offers.browse;
  return api;
  function makeApiRequest(resourceType, params, id) {
    let membersToken = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    if (!membersToken && !key) {
      return Promise.reject(new Error(`${name} Config Missing: 'key' is required.`));
    }
    delete params.id;
    const headers = membersToken ? {
      Authorization: `GhostMembers ${membersToken}`
    } : {};
    if (userAgent) {
      if (typeof userAgent === 'boolean') {
        headers['User-Agent'] = `GhostContentSDK/${packageVersion}`;
      } else {
        headers['User-Agent'] = userAgent;
      }
    }
    if (acceptVersionHeader) {
      headers['Accept-Version'] = acceptVersionHeader;
    }
    params = Object.assign({
      key
    }, params);
    const apiUrl = `${url}/${ghostPath}/api${resolveAPIPrefix(version)}${resourceType}/${id ? id + '/' : ''}`;
    return makeRequest({
      url: apiUrl,
      method: 'get',
      params,
      headers
    }).then(res => {
      if (!Array.isArray(res.data[resourceType])) {
        return res.data[resourceType];
      }
      if (res.data[resourceType].length === 1 && !res.data.meta) {
        return res.data[resourceType][0];
      }
      return Object.assign(res.data[resourceType], {
        meta: res.data.meta
      });
    }).catch(err => {
      if (err.response && err.response.data && err.response.data.errors) {
        const props = err.response.data.errors[0];
        const toThrow = new Error(props.message);
        const keys = Object.keys(props);
        toThrow.name = props.type;
        keys.forEach(k => {
          toThrow[k] = props[k];
        });
        toThrow.response = err.response;

        // @TODO: remove in 2.0. We have enhanced the error handling, but we don't want to break existing implementations.
        toThrow.request = err.request;
        toThrow.config = err.config;
        throw toThrow;
      } else {
        throw err;
      }
    });
  }
}

export { GhostContentAPI as default };
//# sourceMappingURL=content-api.js.map
