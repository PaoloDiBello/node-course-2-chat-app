var expect = require('expect')

var { isRealString } = require('./validation');

describe('isRealString', () => {

    it('should be valid string', (done) => {

        const str = 'Test';
        const res = isRealString(str)
        expect(res).toBe(true);
        done();

    })


    it('should reject non-string values', (done) => {
        const str = 12345;
        const res = isRealString(str)
        expect(res).toBe(false);
        done();

    })

    it('should reject string with only spaces', (done) => {
        const str = '  ';
        const res = isRealString(str)
        expect(res).toBe(false);
        done();
    })


    it('should allow string with non-space characters', (done) => {

        const str = ' <-Test-> ';
        const res = isRealString(str)
        expect(res).toBe(true);
        done();

    })



})