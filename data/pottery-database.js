// Pottery Database
// Your own pottery photos

const potteryDatabase = [
    {
        id: 0,
        title: "Rustic Clay Vase",
        price: "$85",
        image: "images/pottery/2D87A7D4-DB9C-4680-95B0-66A6059F4D4D_4_5005_c.jpeg",
        story: "This rustic vase was thrown on the wheel during the quiet hours of early morning. The clay, sourced from local deposits, carries the warmth of the earth. Each curve was shaped by hand, following the natural flow of the material. The glazing process revealed unexpected variations in color—a beautiful reminder that perfection lies in embracing the unexpected.",
        processImages: [
            "images/process/18091BDD-B4E4-4EFB-B96F-487930CD709B_1_105_c.jpeg",
            "images/process/2F733318-BF46-4D74-8B70-59CE9CC44F90_1_105_c.jpeg",
            "images/process/47CB51C5-E973-49E4-AFA7-94B8263D1151_1_105_c.jpeg"
        ]
    },
    {
        id: 1,
        title: "Terracotta Bowl",
        price: "$65",
        image: "images/pottery/32C23074-EED3-4D9B-9ABC-031C0DE88A4F_1_105_c.jpeg",
        story: "Formed from terracotta clay, this bowl celebrates the ancient tradition of pottery making. The scoring marks along the rim were added intentionally, creating texture and visual interest. After the first firing, I applied a natural glaze that enhances the clay's inherent warmth. This piece is perfect for serving or simply displaying as a centerpiece.",
        processImages: [
            "images/process/50CA6764-31D4-4372-9EE9-44D1352549D5_4_5005_c.jpeg",
            "images/process/5E770CF7-37D2-4190-B3AD-9FBFB7FD94E1_1_105_c.jpeg",
            "images/process/5F299847-5F19-4BCD-9E0F-8E301B26BD1D_4_5005_c.jpeg"
        ]
    },
    {
        id: 2,
        title: "Minimalist Mug",
        price: "$45",
        image: "images/pottery/39E3D87E-0FB9-4344-81DA-4AF4054C7D14_1_105_c.jpeg",
        story: "Simplicity meets functionality in this handcrafted mug. The handle was pulled and attached with care, ensuring both comfort and durability. The smooth interior contrasts beautifully with the raw, textured exterior—a design choice that honors both form and function. This mug has been tested to hold the perfect amount of coffee for those contemplative morning moments.",
        processImages: [
            "images/process/79DD848D-D0FC-476E-9527-60A51083F2FD_1_105_c.jpeg",
            "images/process/A4E39C78-3C36-45DD-AB21-6F7146A023DE_4_5005_c.jpeg",
            "images/process/A94BBB46-8D74-4B31-807C-41C7F6FAB93B_1_105_c.jpeg"
        ]
    },
    {
        id: 3,
        title: "Organic Planter",
        price: "$72",
        image: "images/pottery/3B476CD4-3B41-48F9-815D-D20AC11C2DE9_1_105_c.jpeg",
        story: "Created with plant lovers in mind, this planter features a drainage hole and subtle geometric patterns pressed into the wet clay. The natural glaze allows the earth tones to shine through while providing a water-resistant surface. I imagined this piece holding a trailing pothos or a collection of succulents, bringing life into any corner of your home.",
        processImages: [
            "images/process/B18C53AB-B2F4-4CD9-A75E-28AB0D7CB93C_1_105_c.jpeg",
            "images/process/B51A19B0-DF04-4CF5-8167-2FB8544A926F_1_105_c.jpeg",
            "images/process/D352C0FB-99E1-4160-9E14-4B6D0805833A_1_105_c.jpeg"
        ]
    },
    {
        id: 4,
        title: "Handbuilt Pitcher",
        price: "$95",
        image: "images/pottery/A3B83917-3365-49FA-9A56-EF7FD61828F2_4_5005_c.jpeg",
        story: "Unlike most of my work, this pitcher was handbuilt using the coil method rather than thrown on the wheel. Each coil was carefully smoothed and shaped, creating organic imperfections that tell the story of its making. The spout was refined over several attempts to achieve the perfect pour. This piece represents patience, practice, and the joy of slow creation.",
        processImages: [
            "images/process/E3A33638-482F-4FD2-BBC6-AE4665CCBD5F_4_5005_c.jpeg",
            "images/process/F8EF4137-F2B8-4827-87FA-9E44CF434ACB_1_105_c.jpeg",
            "images/process/18091BDD-B4E4-4EFB-B96F-487930CD709B_1_105_c.jpeg"
        ]
    },
    {
        id: 5,
        title: "Meditation Bowl",
        price: "$110",
        image: "images/pottery/CA91EC00-B3BB-44E4-B8C2-D0ACFD02AC43_1_105_c.jpeg",
        story: "This wide, shallow bowl was inspired by Japanese tea ceremony vessels. The form encourages mindfulness—its weight and balance feel grounding in your hands. I spent extra time on the foot ring, ensuring it sits perfectly on any surface. The matte finish invites touch, and the subtle color variations emerged naturally during the firing process, making each bowl truly one of a kind.",
        processImages: [
            "images/process/2F733318-BF46-4D74-8B70-59CE9CC44F90_1_105_c.jpeg",
            "images/process/47CB51C5-E973-49E4-AFA7-94B8263D1151_1_105_c.jpeg",
            "images/process/50CA6764-31D4-4372-9EE9-44D1352549D5_4_5005_c.jpeg"
        ]
    },
    {
        id: 6,
        title: "Stoneware Vessel",
        price: "$90",
        image: "images/pottery/D7686419-AE49-4A1D-8441-7C22EE7793D6_4_5005_c.jpeg",
        story: "This stoneware vessel emerged from an exploration of form and texture. The clay was worked slowly, allowing the shape to develop organically. The firing brought out rich, earthy tones that shift depending on the light. It's a piece that invites you to look closer and discover something new each time.",
        processImages: [
            "images/process/5E770CF7-37D2-4190-B3AD-9FBFB7FD94E1_1_105_c.jpeg",
            "images/process/5F299847-5F19-4BCD-9E0F-8E301B26BD1D_4_5005_c.jpeg",
            "images/process/79DD848D-D0FC-476E-9527-60A51083F2FD_1_105_c.jpeg"
        ]
    },
    {
        id: 7,
        title: "Glazed Serving Dish",
        price: "$78",
        image: "images/pottery/ECD43B96-BF17-4407-828B-7CBB15C2C604_1_105_c.jpeg",
        story: "Made for gathering and sharing, this serving dish was shaped with the table in mind. The glaze was layered to create depth and movement across the surface. Every meal deserves a vessel that honors the care put into preparing it—this piece was made to do exactly that.",
        processImages: [
            "images/process/A4E39C78-3C36-45DD-AB21-6F7146A023DE_4_5005_c.jpeg",
            "images/process/A94BBB46-8D74-4B31-807C-41C7F6FAB93B_1_105_c.jpeg",
            "images/process/B18C53AB-B2F4-4CD9-A75E-28AB0D7CB93C_1_105_c.jpeg"
        ]
    },
    {
        id: 8,
        title: "Deep Ocean Bowl",
        price: "$88",
        image: "images/pottery/deepOcean.jpeg",
        story: "Inspired by the colors and stillness of deep water, this bowl carries layers of blue-toned glaze that pool and shift across its surface. The form is simple and grounding, designed to hold space—whether for a meal, for fruit on the counter, or simply as a quiet presence in the room.",
        processImages: [
            "images/process/B51A19B0-DF04-4CF5-8167-2FB8544A926F_1_105_c.jpeg",
            "images/process/D352C0FB-99E1-4160-9E14-4B6D0805833A_1_105_c.jpeg",
            "images/process/E3A33638-482F-4FD2-BBC6-AE4665CCBD5F_4_5005_c.jpeg"
        ]
    }
];

// To add your own pottery pieces, follow this format:
// {
//     id: 6,                              // Unique ID (increment from last)
//     title: "Your Piece Name",           // Name of the pottery piece
//     price: "$XX",                       // Price
//     image: "images/pottery/your-image.jpeg",    // Main gallery image
//     story: "Your backstory here...",    // Description of the piece
//     processImages: [                    // Array of 3 process photos
//         "images/process/process1.jpeg",
//         "images/process/process2.jpeg",
//         "images/process/process3.jpeg"
//     ]
// }
