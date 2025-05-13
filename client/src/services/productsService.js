// import { db, 
//   collection, 
//   addDoc, 
//   getDocs, 
//   doc, 
//   updateDoc, 
//   deleteDoc,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDoc
// } from '../config/firebase';

// const productsCollection = collection(db, 'products');

// export const productsService = {
//   // Search products by query across multiple fields
//   async searchProducts(query) {
//     try {
//       if (!query || query.trim() === '') {
//         return [];
//       }

//       // Create a query that searches across multiple fields
//       const q = query(productsCollection, 
//         where('name', '>=', query.toLowerCase()),
//         where('name', '<=', query.toLowerCase() + '\uf8ff'),
//         orderBy('name')
//       );

//       const querySnapshot = await getDocs(q);
//       const products = [];
      
//       querySnapshot.forEach((doc) => {
//         const product = {
//           id: doc.id,
//           ...doc.data()
//         };
//         products.push(product);
//       });

//       return products;
//     } catch (error) {
//       console.error('Error searching products:', error);
//       throw error;
//     }
//   },

//   // Search products by category
//   async searchProductsByCategory(category) {
//     try {
//       const q = query(productsCollection, 
//         where('category', '==', category.toLowerCase()),
//         orderBy('name')
//       );

//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//     } catch (error) {
//       console.error('Error searching products by category:', error);
//       throw error;
//     }
//   },

//   // Add a new product
//   async addProduct(productData) {
//   // Add a new product
//   async addProduct(productData) {
//     try {
//       console.log('Attempting to add product:', productData);
//       const docRef = await addDoc(productsCollection, {
//         ...productData,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       });
//       console.log('Product added successfully with ID:', docRef.id);
//       return docRef.id;
//     } catch (error) {
//       console.error('Detailed error adding product:', {
//         error: error.message,
//         code: error.code,
//         stack: error.stack
//       });
//       throw error;
//     }
//   },

//   // Get all products with optional filters
//   async getProducts(filters = {}) {
//     try {
//       let q = query(productsCollection);
      
//       // Add filters if provided
//       if (filters.category) {
//         q = query(q, where('category', '==', filters.category));
//       }
//       if (filters.minPrice) {
//         q = query(q, where('price', '>=', filters.minPrice));
//       }
//       if (filters.maxPrice) {
//         q = query(q, where('price', '<=', filters.maxPrice));
//       }
      
//       // Add sorting
//       if (filters.sortBy === 'price') {
//         q = query(q, orderBy('price', filters.sortOrder || 'asc'));
//       }
      
//       // Get documents
//       const querySnapshot = await getDocs(q);
//       return querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//     } catch (error) {
//       console.error('Error getting products:', error);
//       throw error;
//     }
//   },

//   // Get a single product by ID
//   async getProductById(productId) {
//     try {
//       const docRef = doc(db, 'products', productId);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         return {
//           id: docSnap.id,
//           ...docSnap.data()
//         };
//       }
//       return null;
//     } catch (error) {
//       console.error('Error getting product:', error);
//       throw error;
//     }
//   },

//   // Update a product
//   async updateProduct(productId, productData) {
//     try {
//       const productRef = doc(db, 'products', productId);
//       await updateDoc(productRef, {
//         ...productData,
//         updatedAt: new Date().toISOString()
//       });
//     } catch (error) {
//       console.error('Error updating product:', error);
//       throw error;
//     }
//   },

//   // Delete a product
//   async deleteProduct(productId) {
//     try {
//       const productRef = doc(db, 'products', productId);
//       await deleteDoc(productRef);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       throw error;
//     }
//   },

//   // Get products with pagination
//   async getProductsPaginated(filters = {}, page = 1, pageSize = 10) {
//     try {
//       let q = query(productsCollection);
      
//       // Add filters if provided
//       if (filters.category) {
//         q = query(q, where('category', '==', filters.category));
//       }
      
//       // Add sorting
//       q = query(q, orderBy('createdAt', 'desc'));
      
//       // Add pagination
//       q = query(q, limit(pageSize));
      
//       // Get documents
//       const querySnapshot = await getDocs(q);
//       const products = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
      
//       // Get total count for pagination
//       const totalQuery = query(productsCollection);
//       const totalSnapshot = await getDocs(totalQuery);
//       const total = totalSnapshot.size;
      
//       return {
//         products,
//         total,
//         page,
//         pageSize,
//         totalPages: Math.ceil(total / pageSize)
//       };
//     } catch (error) {
//       console.error('Error getting paginated products:', error);
//       throw error;
//     }
//   }
// };
