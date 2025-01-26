// Importo bibliotecas
const request = require('supertest');
const app = require('../../app');

describe('like', () => {
    var token = "";
    let userId = "";
    let postId = "";
    let likeId = "";

     // POST (Register -> Obtener token)
     it('should register a user',async () => {
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
        userId = userResponse.body.user._id;
    });
        // Creo un post para darle like
    it('should create a post',async () => {
        const response = await request(app)
            .post('/api/post')
            .auth(token, { type: 'bearer' })
            .send({
                txt: 'Este es un post de prueba para likes'
            })
            .set('Accept', 'application/json')
            .expect(200);
        postId = response.body._id;
    });

    // POST (Create like)
    it('should create a like', async () => {
        const response = await request(app)
            .post('/api/post')
            .auth(token, { type: 'bearer' })
            .send({
                postId: postId
            })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
        likeId = response.body._id;
    });

    // GET (All likes)
    it('should get all likes', async () => {
        const response = await request(app)
            .get('/api/like')
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // GET (Like by ID)
    it('should get a like by ID', async () => {
        const response = await request(app)
            .get('/api/like/'+id)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // PUT (Update Like)
    it('should update a like', async () => {
        const response = await request(app)
            .put('/api/post/'+likeId)
            .auth(token, { type: 'bearer' })
            .send({
                txt: 'Este es un post actualizado'
            })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // DELETE
    it('should delete a like', async () => {
        const response = await request(app)
            .delete('/api/post/'+likeId)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    })
});