import Fastify from "fastify";


const fastify = Fastify({
    logger: true
  })

const teams = [
    {id: 1, name: "Mercedes", base: "Brackley, United Kingdom"},
    {id: 2, name: "Red Bull", base: "Milton Keynes, United Kingdom"},
    {id: 3, name: "Ferrari", base: "Maranello, Italy"},
    {id: 4, name: "McLaren", base: "Woking, United Kingdom"},
    {id: 5, name: "Alpine", base: "Enstone, United Kingdom"},
    {id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom"},
    {id: 7, name: "AlphaTauri", base: "Faenza, Italy"},
    {id: 8, name: "Sauber", base: "Hinwil, Switzerland"},
    {id: 9, name: "Haas", base: "Kannapolis, United States"},
    {id: 10, name: "Williams", base: "Grove, United Kingdom"}
    
]

const drivers = [
    {id: 1, name: "Lewis Hamilton", team: teams[0], contractEnd: 2024},
    {id: 2, name: "George Russell", team: teams[0], contractEnd: 2025},
    {id: 3, name: "Max Verstappen", team: teams[1], contractEnd: 2028},
    {id: 4, name: "Sergio Perez", team: teams[1], contractEnd: 2024},
    {id: 5, name: "Charles Leclerc", team: teams[2], contractEnd: 2024},
    {id: 6, name: "Carlos Sainz", team: teams[2], contractEnd: 2024},
    {id: 7, name: "Lando Norris", team: teams[3], contractEnd: 2025},
    {id: 8, name: "Oscar Piastri", team: teams[3], contractEnd: 2026},
    {id: 9, name: "Esteban Ocon", team: teams[4], contractEnd: 2024},
    {id: 10, name: "Pierre Gasly", team: teams[4], contractEnd: 2024},
    {id: 11, name: "Fernando Alonso", team: teams[5], contractEnd: 2024},
    {id: 12, name: "Lance Stroll", team: teams[5], contractEnd: 2024},
    {id: 13, name: "Yuki Tsunoda", team: teams[6], contractEnd: 2024},
    {id: 14, name: "Daniel Ricciardo", team: teams[6], contractEnd: 2024},
    {id: 15, name: "Valtteri Bottas", team: teams[7], contractEnd: 2024},
    {id: 16, name: "Zhou Guanyu", team: teams[7], contractEnd: 2024},
    {id: 17, name: "Kevin Magnussen", team: teams[8], contractEnd: 2024},
    {id: 18, name: "Nico Hulkenberg", team: teams[8], contractEnd: 2024},
    {id: 19, name: "Alex Albon", team: teams[9], contractEnd: 2024},
    {id: 20, name: "Logan Sargeant", team: teams[9], contractEnd: 2024}
]

interface DriveParams {
    id: string
}

interface TeamParams {
    id: string
}

fastify.get<{ Params: DriveParams }>("/drivers/:id", async (request, reply) => {
    const id = parseInt(request.params.id as unknown as string)  // Converte string para número
    const driver = drivers.find((d) => d.id === id)

    if (!driver) {
        reply.type('application/json').code(404)
        return { Error: 'Driver Não Encontrado!' }
    } else {
        reply.type('application/json').code(200)
        return { driver }
    }
})

fastify.get<{ Params: TeamParams }>("/teams/:id", async (request, reply) => {
    const id = parseInt(request.params.id as unknown as string);  // Converte string para número
    const team = teams.find((t) => t.id === id);

    if (!team) {
        reply.type('application/json').code(404)
        return { Error: 'Team Não Encontrado!' }
    } else {
        reply.type('application/json').code(200)
        return { team }
    }
})


  fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200)
    return { hello: 'world' }
  })

  fastify.get("/teams", async(request, reply) => {
    return [teams]
  })

  fastify.get("/drivers", async(request, reply) => {
    return[drivers]
  })

  fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    console.log('Servidor funcionando na porta: 3000')
  })

