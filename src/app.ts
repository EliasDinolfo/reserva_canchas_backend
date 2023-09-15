import express, { NextFunction, Request, Response } from 'express'
import { Province } from './province.js'
import { City } from './city.js'
import { User } from './user.js'
//import { it } from 'node:test'

const app = express()
app.use(express.json())

//province -> /api/provinces/

//post /api/provinces -> crear nuevos province
//delete /api/provinces/:id -> borrar province con id = :id
//put & patch /api/provinces/:id -> modificar province con id = :id

const provinces = [
  new Province(
    'Santa Fe'
  ),
  new Province(
    'Buenos Aires'
  ),
  new Province(
    'Cordoba'
  )
]

function sanitizeProvinceInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

app.get('/api/provinces', (req, res) => {
  res.json({ data: provinces })
})

app.get('/api/provinces/:id', (req, res) => {
  const province = provinces.find((province) => province.id === req.params.id)
  if (!province) {
    return res.status(404).send({ message: 'Province not found' })
  }
  res.json({ data: province })
})

app.post('/api/provinces', sanitizeProvinceInput, (req, res) => {
  const input = req.body.sanitizedInput

  const province = new Province(
    input.name
  )

  provinces.push(province)
  return res.status(201).send({ message: 'Province created', data: province })
})

app.put('/api/provinces/:id', sanitizeProvinceInput, (req, res) => {
  const provinceIdx = provinces.findIndex((province) => province.id === req.params.id)

  if (provinceIdx === -1) {
    return res.status(404).send({ message: 'Province not found' })
  }

  provinces[provinceIdx] = { ...provinces[provinceIdx], ...req.body.sanitizedInput }

  return res.status(200).send({ message: 'Province updated successfully', data: provinces[provinceIdx] })
})

/* app.patch('/api/provinces/:id', sanitizeProvinceInput, (req, res) => {
  const provinceIdx = provinces.findIndex((province) => province.id === req.params.id)

  if (provinceIdx === -1) {
    return res.status(404).send({ message: 'Province not found' })
  }

  Object.assign(provinces[provinceIdx], req.body.sanitizedInput)

  return res.status(200).send({ message: 'Province updated successfully', data: provinces[provinceIdx] })
}) */

app.delete('/api/provinces/:id', (req, res) => {
  const provinceIdx = provinces.findIndex((province) => province.id === req.params.id)

  if (provinceIdx === -1) {
    res.status(404).send({ message: 'Province not found' })
  } else {
    provinces.splice(provinceIdx, 1)
    res.status(200).send({ message: 'Province deleted successfully' })
  }
})

//city -> /api/cities/

//post /api/cities -> crear nuevos city
//delete /api/cities/:id -> borrar province con id = :id
//put & patch /api/cities/:id -> modificar city con id = :id

const cities = [
  new City(
    'San Nicolas',
    'e8d391bf-a98e-4c4e-ace4-9862ef523c30'
  ),
  new City(
    'Roldan',
    'e8d391bf-a98e-4c4e-ace4-9862ef523c54'
  ),
  new City(
    'Rosario',
    'e8d391bf-a98e-4c4e-ace4-9862ef523c54'
  )
]

function sanitizeCityInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    id_Province: req.body.id_Province
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

app.get('/api/cities', (req, res) => {
  res.json({ data: cities })
})

app.get('/api/cities/:id', (req, res) => {
  const city = cities.find((city) => city.id === req.params.id)
  if (!city) {
    return res.status(404).send({ message: 'City not found' })
  }
  res.json({ data: city })
})

app.post('/api/cities', sanitizeCityInput, (req, res) => {
  const input = req.body.sanitizedInput

  const city = new City(
    input.name,
    input.id_Province
  )

  cities.push(city)
  return res.status(201).send({ message: 'City created', data: city })
})

app.put('/api/cities/:id', sanitizeCityInput, (req, res) => {
  const cityIdx = cities.findIndex((city) => city.id === req.params.id)

  if (cityIdx === -1) {
    return res.status(404).send({ message: 'City not found' })
  }

  cities[cityIdx] = { ...cities[cityIdx], ...req.body.sanitizedInput }

  return res.status(200).send({ message: 'City updated successfully', data: cities[cityIdx] })
})

/* app.patch('/api/cities/:id', sanitizeCityInput, (req, res) => {
  const cityIdx = cities.findIndex((city) => city.id === req.params.id)

  if (cityIdx === -1) {
    return res.status(404).send({ message: 'City not found' })
  }

  Object.assign(cities[cityIdx], req.body.sanitizedInput)

  return res.status(200).send({ message: 'City updated successfully', data: cities[cityIdx] })
}) */

app.delete('/api/cities/:id', (req, res) => {
  const cityIdx = cities.findIndex((city) => city.id === req.params.id)

  if (cityIdx === -1) {
    res.status(404).send({ message: 'City not found' })
  } else {
    cities.splice(cityIdx, 1)
    res.status(200).send({ message: 'City deleted successfully' })
  }
})

//user -> /api/users/

//post /api/users -> crear nuevos user
//delete /api/users/:id -> borrar user con id = :id
//put & patch /api/users/:id -> modificar user con id = :id

const users = [
  new User(
    'Lionel',
    'Messi',
    '35899298',
    3414352353,
    'messi10@gmail.com',
    'Cliente',
    'liomessi10',
    'elmasgrande'
  ),
  new User(
    'Gabriel',
    'Ramirez',
    '41102345',
    3412435655,
    'gabo@gmail.com',
    'Administrador',
    'gab0cabj',
    'bokita'
  ),
  new User(
    'Agustin',
    'Lipari',
    '41799878',
    3364223746,
    'agus_lipari@gmail.com',
    'Operador',
    'lipaDoc',
    'millonario'
  )
]

function sanitizeUserInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    name: req.body.name,
    lastname: req.body.lastname,
    dni: req.body.dni,
    phone_number: req.body.phone_number,
    email: req.body.email,
    role: req.body.role,
    username: req.body.username,
    password: req.body.password
  }
  //more checks here

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

app.get('/api/users', (req, res) => {
  res.json({ data: users })
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find((user) => user.id === req.params.id)
  if (!user) {
    return res.status(404).send({ message: 'User not found' })
  }
  res.json({ data: user })
})

app.post('/api/users', sanitizeUserInput, (req, res) => {
  const input = req.body.sanitizedInput

  const user = new User(
    input.name,
    input.lastname,
    input.dni,
    input.phone_number,
    input.email,
    input.role,
    input.username,
    input.password
  )

  users.push(user)
  return res.status(201).send({ message: 'User created', data: user })
})

app.put('/api/users/:id', sanitizeUserInput, (req, res) => {
  const userIdx = users.findIndex((user) => user.id === req.params.id)

  if (userIdx === -1) {
    return res.status(404).send({ message: 'User not found' })
  }

  users[userIdx] = { ...users[userIdx], ...req.body.sanitizedInput }

  return res.status(200).send({ message: 'User updated successfully', data: users[userIdx] })
})

/* app.patch('/api/users/:id', sanitizeUserInput, (req, res) => {
  const userIdx = users.findIndex((user) => user.id === req.params.id)

  if (userIdx === -1) {
    return res.status(404).send({ message: 'User not found' })
  }

  Object.assign(users[userIdx], req.body.sanitizedInput)

  return res.status(200).send({ message: 'User updated successfully', data: users[userIdx] })
}) */

app.delete('/api/users/:id', (req, res) => {
  const userIdx = users.findIndex((user) => user.id === req.params.id)

  if (userIdx === -1) {
    res.status(404).send({ message: 'User not found' })
  } else {
    users.splice(userIdx, 1)
    res.status(200).send({ message: 'User deleted successfully' })
  }
})

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
