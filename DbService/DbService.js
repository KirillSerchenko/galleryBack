class DbService {
    
    async initDatabase(){
        const MongoClient = require('mongodb').MongoClient
        const client = await MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true })
        this.db = await client.db('GalleryDB')
        return true
    }

    async getAll(collectionName){
                const collection = await this.db.collection(collectionName)
                const result= await collection.find().toArray()
                return result
        }
        
    async insertOne(data,collectionName){
                const collection = await this.db.collection(collectionName)
                const result= await collection.insertOne(data)
                return result
            }
}

module.exports=DbService
