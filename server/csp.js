const csp = {
  'default-src': ["'self'", 'arbeidsgiver.nav.no'],
  'script-src': [
    "'self'",
    "'report-sample'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'www.google-analytics.com',
    'www.googletagmanager.com',
    'static.hotjar.com',
    'script.hotjar.com',
    '*.psplugin.com',
    '*.nav.no',
    '*.taskanalytics.com/tm.js',
  ],
  'style-src': [
    "'self'",
    'blob:',
    '*.nav.no',
    "'unsafe-inline'",
    'fonts.googleapis.com',
    'translate.googleapis.com',
  ],
  'connect-src': [
    "'self'",
    '*.nav.no',
    'oidc-ver2.difi.no/idporten-oidc-provider/authorize',
    'idporten-ver2.difi.no/opensso/SSORedirect/metaAlias/norge.no/idp4',
    'amplitude.nav.no',
    'data.brreg.no',
    '*.psplugin.com',
    '*.hotjar.com',
    '*.vc.hotjar.com',
    '*.hotjar.io',
    '*.vc.hotjar.io',
    'wss://*.hotjar.com',
    'api.puzzel.com',
    'nav.boost.ai',
    "er31zvh0.api.sanity.io",
    "er31zvh0.apicdn.sanity.io",
    'sentry.gc.nav.no',
    'www.google-analytics.com',
    'ta-survey-v2.herokuapp.com',
  ],
  'font-src': ['data:', '*.psplugin.com', '*.hotjar.com', 'fonts.gstatic.com', 'www.nav.no'],
  'frame-src': ['vars.hotjar.com', '*.nav.no'],
  'img-src': [
    "'self'",
    'cdn.sanity.io',
    '*.hotjar.com',
    'www.google-analytics.com',
    'www.gstatic.com',
    'translate.google.com',
    '*.nav.no',
    'data:',
    'www.googletagmanager.com',
  ],
  'report-uri': [
    'https://sentry.gc.nav.no/api/53/security/?sentry_key=cdbc9e41249f474b8714aca002e84707',
  ],
  'worker-src': ["'self'", 'blob:'],
};

function getCspValue() {
  return Object.entries(csp)
    .map((entry) => `${entry[0]} ${entry[1].join(' ')}`)
    .join('; ');
}

module.exports = getCspValue;
