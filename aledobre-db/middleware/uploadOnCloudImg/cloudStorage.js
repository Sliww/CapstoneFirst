const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ALEDOBREUPLOADS',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        format: async (req, file) => 'png',
        public_id: (req, file) => {
            const fileName = file.originalname.split('.')[0];
            return `${fileName}-${Date.now()}`;
        },
        transformation: [{ width: 800, height: 600, crop: 'limit' }]
    }
});

const uploadCloud = multer({
    storage: cloudStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Per favore carica solo immagini.'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = uploadCloud;
