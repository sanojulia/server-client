// import { productsService } from '../services/productsService';
// import { womenProducts } from '../mocks/products';

// async function migrateProducts() {
//   console.log('Starting products migration...');

//   for (const product of womenProducts) {
//     try {
//       const productData = {
//         ...product,
//         type: product.type,
//         category: 'Women',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         images: {
//           // main: product.image.main,
//           hover: product.image.hover
//         }
//       };

//       const productId = await productsService.addProduct(productData);
//       console.log(`Successfully added product: ${product.name} (ID: ${productId})`);
//     } catch (error) {
//       console.error(`Error adding product ${product.name}:`, error);
//     }
//   }

//   console.log('Products migration completed!');
// }

// migrateProducts().catch(console.error);

// export default migrateProducts;