import createMulter from "../config/produto.multer";

const uploadImage = createMulter({
  folder: "Images",
  allowedTypes: ["image/jpeg", "image/png"],
  fileSize: 10 * 1024 * 1024, // 10 megabytes
}).single('image');

export default uploadImage;
