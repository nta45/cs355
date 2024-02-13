const express = require('express'), app = express(), cors = require('cors');

app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, This is the Dog\'s Breed BackEnd API')
});

const breedImages = {
    airedale: [
        "img/airedale/airedale1.jpg",
        "img/airedale/airedale2.jpg",
        "img/airedale/airedale3.jpg",
        "img/airedale/airedale4.jpg",
        "img/airedale/airedale5.jpg"
    ],
    akita: [
        "img/akita/akita1.jpg",
        "img/akita/akita2.jpg",
        "img/akita/akita3.jpg",
        "img/akita/akita4.jpg",
        "img/akita/akita5.jpg"
    ],
    appenzeller: [
        "img/appenzeller/appenzeller1.jpg",
        "img/appenzeller/appenzeller2.jpg",
        "img/appenzeller/appenzeller3.jpg",
        "img/appenzeller/appenzeller4.jpg",
        "img/appenzeller/appenzeller5.jpg"
    ],
    labrador: [
        "img/labrador/labrador1.jpg",
        "img/labrador/labrador2.jpg",
        "img/labrador/labrador3.jpg",
        "img/labrador/labrador4.jpg",
        "img/labrador/labrador5.jpg"
    ],
    african: [
        "img/african/african1.jpg",
        "img/african/african2.jpg",
        "img/african/african3.jpg",
        "img/african/african4.jpg",
        "img/african/african5.jpg"
    ]
};

app.get('/breeds', (req, res) => {
    const objToSend = { message: {} };
    Object.keys(breedImages).forEach(breed => {
        objToSend.message[breed] = [];
    });
    res.send(objToSend);
})

app.get('/image/:breed', (req, res) => {
    let thebreed = req.params.breed;
    const randInt = n => Math.floor(n * Math.random());
    const getRandomItemFromArray = arr => arr[randInt(arr.length)];
    const imagePath = getRandomItemFromArray(breedImages[thebreed]);

    // res.sendFile(imagePath, { root: __dirname }); // If you want to send the image file
    res.send({ message: imagePath });
});

app.get('*', (req, res) => {
    res.send('Error 404: Page not found');
});

app.listen(3000);