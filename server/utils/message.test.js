var expect = require('expect')

var { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        const text = 'Hi there!';
        const from = 'admin';

        const message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({ from, text })
    })
})

describe('generateLocationMessage', () => {
    it('should generate the correct message object', (done) => {

        const from = 'Hulk';
        const latitude = '39.501625';
        const longitude = '16.394640';
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = generateLocationMessage(from, latitude, longitude);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({ from, url })
        done();
    })

})