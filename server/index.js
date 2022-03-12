const express = require('express')
const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://test:test@cluster0.tmybi.mongodb.net/Cluster0?retryWrites=true&w=majority'

const app = express()
const PORT = 8000


app.get('/', (req, res) => {
    res.json("Hello to my app")
})

app.post('/signup', (req, res) => {
    req.json('Hello to my app')
})

app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const returnedUsers = await users.find().toArray()
        res.send(returnedUsers)
    }
    finally{
        await client.close()
    }
})

app.listen(PORT, () => console.log('server running on PORT ' + PORT ))