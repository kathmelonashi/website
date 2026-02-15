# Images Folder

## Folder Structure

- **pottery/** - Main pottery product images (for gallery and detail view)
- **process/** - Process/behind-the-scenes images showing how pieces are made

## Image Guidelines

### Pottery Images
- Recommended size: 800-1200px wide
- Format: JPG or PNG
- Good lighting and clean background recommended
- Name files descriptively (e.g., `rustic-vase.jpg`, `terracotta-bowl.jpg`)

### Process Images
- Recommended size: 300-600px wide
- Format: JPG or PNG
- Show different stages: throwing, shaping, glazing, firing, etc.

## How to Add Your Images

1. Place your pottery photos in the `pottery/` folder
2. Place your process photos in the `process/` folder
3. Update the image paths in `data/pottery-database.js`

Example:
```javascript
{
    id: 0,
    title: "My Beautiful Vase",
    image: "images/pottery/my-vase.jpg",
    processImages: [
        "images/process/my-vase-step1.jpg",
        "images/process/my-vase-step2.jpg",
        "images/process/my-vase-step3.jpg"
    ]
}
```
