// Importo bibliotecas
const request = require('supertest');
const app = require('../../app');

describe('Follower API', () => {
    let token = "";
    let userId = "";
    let followerId = "";

    // POST (Register -> Obtener token)
    beforeAll(async () => {
        const userResponse = await request(app)
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
        
        expect(userResponse.body.user.email).toEqual('agent123@mail.com');
        token = userResponse.body.token;
        userId = userResponse.body.user._id;

        // Registro el usuario que seguirá
        const followerResponse = await request(app)
            .post('/api/auth/register')
            .send({
                username: "Sova",
                fullname: "Sasha Novikov",
                description: "From Russia",
                email: "thehunter@mail.com",
                profile_pic: "https://static.wikia.nocookie.net/valorant/images/4/49/Sova_icon.png/revision/latest?cb=20220314032929&path-prefix=id",
                pwd: "sh0ck_d4rt"
            })
            .set('Accept', 'application/json')
            .expect(200);
        
        followerId = followerResponse.body.user._id;
    });

    // POST 
    it('should follow a user', async () => {
        const response = await request(app)
            .post('/api/follower')
            .auth(token, { type: 'bearer' })
            .send({
                followerId: followerId
            })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // GET
    it('should get all followers', async () => {
        const response = await request(app)
            .get('/api/followers/'+followerId)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });

    // DELETE 
    it('should unfollow a user', async () => {
        const response = await request(app)
            .delete('/api/follower/'+followerId)
            .auth(token, { type: 'bearer' })
            .set('Accept', 'application/json')
            .expect(200);
        
            expect(response.body.acknowledged).toEqual(true)
    });
});