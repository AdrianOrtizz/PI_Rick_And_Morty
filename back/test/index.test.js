const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

const char = {
    id: 1,
    name: "rick",
    species: "human",
    gender: "",
    status: "",
    origin: "",
    image: "",
}

const char2 = {
    id: 2,
    name: "morty",
    species: "human",
    gender: "",
    status: "",
    origin: "",
    image: "",
}

describe('Test de RUTAS', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200);
        });

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
            const response = await agent.get('/rickandmorty/character/1')
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("name");
            expect(response.body).toHaveProperty("species");
            expect(response.body).toHaveProperty("gender");
            expect(response.body).toHaveProperty("status");
            expect(response.body).toHaveProperty("origin");
            expect(response.body).toHaveProperty("image");
        })

        it('Si hay un error responde con status: 500', async () => {
            await agent.get('/rickandmorty/character/a99').expect(404);
        })
    })

    describe('GET /rickandmorty/login', () => {
        it('Responde con un objeto con una propiedad access con el valor true en caso de que las credenciales sean válidas', async () => {
            await agent.get('/rickandmorty/login?email=adrianortizzt1vl@gmail.com&password=1234').expect({access: true});
        });

        it('Responde con un objeto con una propiedad access con el valor false en caso de que las credenciales no sean válidas', async () => {
            await agent.get('/rickandmorty/login?email=aaaaa@gmail.com&password=4321').expect({access: false});
        })
    })

    describe('POST /rickandmorty/fav', () => {
        it('Se envía un personaje por body y se devuelve un arreglo con ese personaje', async () => {
            const response = await agent.post('/rickandmorty/fav').send(char);
            expect(response.body).toEqual([char])
        });

        it('Se envía otro personaje por body y el personaje anterior debe seguir en el arreglo antes de agregar este', async () => {
            const response = await agent.post('/rickandmorty/fav').send(char2);
            expect(response.body).toEqual([char, char2])
        })
    })

    describe('DELETE /rickandmorty/fav/:id', () => {

        it('De no ingresar un id válido, se debe devolver el arreglo sin ningún cambio', async () => {
            const response = await agent.delete('/rickandmorty/fav/a9');
            expect(response.body).toEqual([char, char2])
        })

        it('Al ingresar un id valido, el personaje se debe eliminar de la lista de favoritos', async () => {
            const response = await agent.delete('/rickandmorty/fav/1');
            expect(response.body).toEqual([char2])
        })
    })
})