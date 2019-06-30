[{
    id: '/#12poiajdspfoif',
    name: 'Andrew',
    room: 'The Office Fans'
}]

// addUser(id, name, room)

// removeUser(id)

//getUser(id)

//getUserList(room)

var users = [];


class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        const user = { id, name, room };
        this.users.push(user);
        return user;
    }
    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    removeUser(id) {
        const user = this.getUser(id)
        if (user) {
            this.users = this.users.filter(user => user.id != id);
        }

        return user;
    }

    getUserList(room) {
        return this.users.filter(user => user.room === room)
            .map(user => user.name)
    }


}


// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`;
//     }

// }


// var me = new Person('John', 99);
// console.log(
//     me.getUserDescription()
// );


module.exports = {
    Users
}
