var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Guilherme M Gregio <guilherme@gregio.net>
 * @author Bruno z Marques <zaccabruno@gmail.com>
 */
suite('extractor', function () {
    var Extractor = require(source.concat('/extractor'));
    var util = require(source.concat('/util'));

    test('value simple', function () {
        var result = new Extractor({teste: 'valor'}).extract('teste');

        assert.deepEqual(result, [
            {key: 'teste', value: 'valor'}
        ]);
    });

    test('literal value', function () {
        var result = new Extractor('valor').extract('literalvalue');

        assert.deepEqual(result, [
            {key: 'literalvalue', value: 'valor'}
        ]);
    });

    test('value nasted object', function () {
        var result = new Extractor({user: {person: {name: 'First Name'}}}).extract('user.person.name');

        assert.deepEqual(result, [
            {key: 'user.person.name', value: 'First Name'}
        ]);
    });

    test('value arrays with nasted object', function () {
        var result = new Extractor({user: {contacts: [
            {type: 'MAIL', value: 'user@email.com'},
            {type: 'MAIL', value: 'outro@gmail.com'}
        ]}}).extract('user.contacts.value');

        assert.deepEqual(result, [
            {key: 'user.contacts[0].value', value: 'user@email.com'},
            {key: 'user.contacts[1].value', value: 'outro@gmail.com'}
        ]);
    });

    test('value arrays with nasted arrays with object', function () {
        var result = new Extractor({
            lawsuit: {
                deposits: [
                    {
                        bank: {
                            extract: [
                                {
                                    file: 'upload.png'
                                }
                            ]
                        }
                    },
                    {
                        bank: {
                            extract: [
                                {
                                    file: 'newUpload.png'
                                },
                                {
                                    file: 'outroFile.png'
                                }
                            ]
                        }
                    }
                ]
            }
        }).extract('lawsuit.deposits.bank.extract.file');

        assert.deepEqual(result, [
            {key: 'lawsuit.deposits[0].bank.extract[0].file', value: 'upload.png'},
            {key: 'lawsuit.deposits[1].bank.extract[0].file', value: 'newUpload.png'},
            {key: 'lawsuit.deposits[1].bank.extract[1].file', value: 'outroFile.png'}
        ]);
    });

});