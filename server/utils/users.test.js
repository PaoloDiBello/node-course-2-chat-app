var expect = require('expect')

var { Users } = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: '1',
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jen',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Julie',
                room: 'Node Course'
            }];
    });

    it('should add new User', () => {
        const users = new Users;
        const user = {
            id: '123',
            name: 'Yawh',
            room: 'roomie'
        }
        const res = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user])
        expect(res).toBeAn(Object);
    });

    it('should return names for node course', () => {
        const room = 'Node Course';
        const userList = users.getUserList(room);
        expect(userList).toEqual(['Mike', 'Julie']);
    })

    it('should return names for react course', () => {
        const room = 'React Course';
        const userList = users.getUserList(room);
        expect(userList).toEqual(['Jen']);
    })




    it('should remove a user', () => {
        const id = '2';
        const user = users.removeUser(id);
        expect(user.id).toBe(id)
        expect(users.users.length).toBe(2);
    })

    it('should not remove a user', () => {
        const id = '0';
        const user = users.removeUser(id);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);

    })

    it('should find user', () => {
        const id = '1'
        const user = users.getUser(id);
        expect(user.id).toBe(id)
    })

    it('should not find user', () => {
        const id = '0'
        const user = users.getUser(id);
        expect(user).toNotExist()
    })



}); 