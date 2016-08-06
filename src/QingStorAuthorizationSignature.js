import CryptoJS from 'crypto-js';

export default class QingStorAuthorizationSignature {
  constructor(accessKey, secretAccessKey, signOptions) {
    this.accessKey = accessKey;
    this.secretAccessKey = secretAccessKey;
    this.signOptions = signOptions;
  }

  parseCanonicalizedHeaders(canonicalizedHeaders) {
    if (canonicalizedHeaders) {
      const raws = canonicalizedHeaders;
      const map = {};
      for (let i = 0; i < raws.length; i++) {
        const raw = raws[i].toString();
        if (raw.endsWith(',true')) {
          let piece = raw.replace(',true', '');
          piece = piece.replace(',', 'SPECIAL_CHARACTER');
          const parts = piece.split('SPECIAL_CHARACTER');
          map[parts[0].toLowerCase()] = parts[1];
        }
      }

      const keys = [];
      for (const key in map) {
        if (map.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      keys.sort();

      const headers = [];
      for (let i = 0; i < keys.length; i++) {
        headers.push(`${keys[i]}:${map[keys[i]]}`);
      }
      return headers.join('n');
    }

    return '';
  }

  parseCanonicalizedResource(canonicalizedResource) {
    if (canonicalizedResource) {
      if (canonicalizedResource.includes('?')) {
        const resources = canonicalizedResource.split('?');
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
        return `${resources[0]}?${values.join('&')}`;
      }
      return canonicalizedResource;
    }
    return '';
  }

  buildStringToSign() {
    const options = this.signOptions;

    return (
      `${options.Verb}\n` +
      `${options['Content-MD5'] ? options['Content-MD5'] : ''}\n` +
      `${options['Content-Type'] ? options['Content-Type'] : ''}\n` +
      `${options.Date ? options.Date : ''}\n` +
      `${this.parseCanonicalizedHeaders(options['Canonicalized Headers'])}` +
      `${this.parseCanonicalizedResource(options['Canonicalized Resource'])}`
    );
  }

  sign() {
    console.log(this.buildStringToSign());

    const hmacHashHex = CryptoJS.HmacSHA256(this.buildStringToSign(), this.secretAccessKey);
    const base64String = CryptoJS.enc.Base64.stringify(hmacHashHex);

    return `QS-HMAC-SHA256 ${this.accessKey}:${base64String}`;
  }
}