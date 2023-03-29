import fs from "fs/promises";

class ProductManager {

	#autoId;
	#products;

	constructor() {
		this.path = "./src/Products.json"
		this.encoding = {encoding: "utf-8"}
		this.#autoId = 0
		this.#products = []
	}

	// Cargo la info del archivo Products.json en el array de productos y actualizo el ultimo ID generado para no pisar los nuevos que se creen.
	async loadData() {

		this.#products = await this.getProducts();

		if(this.#products.length > 0){
			return this.#autoId = this.#products.at(-1).id;
		};

	};

	// Metodo reutilizable para la escritura del archivo Products.json .
	async fsWrite (array) {

		try{	
			await fs.writeFile(this.path, JSON.stringify(array)); 
		}
		catch(err){
			return err;
		}
	};


	// Agrego un producto
	async addProduct({title, description, price, thumbnail, code, stock}) {

		await this.loadData();

		const duplicateCode = this.#products.some(product => product.code === code);

		if(typeof title === "string" && typeof description === "string" && typeof price === "number" && typeof thumbnail === "string" && typeof code === "string" && typeof stock === "number" && !duplicateCode ) {


			this.#products.push({
				id: ++this.#autoId,
				title,
				description,
				price,
				thumbnail,
				code,
				stock

			});

			try
			{
				await this.fsWrite(this.#products); 

				return `The ${title} product was successfully added`;
			}
			catch(err)
			{
				return err;
			}

		}

		return "Incorrectly entered data (addProduct)";


	};



	// Traigo los productos desde el archivo "Products.json"
	async getProducts() {
		try
		{
			return JSON.parse(await fs.readFile(this.path,this.encoding));
		}
		catch (err)
		{
			await this.fsWrite([]); 

			return [];
		}
	};

	// Busco un producto por su ID
	async getProductById(id) {

		await this.loadData();

		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {
			return foundProduct;
		}

		return `The product with ID ${id} was not found in the database`;

	};

	// Busco un producto por su ID y lo actualizo con la nueva DATA
	async updateProduct(id, data) {

		await this.loadData();

		const index = this.#products.findIndex(product => product.id === id);

		const duplicateCode = this.#products.some(product => product.code === data.code);

		if(index >= 0 && !duplicateCode) {

			this.#products[index] = {id, ...data};

			try
			{

				await this.fsWrite(this.#products); 

				return this.#products[index];
			}
			catch(err)
			{
				return err;
			}
		}else if(index < 0) {

			return `The product with ID ${id} was not found in the database`;

		}else if(duplicateCode) {

			return `The product with code ${data.code} has already been created`;

		}

		// return "Incorrectly entered data (updateProducts)";

	};

	// Borro un producto del archivo "Products.json"
	async deleteProduct(id) {

		await this.loadData();

		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {

			this.#products = this.#products.filter(products => products.id !== id);


			try
			{

				await this.fsWrite(this.#products); 

				return `${foundProduct.title} product with ID ${foundProduct.id} was successfully deleted`
			}
			catch(err)
			{
				return err;
			}
		}
		return `The product with ID ${id} was not found in the database and cannot be deleted`
	};


}


export default ProductManager;
