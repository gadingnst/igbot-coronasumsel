const { Router } = require('express')
const { SECRET_CODE } = require('./config')
const { publishPost } = require('./instagram')

const route = Router()

route.get('/publish', async (req, res) => {
  const { secret } = req.query

  if (secret !== SECRET_CODE) {
    return res.status(403).send({
      code: 403,
      message: 'Access Forbidden.',
      error: false
    })
  }

  try {
    await publishPost()
    return res.status(200).send({
      code: 200,
      message: 'Success Publishing Post!',
      error: false
    })
  } catch (error) {  
    console.error('An error occured:', error)
    return res.status(500).send({
      code: 500,
      message: 'Something went wrong, try again later.',
      error
    })
  }
})

module.exports = route
