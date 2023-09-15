import express, { NextFunction, Request, Response } from 'express'
import { Province } from './province.js'
import { City } from './city.js'
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

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
