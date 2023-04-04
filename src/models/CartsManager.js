import fs from "fs/promises";

class CartsManager {

	#autoId;
	#carts;

	constructor() {
		this.cartsPath = "./src/bd/Carts.json"
		this.productsPath = "./src/bd/Products.json"
		this.encoding = {encoding: "utf-8"}
		this.#autoId = 0
		this.#carts = []
	}

	// Cargo la info del archivo Carts.json en el array de productos y actualizo el ultimo ID generado para no pisar los nuevos que se creen.
	async loadCartsData() {

		try
		{
			this.#carts = await this.getCarts();
			if(this.#carts.length > 0){
				return this.#autoId = this.#carts.at(-1).id;
			}
		}catch(err) {
			return err;
		}

	};
	// Traigo los productos del archivo Products.json para poder realizar modificaciones en otros metodos
	async loadProductsData() {

		return JSON.parse(await fs.readFile(this.productsPath,this.encoding));

	};

	// Metodo reutilizable para la escritura de archivos.
	async fsWrite (path, array) {

		try
		{	
			await fs.writeFile(path, JSON.stringify(array)); 
		}
		catch(err){
			return err;
		}

	};


	// Agregar un nuevo Carrito
	async addCart() {

		try
		{

			await this.loadCartsData();

			const newCart = {
				id: ++this.#autoId,
				products: []
			};

			this.#carts.push(newCart);
			
			// Le doy permanencia a los cambios realizados
			await this.fsWrite(this.cartsPath, this.#carts); 

			return `The cart:
				${JSON.stringify(newCart)}
				was successfully added`;

		}catch(err) {

			throw err;

		};

	};

	// AGREGO UN PRODUCTO AL CARRITO
	async addProductToCart(cartId, productId) {


			
			await this.loadCartsData();
			const indexCart = this.#carts.findIndex(cart => cart.id === cartId);	

			const listProducts = await this.loadProductsData();
			const indexProduct = listProducts.findIndex(product => product.id === productId);

			const foundCart = this.#carts[indexCart];	
			const foundProduct = listProducts[indexProduct];

			// Si existe el carrito y existe el producto...
			if(indexCart >= 0 && indexProduct >= 0) {

				const newProduct = {id: foundProduct.id, quantity: 1};
				const indexProductInCart = foundCart.products.findIndex(product => product.id === newProduct.id);
				
				// Si el producto no existe en el carrito lo agrego directamente y resto la cantidad al stock del producto
				if(foundCart.products.length <= 0 || indexProductInCart < 0) {
					foundCart.products.push(newProduct);
					--foundProduct.stock;
				// Si el producto ya existe agrego solamente la cantidad y resto la misma al stock del producto
				}else{
					if(foundProduct.stock > 0) {
						foundCart.products[indexProductInCart].quantity++;
						--foundProduct.stock;
				// Si ya no hay mas stock del producto lanzo una excepcion...
					}else{
						throw `Error: Amount Exceeded` ;
					}

				}

		try
		{
				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.cartsPath, this.#carts); 
				await this.fsWrite(this.productsPath, listProducts); 
				return `The product:
				${JSON.stringify(newProduct)}
				was successfully added in cart ID: ${cartId}
				Available Stock = ${foundProduct.stock}`;
		}catch(err) {
			return err;
		}

			}
			// Si no existe el carrito o el producto lanzo una excepcion...
			throw "Error: No Cart o Product found";
		

	};

	// TRAIGO LOS CARRITO DESDE EL ARCHIVO CARTS.JSON
	async getCarts() {
		//Intento leer el archivo
		try
		{
			return JSON.parse(await fs.readFile(this.cartsPath,this.encoding));
		}
		// Si el archivo no existe lo creo y devuelvo un arreglo vacion
		catch (err)
		{
			await this.fsWrite([]); 

			return [];
		}
	};

	// BUSCO UN CARRITO POR SU ID
	async getCartById(id) {

		try
		{
			await this.loadCartsData();

			// Verifico que exista el carrito
			const foundCart = this.#carts.find(cart => cart.id === id );

			if(foundCart) {
				return foundCart.products;
			}
		}catch(err) {
			throw err;
		}
		
		// Si no existe lanzo una excepcion
		throw( `The cart with ID ${id} was not found in the database`);

	};

	// BORRO UN PRODUCTO DEL CARRITO Y ACTUALIZO SU STOCK EN EL ARCHIVO PRODUCTS.JSON 
	async deleteProductToCart(cartId, productId) {

		try{
			await this.loadCartsData();
			const foundIndexCart = this.#carts.findIndex(cart => cart.id === cartId );
			const foundCart = this.#carts[foundIndexCart];
			const foundProductInCart = foundCart.products.find(product => product.id === productId);

			const listProducts = await this.loadProductsData();
			const indexProduct = listProducts.findIndex(product => product.id === productId);

			if(foundIndexCart >= 0 && foundProductInCart) {

				// Realizo un filtro invertido para eliminar el producto del carrito
				const newProducts = foundCart.products.filter(products => products.id !== productId);
				this.#carts[foundIndexCart].products = newProducts;
				// Devuelvo la cantidad del producto eliminado al stock del producto
				listProducts[indexProduct].stock += foundProductInCart.quantity;  
				
				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.cartsPath, this.#carts); 
				await this.fsWrite(this.productsPath, listProducts); 

				return `The product with ID ${foundProductInCart.id} was successfully deleted`
			}

			// Si el producto no existe lanzo una excepcion...
			throw ( `Cart or Product was not found in the database and cannot be deleted` );

		}
		catch(err)
		{
			throw err;
		}
	}
}

export default CartsManager;
