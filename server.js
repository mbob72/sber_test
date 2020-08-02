const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const faker = require('faker')
const delay = 1000

server.use(jsonServer.defaults())

server.get('/users', async (req, res) => {
    await new Promise(res => setTimeout(res, delay))
    const result = {
        users: Array(20)
            .fill()
            .map(_ => ({
                name: faker.name.findName(),
                email: faker.internet.email()
            }))
    }
    res.jsonp(result.users)
})

server.use(router)

server.listen(4000)
