// Importo bibliotecas
const request = require('supertest');
const app = require('../../app');

describe('Post API', () => {
    var token = "";
    var id = "";

    // POST (Register -> Obtener token)
    it('should register a user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: "Harbor",
                fullname: "Varun Batra",
                description: "From India",
                email: "agent123@mail.com",
                profile_pic: "https://static.wikia.nocookie.net/valorant-lore/images/8/8a/Harbor_-_Avatar.png/revision/latest?cb=20230628090433",
                pwd: "b3w4t3r"
            })
            .set('Accept', 'application/json')
            .expect(200);
        
        expect(response.body.user.email).toEqual('agent123@mail.com');
        token = response.body.token;
    });

    // POST (Create Post)
    it('should create a post', async () => {
        const response = await request(app)
            .post('/api/post')
            .auth(token, { type: 'bearer' })
            .send({
                txt: 'Este es un post de prueba'
            })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
        id = response.body._id;
    });

    // GET (All Posts)
    it('should get all posts', async () => {
        const response = await request(app)
            .get('/api/post')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // GET (Post by ID)
    it('should get a post by ID', async () => {
        const response = await request(app)
            .get('/api/post/'+id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // PUT (Update Post)
    it('should update a post', async () => {
        const response = await request(app)
            .put('/api/post/'+id)
            .auth(token, { type: 'bearer' })
            .send({
                txt: 'Este es un post actualizado'
            })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // DELETE
    it('should delete a post logically', async () => {
        const response = await request(app)
            .delete('/api/post/'+id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });
});