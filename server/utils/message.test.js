var expect = require('expect')

var { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {

        const text = 'Hi there!';
        const from = 'admin';

        const message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({ from, text })
    })
})