// Importo bibliotecas
const request = require('supertest');
const app = require('../../app')

// Test users
describe ('user', () => {

    var token = ""
    var id = ""

    // POST (Register)
    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({"username": "Harbor",
                "fullname": "Varun Batra",
                "description": "From India",
                "email": "agent123@mail.com",
                "profile_pic": "https://static.wikia.nocookie.net/valorant-lore/images/8/8a/Harbor_-_Avatar.png/revision/latest?cb=20230628090433",
                "pwd": "b3_w4t3r"
            })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.user.email).toEqual('agent123@mail.com')
        expect(response.body.user.role).toEqual('user')
        token = response.body.token
        id = response.body.user._id
    })

    // GET (ALL)
    it('should get the users', async () => {
        const response = await request(app)
            .get('/api/user/')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.pop().username).toEqual("Harbor");
    });

      // GET (By ID)
      it('should get a user by ID', async () => {
        const response = await request(app)
            .get('/api/user/'+id) 
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
        expect(response.body.pop().username).toEqual('Harbor');
    });

    // PUT (Update)
    it('should update a user', async () => {
        const response = await request(app)
            .put('/api/user/'+id) 
            .auth(token, { type: 'bearer' })
            .send({
                fullname: "Varun",
                description: "Controller."
            })
            .set('Accept', 'application/json')
            .expect(200);
        
        expect(response.body.pop().fullname).toEqual('Varun');
    });

    // DELETE(logical)
    it('should archive a user', async () => {
        const response = await request(app)
            .delete('/api/auth/user/logical/'+id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })

    // DELETE (physical)
    it('should delete a user', async () => {
        const response = await request(app)
            .delete('/api/auth/user/physical/'+id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200)
        expect(response.body.acknowledged).toEqual(true)
    })
}
)