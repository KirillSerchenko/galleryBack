const express = require('express');
const router = express.Router();
const service =require('../DbService/DbService')
let dbService; 


router.use(async(req,res,next)=>{
    if(dbService == undefined){
      dbService = new service()
      const x= await dbService.initDatabase()
    }
    next()
})

/* GET users listing. */
router.post('/', (req, res)=>{
  const date = (Date(Date.now())).toString()
  const re = /#[A-Za-z]+\b/g;
  const description = req.body.text.toLowerCase()
  const desc = description.split(' ').filter(str=>{
        if(str.includes('#')){}
        else return str
        }).join(' ')

  const tagsArray =[]
  let xArray; 
  while(xArray = re.exec(description)) 
    tagsArray.push(xArray[0])

  const uniqTagArray = [... new Set(tagsArray)]

  dbService.insertOne({path:`${req.protocol}://${req.get('host')}/static/upload_images/${req.files.myFile.name}`,tags:uniqTagArray,description:desc,date:date},'Images')  
  
  req.files.myFile.mv(`./public/upload_images/${req.files.myFile.name}`, function(err) {
    if (err)
      return res.status(500).send(err);
  })
  
  res.send({src:`${req.protocol}://${req.get('host')}/static/upload_images/${req.files.myFile.name}`})
})


router.get('/',async (req,res)=>{
  const data= await dbService.getAll('Images')
  res.send(data)
})


router.get('/:search',async (req,res)=>{
  const tempTag=`#${req.params.search}`
  const data= await dbService.getAll('Images')
  const arr =[]
  data.forEach(image=>{
    image.tags.forEach(tag=>{
      tag==tempTag?arr.push(image):null
    })
  })
  res.send(arr)
})


module.exports = router;
