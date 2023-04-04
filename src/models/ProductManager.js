import fs from "fs/promises";

class ProductManager {

	#autoId;
	#products;

	constructor() {
		this.path = "./src/bd/Products.json"
		this.encoding = {encoding: "utf-8"}
		this.#autoId = 0
		this.#products = []
	}

	// CARGO LA DATA DEL ARCHIVO PRODUCTS.JSON EN EL ARRAY THIS.#PRODUCTS Y ACTUALIZO EL #AUTOID CON EL ULTIMO ID DE LOS PRODUCTOS
	async loadData() {

		try{
			this.#products = await this.getProducts();
		}catch(err) {
			return err;
		}

		if(this.#products.length > 0){
			return this.#autoId = this.#products.at(-1).id;
		};

	};

	// METODO REUTILIZABLE PARA LA ESCRITURA DEL ARCHIVO PRODUCTS.JSON
	async fsWrite (array) {

		try{	
			await fs.writeFile(this.path, JSON.stringify(array)); 
		}
		catch(err){
			return err;
		}

	};

	// AGREGO UN PRODUCTO
	async addProduct({title, description, category, price, thumbnail, code, stock}) {

		// Traigo los productos del archivo Products.json al array this.#products
		try
		{
			await this.loadData();
		}catch(err){
			return err;
		}
		
		// Verifico que el producto que quiero agregar no tenga el codigo duplicado
		const duplicateCode = this.#products.some(product => product.code === code);

		if(typeof title === "string" && typeof description === "string" && typeof category === "string" && typeof price === "number" && typeof code === "string" && typeof stock === "number" && !duplicateCode ) {

			const newProduct = {
				id: ++this.#autoId,
				title,
				description,
				category,
				price,
				thumbnail: thumbnail,
				code,
				stock,
				status: true,

			};

			this.#products.push(newProduct);

			try
			{
				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.#products);
			}catch(err) {
				return err;
			}

			return `The product:
				${JSON.stringify(newProduct)}
				was successfully added`;
		}
		
		// Si alguno de los campos enviados no coinciden con los tipos de datos requeridos o el codigo esta duplicado lanzo una excepcion...
		throw "Incorrectly enterer data or empty fields (addProduct)";

	};

	// TRAIGO LOS PRODUCTOS DESDE EL ARCHIVO PRODUCTS.JSON
	async getProducts() {
		
		//Intento leer el archivo Products.json
		try
		{
			return JSON.parse(await fs.readFile(this.path,this.encoding));
		}
		catch (err)
		{
			// Si el archivo no existe lo creo y devuelvo un arrego vacio
			await this.fsWrite([]); 
			return [];
		}

	};

	// BUSCO UN PRODUCTO POR SU ID
	async getProductById(id) {

		try
		{		
			await this.loadData();
		}catch(err){
			return err;
		}
		
		// Verifico que exista el producto
		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {

			return foundProduct;

		}
		
		// Si no existe lanzo excepcion...
		throw `The product with ID ${id} was not found in the database`;

	};

	// BUSCO UN PRODUCTO POR SU ID Y LO ACTUALIZO CON LA NUEVA DATA
	async updateProduct(id, data) {

		try
		{
			await this.loadData();
		}
		catch(err)
		{
			return err;
		}
		
		// Busco el producto que quiero modificar
		const index = this.#products.findIndex(product => product.id === id);
		
		// Verifico que el codigo que se queira modificar, no pertenezca a otro producto
		const duplicateCode = this.#products.some(product => product.code === data.code);
		
		// Verifico que no se este queriendo modificar el ID
		const otherId = data.id !== undefined && id !== data.id;

		if(index >= 0 && !duplicateCode && !otherId ) {
				
			try{
				this.#products[index] = {...this.#products[index], ...data};

				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.#products); 
				return this.#products[index];
			}catch(err){
				return err;
			}

			// Si no existe el producto...
		}else if(index < 0) {

			throw `The product with ID ${id} was not found in the database`;

			// Si esta duplicado el codigo...
		}else if(duplicateCode) {

			throw `The product with code ${data.code} has already been created`;

			// Si se intenta modificar el ID...
		}else if(otherId) {

			throw 'Operation not allowed: ID field, cannot be modified';

		}

	};

	// BORRO UN PRODUCTO Y ACTUALIZO EL ARCHIVO PRODUCTS.JSON
	async deleteProduct(id) {

		try
		{
			await this.loadData();
		}catch(err){
			return err;
		}
		
		// Busco si existe el producto que quiero borrar
		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {

			this.#products = this.#products.filter(products => products.id !== id);

			try
			{
				// Le doy permanencia a los cambios realizados
				await this.fsWrite(this.#products); 

				return `Product ${foundProduct.title} with ID ${foundProduct.id} was successfully deleted`
			}
			catch(err)
			{
				return err;
			}

		};
		
		// Si el producto no existe lanzo una excepcion...
		throw `The product with ID ${id} was not found in the database and cannot be deleted`

	};

}

export default ProductManager;
