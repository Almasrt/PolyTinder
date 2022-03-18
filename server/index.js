const express = require('express')
const {v4: uuidv4} = require("uuid")
const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
const uri = process.env.URI
const PORT = 9000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("Hello to my app")
})

app.post('/signup', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body
    const generatedUserId = uuidv4()
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const filters = database.collection('filters')
        const socials = database.collection('socials')

        const existingUser = await users.findOne({email})
        if (existingUser) {
            return res.status(409).send('User already exists')
        }
        const sanitizedEmail = email.toLowerCase()
        const data = {
            user_id: generatedUserId,
            email: sanitizedEmail, 
            hashed_password: hashedPassword,
            status: "basic"
        }

        const dataFilters = {
            user_id: generatedUserId, 
        }

        const dataSocials = {
            user_id: generatedUserId,
        }

        const insertedUser = await users.insertOne(data)
        const insertedUserSocials = await socials.insertOne(dataSocials)
        const insertedUserFilters = await filters.insertOne(dataFilters)
        const token = jwt.sign(insertedUser, sanitizedEmail, {
            expiresIn: 60 * 24,
        })
        res.status(201).json({token, userId: generatedUserId})
    } catch (err) {
        console.log(err)
    }
})

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri)
    const {email, password} = req.body
    
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const user = await users.findOne({email})
        
        if (user === null){
            res.status(408).send('Invalid credentials')
        }
        else {
            const correctPassword = await bcrypt.compare(password, user.hashed_password)
            if (user && correctPassword) {
                const token = jwt.sign(user, email, {
                    expiresIn: 60 * 24
                })
                res.status(201).json({token, userId: user.user_id})
            }
        }
        
    } catch (err) {
        console.log(err)
    }
})

app.get('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const query = { user_id: userId }
        const user = await users.findOne(query)
        res.send(user)
    } finally {
        await client.close()
    }
})

app.get('/socials', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('data')
        const socials = database.collection('socials')

        const query = { user_id: userId }
        const user = await socials.findOne(query)
        res.send(user)
    } finally {
        await client.close()
    }
})

app.get('/filters', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId

    try {
        await client.connect()
        const database = client.db('data')
        const filters = database.collection('filters')

        const query = { user_id: userId }
        const user = await filters.findOne(query)
        res.send(user)
    } finally {
        await client.close()
    }
})



app.get('/users', async (req, res) => {
    const client = new MongoClient(uri)
    const userIds = JSON.parse(req.query.userIds)
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        const pipeline = 
        [
            {
                '$match': {
                    'user_id': {
                        '$in': userIds

                    }
                }
            }
        ]

        const foundUsers = await users.aggregate(pipeline).toArray()
        res.send(foundUsers)
    } finally {
        await client.close()
    }
})

app.get('/gendered-users', async (req, res) => {
    const client = new MongoClient(uri)
    const gender = req.query.gender
    const userId = req.query.userId
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const query = { user_id: { $ne : userId } }
        const query2 = { user_id: { $ne : userId }, gender_identity: { $eq: gender }}
        if (gender == 'everyone'){
            foundUsers = await users.find(query)
        }
        if (gender != 'everyone') {
            foundUsers = await users.find(query2)
        }
        
        const retfoundUsers = await foundUsers.toArray()
        res.send(retfoundUsers)
    }
    finally{
        await client.close()
    }
})

app.put('/user', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const filters = database.collection('filters')
        const socials = database.collection('socials')
        const query = { user_id: formData.user_id }
        const updateDocument = { 
            $set: {
                first_name: formData.first_name, 
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year, 
                show_gender: formData.show_gender, 
                gender_identity:formData.gender_identity, 
                gender_interest: formData.gender_interest, 
                url: formData.url, 
                about: formData.about, 
                age: formData.age,
                matches: formData.matches
            }
        }
        const updateDocumentFilter = {
            $set: {
                age_min: formData.age_min,
                age_max: formData.age_max
            }
        }

        const updateDocumentSocials = {
            $set: {
                insta: formData.insta,
                snap: formData.snap,
                facebook: formData.facebook
            }
        }

        const insertedUserSocials = await socials.updateOne(query, updateDocumentSocials)
        const insertedUser = await users.updateOne(query, updateDocument)
        const insertedUserFilters = await filters.updateOne(query, updateDocumentFilter)
        res.send(insertedUser)
    } finally {
        await client.close()
    }
})

app.put('/addmatch', async (req, res) => {
    const client = new MongoClient(uri)
    const { userId, matchedUserId } = req.body
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')

        
        const query = { user_id: userId }
        const updateDocument = {
            $push: { matches: { user_id: matchedUserId }}, 
        }
        const user = await users.updateOne(query, updateDocument)
        res.send(user)
    } finally {
        await client.close() 
    }
})

app.get('/messages', async (req, res) => {
    const client = new MongoClient(uri)
    const {userId, correspondingUserId} = req.query
    try {
        await client.connect()
        const database = client.db('data')
        const messages = database.collection('messages')

        const query = {
            from_userId: userId, to_userId: correspondingUserId
        }
        const foundMessages = await messages.find(query).toArray()
        res.send(foundMessages)
    } finally {
        await client.close() 
    }
})

app.post('/message', async (req, res) => {
    const client = new MongoClient(uri)
    const message = req.body.message

    try {
        await client.connect()
        const database = client.db('data')
        const messages = database.collection('messages')
        const insertedMessage = await messages.insertOne(message)
        res.send(insertedMessage)
    } finally {
        await client.close() 
    }
})

app.put('/userUp', async (req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.user
    const formSocials = req.body.socials
    const formFilters = req.body.filters
    console.log(formFilters)
    console.log(formSocials)
    console.log(formData)
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const filters = database.collection('filters')
        const socials = database.collection('socials')
        const query = { user_id: formData.user_id }
        const updateDocument = { 
            $set: {
                first_name: formData.first_name, 
                dob_day: formData.dob_day,
                dob_month: formData.dob_month,
                dob_year: formData.dob_year, 
                show_gender: formData.show_gender, 
                gender_identity:formData.gender_identity, 
                gender_interest: formData.gender_interest, 
                url: formData.url, 
                about: formData.about, 
                age: formData.age,
                matches: formData.matches
            }
        }

        const updateDocumentFilter = {
            $set: {
                age_min: formFilters.age_min,
                age_max: formFilters.age_max
            }
        }

        const updateDocumentSocials = {
            $set: {
                insta: formSocials.insta,
                snap: formSocials.snap,
                facebook: formSocials.facebook
            }
        }

        const insertedUser = await users.updateOne(query, updateDocument)
        const insertedUserSocials = await socials.updateOne(query, updateDocumentSocials)
        const insertedUserFilters = await filters.updateOne(query, updateDocumentFilter)
        res.send(insertedUser)
    } finally {
        await client.close()
    }
})

app.delete('/userDel', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const socials = database.collection('socials')
        const filters = database.collection('filters')
        const deleteFilters = await filters.deleteOne(userId)
        const deleteSocials = await socials.deleteOne(userId)
        const deleteUser = await users.deleteOne(userId)
        console.log(deleteUser)
        res.send(deleteUser)

    } finally {
        await client.close()
    }
})

app.get('/premium-list', async (req, res) => {
    const client = new MongoClient(uri)
    const userId = req.query.userId
    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        let foundUsers = []
        
        const allUsers = await users.find().toArray()
        for (i in allUsers) {
            for (j in allUsers[i].matches) {
                const likedUserId = allUsers[i].matches[j].user_id
                const liker = allUsers[i]
                if(likedUserId === userId){
                    foundUsers.push(liker)
                }
            }
        }
        res.send(foundUsers)
    }
    finally{
        await client.close()
    }
})

app.get('/verify-code', async (req, res) => {
    const client = new MongoClient(uri)
   
    const clientCode = req.query.code
    try {
        await client.connect()
        const database = client.db('data')
        const codes = database.collection('codes')
        const query = { code: clientCode }
        const codeFound = await codes.findOne(query)
        res.send(codeFound)
    } finally{
        await client.close()
    }
})

app.put('/change-status', async (req, res) => {
    const client = new MongoClient(uri)
    const newStatus = req.body.newUserStatus
    const userId = req.body.userId

    try {
        await client.connect()
        const database = client.db('data')
        const users = database.collection('users')
        const query = { user_id: userId }
        const updateDocument = { 
            $set: {
                status: newStatus
            }
        }       
        const updatedUser = await users.updateOne(query, updateDocument)
        res.send(updatedUser)
    } finally {
        await client.close()
    }
})

app.post('/new-code', async (req, res) => {
    const client = new MongoClient(uri)
    const newCode = req.body.code
    try {
        await client.connect()
        const database = client.db('data')
        const codes = database.collection('codes')

        const query = { code: newCode }
        const foundCode = await codes.findOne(query)

        if(foundCode !== null){
            res.status(408).send("Code already added")
        }
        
        else {
            const silver = newCode.startsWith('s')
            const gold = newCode.startsWith('g')
            let newLevel = ""
            if(silver){
                newLevel = "silver"
            }
            else if(gold){
                newLevel = "gold"
            }
            else{
                res.status(408).send("Invalid code")
            }

            const data = {
                code: newCode,
                level: newLevel
            }
            const insertedCode = await codes.insertOne(data)
            res.send(insertedCode)
        }
    } finally {
        await client.close()
    }
})

app.get('/age-filters', async (req, res) => {
    
    const client = new MongoClient(uri)
    const userId = req.query.userId
    try {
        await client.connect()
        const database = client.db('data')
        const filters = database.collection('filters')
        const users = database.collection('users')

        const query = { user_id: { $eq : userId }}
        const foundFilters = await filters.findOne(query)
        const ageMax = Number(foundFilters.age_max)
        const ageMin = Number(foundFilters.age_min)
        query2 = { age: { $lte: ageMax, $gte: ageMin }}
        
        foundUsers = await users.find(query2)
        
        const foundUsersArray = await foundUsers.toArray()

        res.send(foundUsersArray)
    }
    finally{
        await client.close()
    }
})




app.listen(PORT, () => console.log('server running on PORT ' + PORT ))