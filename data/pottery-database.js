// Pottery Database
// Replace the image URLs with your own pottery photos

const potteryDatabase = [
    {
        id: 0,
        title: "Rustic Clay Vase",
        price: "$85",
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
        story: "This rustic vase was thrown on the wheel during the quiet hours of early morning. The clay, sourced from local deposits, carries the warmth of the earth. Each curve was shaped by hand, following the natural flow of the material. The glazing process revealed unexpected variations in color—a beautiful reminder that perfection lies in embracing the unexpected.",
        processImages: [
            "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=300&q=80",
            "https://images.unsplash.com/photo-1594993266937-6008571aef4a?w=300&q=80",
            "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&q=80"
        ]
    },
    {
        id: 1,
        title: "Terracotta Bowl",
        price: "$65",
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
        story: "Formed from terracotta clay, this bowl celebrates the ancient tradition of pottery making. The scoring marks along the rim were added intentionally, creating texture and visual interest. After the first firing, I applied a natural glaze that enhances the clay's inherent warmth. This piece is perfect for serving or simply displaying as a centerpiece.",
        processImages: [
            "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=300&q=80",
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=300&q=80",
            "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=300&q=80"
        ]
    },
    {
        id: 2,
        title: "Minimalist Mug",
        price: "$45",
        image: "https://images.unsplash.com/photo-1493106819930-f87cfe32f2fd?w=800&q=80",
        story: "Simplicity meets functionality in this handcrafted mug. The handle was pulled and attached with care, ensuring both comfort and durability. The smooth interior contrasts beautifully with the raw, textured exterior—a design choice that honors both form and function. This mug has been tested to hold the perfect amount of coffee for those contemplative morning moments.",
        processImages: [
            "https://images.unsplash.com/photo-1528818955841-a7f1e5b7a11c?w=300&q=80",
            "https://images.unsplash.com/photo-1578226692988-7e4eb2e4d52e?w=300&q=80",
            "https://images.unsplash.com/photo-1603797960300-464888dd392e?w=300&q=80"
        ]
    },
    {
        id: 3,
        title: "Organic Planter",
        price: "$72",
        image: "https://images.unsplash.com/photo-1525974160448-038dacadcc71?w=800&q=80",
        story: "Created with plant lovers in mind, this planter features a drainage hole and subtle geometric patterns pressed into the wet clay. The natural glaze allows the earth tones to shine through while providing a water-resistant surface. I imagined this piece holding a trailing pothos or a collection of succulents, bringing life into any corner of your home.",
        processImages: [
            "https://images.unsplash.com/photo-1616432043562-3671ea2e8f40?w=300&q=80",
            "https://images.unsplash.com/photo-1592439701789-d6a4e0c4f41b?w=300&q=80",
            "https://images.unsplash.com/photo-1606478633683-5004e3fd5bfd?w=300&q=80"
        ]
    },
    {
        id: 4,
        title: "Handbuilt Pitcher",
        price: "$95",
        image: "https://images.unsplash.com/photo-1627916607164-7b20241db935?w=800&q=80",
        story: "Unlike most of my work, this pitcher was handbuilt using the coil method rather than thrown on the wheel. Each coil was carefully smoothed and shaped, creating organic imperfections that tell the story of its making. The spout was refined over several attempts to achieve the perfect pour. This piece represents patience, practice, and the joy of slow creation.",
        processImages: [
            "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=300&q=80",
            "https://images.unsplash.com/photo-1607620315093-03eb0c5b8ea6?w=300&q=80",
            "https://images.unsplash.com/photo-1608302051853-d5f5652d29c1?w=300&q=80"
        ]
    },
    {
        id: 5,
        title: "Meditation Bowl",
        price: "$110",
        image: "https://images.unsplash.com/photo-1560762484-813fc97650a0?w=800&q=80",
        story: "This wide, shallow bowl was inspired by Japanese tea ceremony vessels. The form encourages mindfulness—its weight and balance feel grounding in your hands. I spent extra time on the foot ring, ensuring it sits perfectly on any surface. The matte finish invites touch, and the subtle color variations emerged naturally during the firing process, making each bowl truly one of a kind.",
        processImages: [
            "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=300&q=80",
            "https://images.unsplash.com/photo-1589686118260-e675d8053120?w=300&q=80",
            "https://images.unsplash.com/photo-1528826007177-f38517ce2fcd?w=300&q=80"
        ]
    }
];

// To add your own pottery pieces, follow this format:
// {
//     id: 6,                              // Unique ID (increment from last)
//     title: "Your Piece Name",           // Name of the pottery piece
//     price: "$XX",                       // Price
//     image: "path/to/main-image.jpg",    // Main gallery image
//     story: "Your backstory here...",    // Description of the piece
//     processImages: [                    // Array of 3 process photos
//         "path/to/process1.jpg",
//         "path/to/process2.jpg",
//         "path/to/process3.jpg"
//     ]
// }
