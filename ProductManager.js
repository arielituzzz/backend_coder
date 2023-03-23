const fs = require("fs").promises;

class ProductManager {

	#autoId;
	#products;

	constructor() {
		this.path = "./Products.json"
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

const manager = async () => {

	const productManager = new ProductManager();

	const product1 = {
		title: "Pearl",
		description: "Yellow",
		price: 100,
		thumbnail: "image1",
		code: "abc111",
		stock: 10
	};

	//Este producto no lo debe agregar porque tiene un tipo de dato erroneo al que le pase por parametro a la propiedad "thumbnail".
	const product2 = {
		title: "Orange",
		description: "Orange",
		price: 200,
		thumbnail: 15,
		code: "abc222",
		stock: 20
	};

	const product3 = {
		title: "Apple",
		description: "Red",
		price: 300,
		thumbnail: "image3",
		code: "abc333",
		stock: 30
	};

	//Este producto no lo debe agregar porque tiene el "code" repetido.
	const product4 = {
		title: "Melon",
		description: "Amber",
		price: 400,
		ithumbnail: "image4",
		code: "abc111",
		stock: 40
	};

	//Este producto no lo debe agregar porque le falta declarar el stock.
	const product5 = {
		title: "Kiwi",
		description: "Green",
		price: 500,
		thumbnail: "image5",
		code: "abc555",
	};

	const product6 = {
		title: "PasionFruit",
		description: "Orange",
		price: 600,
		thumbnail: "image6",
		code: "abc666",
		stock: 60
	};

	const product7 = {
		title: "WaterMelon",
		description: "Pink",
		price: 700,
		thumbnail: "image7",
		code: "abc777",
		stock: 70
	};

	//	console.log(await productManager.addProduct(product1));
	//	console.log(await productManager.addProduct(product2));
	//	console.log(await productManager.addProduct(product3));
	//	console.log(await productManager.addProduct(product4));
	//	console.log(await productManager.addProduct(product5));
	//	console.log(await productManager.addProduct(product6));
	//	console.log(await productManager.addProduct(product7));
	//	console.log(await productManager.getProductById(2));
	//	console.log(await productManager.getProductById(35));
	// 	console.log(await productManager.deleteProduct(2));
	//	console.log(await productManager.updateProduct(1, product7));


	const products = await productManager.getProducts();
	console.log(products);
};

manager();
