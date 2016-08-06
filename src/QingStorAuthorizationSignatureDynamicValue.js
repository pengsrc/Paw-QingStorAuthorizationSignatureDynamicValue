import QingStorAuthorizationSignature from './QingStorAuthorizationSignature';

class QingStorAuthorizationSignatureDynamicValue {
  evaluate(context) {
    if (context.runtimeInfo.task !== 'requestSend') {
      return '** signature is only generated during request send **';
    }

    const request = context.getCurrentRequest();
    const headers = request.headers;

    const signature = new QingStorAuthorizationSignature(
      this.accessKey,
      this.secretAccessKey,
      {
        'Verb': request.method,
        'Content-MD5': headers['Content-MD5'],
        'Content-Type': headers['Content-Type'],
        'Date': headers.Date,
        'Canonicalized Headers': this.canonicalizedHeaders,
        'Canonicalized Resource': this.canonicalizedResource,
      }
    );
    return signature.sign();
  }
}

Object.assign(QingStorAuthorizationSignatureDynamicValue, {
  identifier: 'com.prettyxw.paw.extensions.QingStorAuthorizationSignatureDynamicValue',
  title: 'QingStor Authorization Signature',
  help: 'https://github.com/prettyxw/Paw-QingStorAuthorizationSignatureDynamicValue',
  inputs: [
    DynamicValueInput('accessKey', 'QingStor Access Key', 'SecureValue'),
    DynamicValueInput('secretAccessKey', 'QingStor Secret Access Key', 'SecureValue'),
    DynamicValueInput('canonicalizedHeaders', 'Canonicalized Headers', 'KeyValueList'),
    DynamicValueInput('canonicalizedResource', 'Canonicalized Resource', 'String'),
  ],
});

registerDynamicValueClass(QingStorAuthorizationSignatureDynamicValue);