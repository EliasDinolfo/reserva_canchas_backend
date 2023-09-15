import express, { NextFunction, Request, Response } from 'express'
import { Province } from './province.js'
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

app.use((_, res) => {
  return res.status(404).send({ message: 'Resource not found' })
})

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
