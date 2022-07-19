describe('books endpoints', () => {
    let api;
    beforeEach(async () => {
        await resetTestDB()
    });

    beforeAll(async () => {
        api = app.listen(5000, () => console.log('Test server running on port 5000'))
    });

    afterAll(async () => {
        console.log('Gracefully stopping test server')
        await api.close()
    })

    it('should return a list of all habits in the database', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(2);
    });

    /*it('should create a new habit by a user', async () => {
        const res = await request(api)
            .post('/habits')
            .send({
                title: 'New Book',
                authorName: 'Test Author 1'
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        const authRes = await request(api).get('/authors/1');
        expect(authRes.body.books.length).toEqual(3);
    });*/

    it('should create a new book by a new author', async () => {
        const res = await request(api)
            .post('/books')
            .send({
                title: 'Another New Book',
                authorName: 'New Test Author'
            })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        // console.log(res);
        const authRes = await request(api).get('/authors/3');
        // console.log(authRes);
        expect(authRes.statusCode).toEqual(200);
        expect(authRes.body.books.length).toEqual(1);

    });
})
