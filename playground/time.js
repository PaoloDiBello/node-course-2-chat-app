const moment = require('moment');

createdAt = 1234
const date = moment(createdAt);
console.log(date.format('MMM Do, YYYY'));

// hh:hh am/pm
console.log(date.format('h:mm a'));
