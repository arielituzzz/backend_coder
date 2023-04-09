import fs from "fs/promises";

class CartsManager {

	#autoId;
	#carts;

	constructor() {
		this.cartsPath = "./src/bd/Carts.json"
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

	// Metodo reutilizable para la escritura de archivos.
	async fsWrite (array) {

		try
		{	
			await fs.writeFile(this.cartsPath, JSON.stringify(array)); 
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
			await this.fsWrite(this.#carts); 

			return newCart;

		}catch(err) {

			throw err;

		};

	};

	// AGREGO UN PRODUCTO AL CARRITO
	async addProductToCart(cartId, product) {

		try{
		await this.loadCartsData();
		}catch(err) {
			return err;
		}

		const indexCart = this.#carts.findIndex(cart => cart.id === cartId);	

		const foundCart = this.#carts[indexCart];
		console.log(indexCart)

		// Si existe el carrito...
		if(indexCart >= 0) {

			const newProduct = {id: product.id, quantity: 1};
			const indexProductInCart = foundCart.products.findIndex(product => product.id === newProduct.id);

			// Si el producto no existe en el carrito lo agrego directamente
			if(indexProductInCart < 0) {
				foundCart.products.push(newProduct);
				// Si el producto ya existe agrego solamente la cantidad
			}else{
					foundCart.products[indexProductInCart].quantity++;
			}

			try
			{
				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.#carts); 
				return {cartId: cartId, productId: newProduct.id, quantity: newProduct.quantity};

			}catch(err) {
				return err;
			}

		}
		// Si no existe el carrito o el producto lanzo una excepcion...
		throw "Error: Cart not found";


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

			if(foundIndexCart >= 0 && foundProductInCart) {

				// Realizo un filtro invertido para eliminar el producto del carrito
				const newProducts = foundCart.products.filter(products => products.id !== productId);
				this.#carts[foundIndexCart].products = newProducts;

				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.#carts); 

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
