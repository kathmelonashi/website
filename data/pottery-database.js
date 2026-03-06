// Pottery Database
// To run the update script, run 'npm run update-gallery'

const potteryDatabase = [
    {
        "id": 0,
        "title": "Clock",
        "image": "images/pottery/clock.jpeg",
        "story": "This was my first slip-casting mold that I made. I found this metal plate at a vintage store in my neighborhood. Originally, I planned to turn to make a plate set using it, but when the first mold came out, it just felt like it wanted to be a clock.",
        "processImages": [
            "images/process/clock-1.jpeg",
            "images/process/clock-2.jpeg",
            "images/process/clock-3.jpeg",
            "images/process/clock-4.jpeg",
            "images/process/clock-5.jpeg",
            "images/process/clock-6.jpeg",
            "images/process/clock-7.jpeg",
            "images/process/clock-8.jpeg",
            "images/process/clock-9.jpeg",
            "images/process/clock-91.jpeg",
            "images/process/clock-92.jpeg",
            "images/process/clock-93.jpeg",
            "images/process/clock-94.jpeg",
            "images/process/clock-95.jpeg"
        ]
    },
    {
        "id": 1,
        "title": "Berry Strainer",
        "image": "images/pottery/fruitStrainer.jpeg",
        "story": "Another piece from my kitchen utensils era. I was so sad to see that one of the handles broke off when it came out of the kiln. So I sanded the other handle off instead of trying to glue it on. And thennnn the glaze decided to do this during the seond fire. Not what I planned but I am not mad about it.",
        "processImages": [
            "images/process/fruitStrainer-1.jpeg",
            "images/process/fruitStrainer-2.jpeg",
            "images/process/fruitStrainer-3.jpeg",
            "images/process/fruitStrainer-4.jpeg",
            "images/process/fruitStrainer-5.jpeg",
            "images/process/fruitStrainer-6.jpeg",
            "images/process/fruitStrainer-7.jpeg",
            "images/process/fruitStrainer-8.jpeg"
        ]
    },
    {
        "id": 2,
        "title": "Lemon Squizer",
        "image": "images/pottery/lemonSquizer.jpeg",
        "story": "I’m officially in my kitchen utensils era, and this is the first piece of my collection. Honestly, I am not even using it as a lemon squeezer—it’s currently living its best life as a statement piece in my bar corner.",
        "processImages": [
            "images/process/lemonSquizer-1.jpeg",
            "images/process/lemonSquizer-2.jpeg",
            "images/process/lemonSquizer-3.jpeg",
            "images/process/lemonSquizer-4.jpeg",
            "images/process/lemonSquizer-5.jpeg"
        ]
    },
    {
        "id": 3,
        "title": "Blue Vase",
        "image": "images/pottery/blueVase.jpeg",
        "story": "",
        "processImages": [
            "images/process/blueVase-1.jpeg",
            "images/process/blueVase-2.jpeg",
            "images/process/blueVase-3.jpeg"
        ]
    },
    {
        "id": 4,
        "title": "Yellow Espresso Cup",
        "image": "images/pottery/yellowEspressoCup.jpeg",
        "story": "",
        "processImages": [
            "images/process/yellowEspressoCup-1.jpeg",
            "images/process/yellowEspressoCup-2.jpeg"
        ]
    },
    {
        "id": 5,
        "title": "Yellow Vase",
        "image": "images/pottery/yellowVase.jpeg",
        "story": "",
        "processImages": [
            "images/process/yellowVase-1.jpeg",
            "images/process/yellowVase-2.jpeg",
            "images/process/yellowVase-3.jpeg"
        ]
    },
    {
        "id": 6,
        "title": "Purple Vase",
        "image": "images/pottery/purpleVase.jpeg",
        "story": "",
        "processImages": [
            "images/process/purpleVase-1.jpeg",
            "images/process/purpleVase-2.jpeg",
            "images/process/purpleVase-3.jpeg"
        ]
    },
    {
        "id": 7,
        "title": "Blue Platter",
        "image": "images/pottery/bluePlatter.jpeg",
        "story": "",
        "processImages": [
            "images/process/bluePlatter-1.jpeg",
            "images/process/bluePlatter-2.jpeg",
            "images/process/bluePlatter-3.jpeg",
            "images/process/bluePlatter-4.jpeg",
            "images/process/bluePlatter-5.jpeg",
            "images/process/bluePlatter-6.jpeg",
            "images/process/bluePlatter-7.jpeg"
        ]
    },
    {
        "id": 8,
        "title": "Crocodile Incense Burner",
        "image": "images/pottery/crocodileIncenseBurner.jpeg",
        "story": "",
        "processImages": [
            "images/process/crocodileIncenseBurner-1.jpeg",
            "images/process/crocodileIncenseBurner-2.jpeg",
            "images/process/crocodileIncenseBurner-3.jpeg",
            "images/process/crocodileIncenseBurner-4.jpeg",
            "images/process/crocodileIncenseBurner-5.jpeg",
            "images/process/crocodileIncenseBurner-6.jpeg",
            "images/process/crocodileIncenseBurner-7.jpeg",
            "images/process/crocodileIncenseBurner-8.jpeg",
            "images/process/crocodileIncenseBurner-9.jpeg"
        ]
    },
    {
        "id": 9,
        "title": "Ashtray",
        "image": "images/pottery/ashtray.jpeg",
        "story": "",
        "processImages": [
            "images/process/ashtray-1.jpeg",
            "images/process/ashtray-2.jpeg",
            "images/process/ashtray-3.jpeg",
            "images/process/ashtray-4.jpeg",
            "images/process/ashtray-5.jpeg",
            "images/process/ashtray-6.jpeg"
        ]
    },
    {
        "id": 10,
        "title": "Pink Ashtray",
        "image": "images/pottery/pinkAshtray.jpeg",
        "story": "",
        "processImages": [
            "images/process/pinkAshtray-1.jpeg",
            "images/process/pinkAshtray-2.jpeg",
            "images/process/pinkAshtray-3.jpeg"
        ]
    },
    {
        "id": 11,
        "title": "Cat Bowls",
        "image": "images/pottery/catBowls.jpeg",
        "story": "",
        "processImages": [
            "images/process/catBowls-1.jpeg",
            "images/process/catBowls-2.jpeg"
        ]
    },
    {
        "id": 12,
        "title": "Soap Holder",
        "image": "images/pottery/SoapHolder.jpeg",
        "story": "This was the first piece that I tried to do some hand building after throwing on the wheel. I tried to follow my design as much as possible. It turned out great and I was using using it however it broke when I moved apartments.",
        "processImages": [
            "images/process/soapHolder-1.jpeg",
            "images/process/soapHolder-2.jpeg",
            "images/process/soapHolder-3.jpeg",
            "images/process/soapHolder-4.jpeg"
        ]
    },
    {
        "id": 13,
        "title": "Pink Bowl",
        "image": "images/pottery/pinkBowl.jpeg",
        "story": "",
        "processImages": []
    },
    {
        "id": 14,
        "title": "Coffee And Sugar jars",
        "image": "images/pottery/coffeeAndSugarjars.jpeg",
        "story": "",
        "processImages": [
            "images/process/coffeeAndSugarJars-1.jpeg",
            "images/process/coffeeAndSugarJars-2.jpeg"
        ]
    },
    {
        "id": 15,
        "title": "Blue Ashtray",
        "image": "images/pottery/blueAshtray.jpeg",
        "story": "",
        "processImages": [
            "images/process/blueAshtray-1.jpeg",
            "images/process/blueAshtray-2.jpeg"
        ]
    },
    {
        "id": 16,
        "title": "3crookedcups",
        "image": "images/pottery/3crookedcups.jpeg",
        "story": "",
        "processImages": [
            "images/process/3crookedcups-1.jpeg"
        ]
    },
    {
        "id": 17,
        "title": "Green Dumplings Plate",
        "image": "images/pottery/greenDumpingsPlate.jpeg",
        "story": "",
        "processImages": [
            "images/process/greenDumpingsPlate-1.jpeg",
            "images/process/greenDumpingsPlate-2.jpeg"
        ]
    },
    {
        "id": 18,
        "title": "Ring Holder",
        "image": "images/pottery/ringHolder.jpeg",
        "story": "Honestly I did not know what to use this for. This was one of the first pieces where I was trying to do something other than just a cilinder. I ended up giving it to my mom.",
        "processImages": [
            "images/process/ringHolder-1.jpeg",
            "images/process/ringHolder-2.jpeg"
        ]
    },
    {
        "id": 19,
        "title": "Black And Yellow Ashtrays",
        "image": "images/pottery/blackAndYellowAshtrays.jpeg",
        "story": "",
        "processImages": [
            "images/process/blackAndYellowAshtrays-1.jpeg",
            "images/process/blackAndYellowAshtrays-2.jpeg",
            "images/process/blackAndYellowAshtrays-3.jpeg",
            "images/process/blackAndYellowAshtrays-4.jpeg",
            "images/process/blackAndYellowAshtrays-5.jpeg"
        ]
    },
    {
        "id": 20,
        "title": "Black Mug",
        "image": "images/pottery/blackMug.jpeg",
        "story": "",
        "processImages": [
            "images/process/blackMug-1.jpeg",
            "images/process/blackMug-2.jpeg"
        ]
    },
    {
        "id": 21,
        "title": "Blue Q Tip Holder",
        "image": "images/pottery/blueQTipHolder.jpeg",
        "story": "",
        "processImages": [
            "images/process/blueQTipHolder-1.jpeg"
        ]
    },
    {
        "id": 22,
        "title": "Blue Swirly Cup",
        "image": "images/pottery/blueSwirlyCup.jpeg",
        "story": "",
        "processImages": [
            "images/process/blueSwirlyCup-1.jpeg",
            "images/process/blueSwirlyCup-2.jpeg"
        ]
    },
    {
        "id": 23,
        "title": "Pink Espresso Shot",
        "image": "images/pottery/pinkEspressoShot.jpeg",
        "story": "",
        "processImages": [
            "images/process/pinkEspressoShot-1.jpeg",
            "images/process/pinkEspressoShot-2.jpeg"
        ]
    },
    {
        "id": 24,
        "title": "Square Handle Mug",
        "image": "images/pottery/SquareHandle.jpeg",
        "story": "",
        "processImages": [
            "images/process/squareHandleMug-1.jpeg"
        ]
    },
    {
        "id": 25,
        "title": "Christmas Tree Cup",
        "image": "images/pottery/christmasTreeCup.jpeg",
        "story": "I was trying to experiment with glaze and different surfaces I guess? I really wanted 4 green dots in columns but the green glaze had a mind of its own. Now it just looks like a bunch of christmas trees.",
        "processImages": [
            "images/process/christmasTreeCup-1.jpeg",
            "images/process/christmasTreeCup-2.jpeg"
        ]
    },
    {
        "id": 26,
        "title": "Leopard Cup",
        "image": "images/pottery/yellowFilxhan.jpeg",
        "story": "I tried to make more functional things as I progressed (literally my 3rd piece). So I made this cute espresso cup with a little plate. ",
        "processImages": [
            "images/process/yellowFilxhan-1.jpeg"
        ]
    },
    {
        "id": 27,
        "title": "My Tools Holder",
        "image": "images/pottery/myToolsHolder.jpeg",
        "story": "After making my first piece and loving the glaze, I wanted to make something that I could use in my pottery process. I made a holder for my tools.",
        "processImages": []
    },
    {
        "id": 28,
        "title": "First Piece Ever",
        "image": "images/pottery/firstPieceEver.jpeg",
        "story": "This was the first piece I ever made. I had no idea what I was doing but I love how the glaze turned out.",
        "processImages": [
            "images/process/firstPieceEver-1.jpeg"
        ]
    }
];

// To customize a piece, edit it directly in this file
// Running update-gallery will ONLY update ids sequentially from 0 to N
// Everything else is preserved
