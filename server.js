const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')

app.use(cors())

app.get('/file/:filename', (req, res) => {
    const { filename } = req.params

    console.log(filename)

    const filePath = path.join(__dirname, `files/${filename}.pdf`)

    res.sendFile(filePath)
})

app.listen(3001, () => {
    console.log('Сервер запущен на порту 3001')
})
