import QingStorAuthorizationSignature from './QingStorAuthorizationSignature';

class QingStorAuthorizationSignatureDynamicValue {
  evaluate(context) {
    if (context.runtimeInfo.task !== 'requestSend') {
      return '** signature is only generated during request send **';
    }

    const signature = new QingStorAuthorizationSignature(
      context.getCurrentRequest(),
      this.accessKey,
      this.secretAccessKey,
      this.locationStyle || 'virtual_host_style'
    );

    return signature.sign();
  }
}

Object.assign(QingStorAuthorizationSignatureDynamicValue, {
  identifier: 'com.prettyxw.paw.extensions.QingStorAuthorizationSignatureDynamicValue',
  title: 'QingStor Authorization Signature',
  help: 'https://github.com/prettyxw/Paw-QingStorAuthorizationSignatureDynamicValue',
  inputs: [
    DynamicValueInput('accessKey', 'QingStor Access Key', 'String'),
    DynamicValueInput('secretAccessKey', 'QingStor Secret Access Key', 'SecureValue'),
    DynamicValueInput('locationStyle', 'Location Style', 'Select', {
      choices: {
        'virtual_host_style': 'Virtual-Host Style',
        'path_style': 'Path Style',
      },
      persisted: true,
    }),
  ],
});

registerDynamicValueClass(QingStorAuthorizationSignatureDynamicValue);