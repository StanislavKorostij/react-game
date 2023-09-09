const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')

const animals = require("./animals.json")

const updatedAnimals = animals
let balance = 100

const probability = (percentage) => {
  return Math.random() * 100 < percentage
}

app.use(cors())

app.use(express.json())

app.use('/', router)

app.listen(3000, () => {
  console.log('Listening on 3000')
})

app.get('/', (request, response) => {
  const status = updatedAnimals.map(animal => ({ id: animal.id, name: animal.name, imageUrl: animal.imageUrl }))

  response.send(status)
})

app.get('/animal/:id', (request, response) => {
  const animal = updatedAnimals.find(animal => animal.id === request.params.id && { name: animal.name, imageUrl: animal.imageUrl, feedCost: animal.feedCost, produces: animal.produces })

  const hungerDrop = Number(animal.hunger) - Math.floor(Math.random() * 3)

  if (hungerDrop <= 0) animal.hunger = '0'
  else animal.hunger = hungerDrop.toString()

  if (probability(Number(animal.produces.rate)) && animal.produced.length < 6) {
    animal.produced.push({ material: animal.produces.material, imageUrl: animal.produces.imageUrl, price: animal.produces.price, action: animal.produces.action })
  }

  response.send({ animal: animal, balance: balance })
})

app.put('/animal/:id', (request, response) => {
  const animal = updatedAnimals.find(animal => animal.id === request.params.id && { name: animal.name, imageUrl: animal.imageUrl, feedCost: animal.feedCost, produces: animal.produces })

  if (request.body.action === 'feed') {
    if (balance >= Number(animal.feedCost) && Number(animal.hunger) < 100) {
      balance = balance - Number(animal.feedCost)
      let hungerBump = Number(animal.hunger) + (Math.floor(Math.random() * 5) + 3)
  
      if (hungerBump > 100) hungerBump = 100
  
      animal.hunger = hungerBump.toString()
    }
  }

  if (request.body.action === 'sell') {
    balance = balance + Number(animal.produces.price)
    animal.produced = animal.produced.slice(0, -1)
  }

  response.send({ animal: animal, balance: balance })
})