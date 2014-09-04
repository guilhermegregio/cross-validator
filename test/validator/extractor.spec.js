var assert = require('chai').assert;
var source = __dirname.replace('test', 'src');

/**
 * @author Bruno z Marques <zaccabruno@gmail.com>
 */
suite('extractor', function () {
    var Extractor = require(source.concat('/extractor'));
    var util = require(source.concat('/util'));

    test('should extract items of array', function () {

        /*var result = new Extractor('eita').extract();

        assert.deepEqual(result, [{path:'', value:'eita'}]);*/

        /*var result2 = new Extractor({teste: 'eita2'}).extract('teste');

        assert.deepEqual(result2,  [{path:'teste', value:'eita2'}]);*/

        /*var result3 = new Extractor({teste: {oppa: 'eita3'}}).extract('teste.oppa');

        assert.deepEqual(result3,  [{path:'teste.oppa', value:'eita3'}]);*/

       var result4 = new Extractor({teste: [
            {oppa: 'eita3'},
            {oppa: 'good'}
        ]}).extract('teste.oppa');

        assert.deepEqual(result4, ['teste[0].oppa.eita3', 'teste[1].oppa.good']);

        /*var a = {
            lista: [
                {
                    subLista: [
                        {
                            final: 'final'
                        },
                        {
                            final: 'outroFinal'
                        }
                    ]
                },
                {
                    subLista: [
                        {
                            final: 'sub2'
                        },
                        {
                            final: 'outroSub2'
                        }
                    ]
                }
            ]
        };
        var result5 = new Extractor(a).extract('lista.subLista.final');

        assert.deepEqual(result5, ['lista[0].subLista[0].final.final',
                                   'lista[0].subLista[1].final.outroFinal',
                                   'lista[1].subLista[0].final.sub2',
                                   'lista[1].subLista[1].final.outroSub2']);*/
        /*assert.deepEqual(result5, [{key:'lista[0].subLista[0].final', value:'final'},
                                   {key:'lista[0].subLista[1].final', value:'outroFinal'},
                                   {key:'lista[1].subLista[0].final', value:'sub2'},
                                   {key:'lista[1].subLista[1].final', value:'outroSub2'}*//**//*
        ]);*/
    });

});