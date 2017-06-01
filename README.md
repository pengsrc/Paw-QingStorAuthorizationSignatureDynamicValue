# Paw-QingStorAuthorizationSignatureDynamicValue
QingStor Authorization Signature Dynamic Value Extension for [Paw](https://paw.cloud)

## About QingStor

[QingStor](https://www.qingstor.com) provides low-cost and reliable online
storage service with unlimited storage space, high read and write performance,
high reliability and data safety, fine-grained access control, and easy to use
API.

## Screenshot

![Version 2.0.0](screenshots/version_2.0.0.png)

## Usage

[Download latest version](https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue/releases),
and put it into Paw's extension directory.

## Example

There's a example paw file(`test/QingStor.paw`) to test this extension and QingStor.

To use these APIs, you need to create an API Key in your [QingCloud Console](https://console.qingcloud.com/access_keys/).

Please refer to [QingStor Documentation](https://docs.qingcloud.com/qingstor/api/index.html) for more information.

## Development

### Prerequisites

``` shell
npm install
```

### Build

``` shell
make build
```

### Install

``` shell
make install
```

## ChangeLog

### [v2.0.1] - 2017-06-01

#### Fixed
- Fix signature bug

### [v2.0.0] - 2016-12-19

#### Added
- Support QingStor signature version 2

#### Fixed
- Fix bug in signature version 1

### [v1.5.0] - 2016-08-19

#### Fixed
- Severe Bug Fix
- Refactor

### [v1.0.2] - 2016-08-19

#### Changed
- Change "QingStor Access Key" type to String

### v1.0.0 - 2016-08-06

#### Added
- QingStor Authorization Signature Dynamic Value

## Contributing

1. Fork it ( https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request


## LICENSE

The GPLv3 License. Read [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html) for further information.

[v2.0.1]: https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue/compare/v2.0.0...v2.0.1
[v2.0.0]: https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue/compare/v1.5.0...v2.0.0
[v1.5.0]: https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue/compare/v1.0.2...v1.5.0
[v1.0.2]: https://github.com/pengsrc/Paw-QingStorAuthorizationSignatureDynamicValue/compare/v1.0.0...v1.0.2
