import CryptoJS from 'crypto-js';

export default class QingStorAuthorizationSignature {
  static buildCanonicalizedHeaders(requestHeaders) {

    const canonicalizedHeaderKeys = [];
    for (const canonicalizedHeaderKey in requestHeaders) {
      if (requestHeaders.hasOwnProperty(canonicalizedHeaderKey)) {
        if (canonicalizedHeaderKey.startsWith('X-QS-')) {
          canonicalizedHeaderKeys.push(canonicalizedHeaderKey);
        }
      }
    }
    canonicalizedHeaderKeys.sort();

    const canonicalizedHeaders = [];
    for (let i = 0; i < canonicalizedHeaderKeys.length; i++) {
      canonicalizedHeaders.push(
        `${canonicalizedHeaderKeys[i].toLowerCase()}:${requestHeaders[canonicalizedHeaderKeys[i]]}`
      );
    }

    const canonicalizedHeadersString = canonicalizedHeaders.join(`\n`);

    return canonicalizedHeadersString === '' ? '' : `${canonicalizedHeadersString}\n`;
  }

  static buildCanonicalizedResource(request, locationStyle) {
    const originalParamsString = new DynamicValue('com.luckymarmot.RequestURLDynamicValue', {
      request: request.id,
      includeScheme: false,
      includeHost: false,
      includeParameters: true,
    }).getEvaluatedString();

    let paramsString = originalParamsString;
    if (originalParamsString.includes('?')) {
      const resources = originalParamsString.split('?');
      const subResource = resources[1];
      const raws = subResource.split('&');
      const map = {};
      for (let i = 0; i < raws.length; i++) {
        const pieces = raws[i].split('=');
        map[pieces[0]] = pieces[1];
      }

      const keys = [];
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      keys.sort();

      const values = [];
      for (let i = 0; i < keys.length; i++) {
        if (map[keys[i]] === undefined) {
          values.push(`${keys[i]}`);
        } else {
          values.push(`${keys[i]}=${map[keys[i]]}`);
        }
      }

      paramsString = `${resources[0]}?${values.join('&')}`;
    }

    if (locationStyle === 'virtual_host_style') {
      const hostString = new DynamicValue('com.luckymarmot.RequestURLDynamicValue', {
        request: request.id,
        includeScheme: false,
        includeHost: true,
        includeParameters: false,
      }).getEvaluatedString();
      const bucketName = hostString.split('.')[0];

      return `/${bucketName}${paramsString.replace(/^\/\?/g, '?')}`;
    }

    if (locationStyle === 'path_style') {
      return paramsString === '' ? '/' : paramsString;
    }

    return '';
  }

  constructor(request, accessKey, secretAccessKey, locationStyle) {
    this.request = request;
    this.accessKey = accessKey;
    this.secretAccessKey = secretAccessKey;
    this.locationStyle = locationStyle;
  }

  buildStringToSign() {
    const request = this.request;
    const headers = request.headers;
    const style = this.locationStyle;

    return (
      `${request.method}\n` +
      `${headers['Content-MD5'] ? headers['Content-MD5'] : ''}\n` +
      `${headers['Content-Type'] ? headers['Content-Type'] : ''}\n` +
      `${headers.Date ? headers.Date : ''}\n` +
      `${QingStorAuthorizationSignature.buildCanonicalizedHeaders(headers)}` +
      `${QingStorAuthorizationSignature.buildCanonicalizedResource(request, style)}`
    );
  }

  sign() {
    const hmacHashHex = CryptoJS.HmacSHA256(this.buildStringToSign(), this.secretAccessKey);
    const base64String = CryptoJS.enc.Base64.stringify(hmacHashHex);

    console.log(this.buildStringToSign());
    console.log(this.accessKey);
    console.log(base64String);

    return `QS-HMAC-SHA256 ${this.accessKey}:${base64String}`;
  }
}