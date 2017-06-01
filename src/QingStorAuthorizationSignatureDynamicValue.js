import QingStorAuthorizationSignatureV1 from './QingStorAuthorizationSignatureV1';
import QingStorAuthorizationSignatureV2 from './QingStorAuthorizationSignatureV2';

class QingStorAuthorizationSignatureDynamicValue {
  evaluate(context) {
    if (context.runtimeInfo.task !== 'requestSend') {
      return '** signature is only generated during request send **';
    }

    switch (this.signatureVersion) {
      case 'v1': {
        const signature = new QingStorAuthorizationSignatureV1(
          context.getCurrentRequest(),
          this.accessKeyID,
          this.secretAccessKey,
          this.locationStyle
        );
        return signature.sign();
      }
      case 'v2': {
        const signature = new QingStorAuthorizationSignatureV2(
          context.getCurrentRequest(),
          this.accessKeyID,
          this.secretAccessKey,
          this.locationStyle
        );
        return signature.sign();
      }
    }
  }
}

Object.assign(QingStorAuthorizationSignatureDynamicValue, {
  identifier: 'io.pjw.paw.extensions.QingStorAuthorizationSignatureDynamicValue',
  title: 'QingStor Authorization Signature',
  help: 'https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue',
  inputs: [
    DynamicValueInput('accessKeyID', 'QingStor Access Key ID', 'String'),
    DynamicValueInput('secretAccessKey', 'QingStor Secret Access Key', 'SecureValue'),
    DynamicValueInput('locationStyle', 'Location Style', 'Select', {
      choices: {
        'virtual_host_style': 'Virtual-Host Style',
        'path_style': 'Path Style',
      },
      defaultValue: 'path_style',
      persisted: true,
    }),
    DynamicValueInput('signatureVersion', 'Signature Version', 'Select', {
      choices: {
        'v1': 'v1 (deprecated)',
        'v2': 'v2',
      },
      defaultValue: 'v2',
      persisted: true,
    }),
  ],
});

registerDynamicValueClass(QingStorAuthorizationSignatureDynamicValue);
