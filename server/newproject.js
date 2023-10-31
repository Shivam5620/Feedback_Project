const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'NEWPROJECT';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let db, coll1, coll2, coll3, coll4, coll5;

app.listen(2000, () => {
  const client = new MongoClient(CONNECTION_URL)

  client.connect();
  db = client.db(DATABASE_NAME);
  coll1 = db.collection('userregistration');
  coll2 = db.collection('adminlogin');
  coll3 = db.collection('brand');
  coll4 = db.collection('products');
  coll5 = db.collection('review')
  console.log('Connected to ' + DATABASE_NAME);
});

app.post('/userreg', async (request, response) => {
  const res1 = await coll1.insertOne(request.body);
  response.send(res1);
});

app.get('/userreg', async (request, response) => {
  const res1 = await coll1.find({}).toArray();
  response.send(res1);
});

app.delete('/userreg/:id', async (request, response) => {
  var res1 = await coll1.deleteOne({ "fullname": request.params.id })
  response.send(res1)
})


app.post('/userlogin', async (request, response) => {
  const res1 = await coll1.findOne({ "email": request.body.email, "password": request.body.password })
  if (res1 != null) {
    response.send({ "status": "1", "msg": "login success" })
  }
  else {
    response.send({ "msg": "login failed" })
  }

})
app.post('/adminlogin', async (request, response) => {
  const res2 = await coll2.findOne({ "email": request.body.email, "password": request.body.password })
  if (res2 != null) {
    response.send({ "status": "1", "msg": "login success" })
  }
  else {
    response.send({ "msg": "login failed" })
  }
})
app.get('/brands', async (request, response) => {
  var res3 = await coll3.find({}).toArray()
  response.send(res3)
})
app.post('/brands', async (request, response) => {
  var res3 = await coll3.insertOne(request.body)
  response.send(res3)
})
app.put('/brands/:id', async (request, response) => {
  var res3 = await coll3.updateOne({ "brand_id": request.params.id }, {
    $set: request.body
  })
  response.send(res3)
})
app.delete('/brands/:id', async (request, response) => {
  var res3 = await coll3.deleteOne({ "brand_id": request.params.id })
  response.send(res3)
})

app.get('/productlist', async (request, response) => {
  var res4 = await coll4.find({}).toArray()
  response.send(res4)
})

app.post('/productlist', async (request, response) => {
  var res4 = await coll4.insertOne(request.body)
  response.send(res4)
})
app.put('/productlist/:id', async (request, response) => {
  var res4 = await coll4.updateOne({ "product_id": request.params.id }, {
    $set: request.body
  })
  response.send(res4)
})
app.delete('/productlist/:id', async (request, response) => {
  var res4 = await coll4.deleteOne({ "product_id": request.params.id })
  response.send(res4)
})
app.get('/productlist/:id', async (request, response) => {
  var res4 = await coll4.find({ "brand_id": request.params.id }).toArray()
  response.send(res4)
})




// Route to get product information based on product_id
app.get('/product/:product_id', async (request, response) => {
  const { product_id } = request.params;
  try {
    const product = await coll4.findOne({ product_id }); // Assuming you have a collection named coll4 for products
    if (!product) {
      return response.status(404).json({ error: 'Product not found' });
    }
    response.json(product);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' });
  }
});








app.get('/productbyimg/:id', async (request, response) => {
  var res4 = await coll4.find({ "product_id": request.params.id }).toArray()
  response.send(res4)
})
app.post('/review', async (request, response) => {
  var res5 = await coll5.insertOne(request.body)
  response.send(res5)
})
app.get('/review', async (request, response) => {
  var res5 = await coll5.find({}).toArray()
  response.send(res5)
})
app.get('/averageRating', async (request, response) => {
  try {
    const result = await coll5.aggregate([
      {
        $group: {
          _id: "$product_id",
          averageRating: {
            $avg: { $toInt: "$rating" }
          }
        }
      },
      {
        $project: {
          product_id: "$_id",
          _id: 0,
          averageRating: 1
        }
      }
    ]).toArray();

    response.json(result);
  } catch (error) {
    response.status(500).json({ error: 'An error occurred' });
  }
});
