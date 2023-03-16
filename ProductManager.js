const fs = require("fs").promises;

class ProductManager {

	#autoId = 1;
	#products = [];

	constructor() {
		this.path = "./Products.json"
		this.encoding = {encoding: "utf-8"}
	}

	// Cargo la info del archivo Usuarios.json en el array de productos
	async loadData() {
		this.#products = await this.getProducts();
	};


	// Agrego un producto
	async addProduct({title, description, price, thumbnail, code, stock}) {


		const duplicateCode = this.#products.some(product => product.code === code);

		if(typeof title === "string" && typeof description === "string" && typeof price === "number" && typeof thumbnail === "string" && typeof code === "string" && typeof stock === "number" && !duplicateCode ) {


			this.#products.push({
				id: this.#autoId++,
				title,
				description,
				price,
				thumbnail,
				code,
				stock

			});
			await fs.writeFile(this.path, JSON.stringify(this.#products)); 

			return `The ${title} product was successfully added`;
		}

		return "Incorrectly entered data";


	};



	// Traigo los productos desde el archivo "Products.json"
	async getProducts() {
		try
		{
			const products = await fs.readFile(this.path,this.encoding);
			return JSON.parse(products);
		}
		catch (err)
		{
			await fs.writeFile(this.path, '[]');
			return [];
		}
	};

	// Busco un producto por su ID
	async getProductById(id) {

		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {
			return foundProduct;
		}

		return `The product with ID ${id} was not found in the database`;

	};

	// Actualizo un producto buscandolo por su ID
	async updateProducts(id, data) {

		const foundProduct = this.#products.find(product => product.id === id);




	};

	// Borro un producto del archivo "Products.json"
	async deleteProduct(id) {


		const foundProduct = this.#products.find(product => product.id === id );

		if(foundProduct) {

			const newProductsList = this.#products.filter(products => products.id !== id);

			this.#products = newProductsList;

			await fs.writeFile(this.path, JSON.stringify(this.#products));

			return `${foundProduct.title} product with ID ${foundProduct.id} was successfully deleted`
		}

		return `The product with ID ${id} was not found in the database and cannot be deleted`
	};


}

const manager = async () => {

	const productManager = new ProductManager();

	await productManager.loadData();

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
		thumbnail: "image4",
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

	console.log(await productManager.addProduct(product1));
	console.log(await productManager.addProduct(product2));
	console.log(await productManager.addProduct(product3));
	console.log(await productManager.addProduct(product4));
	console.log(await productManager.addProduct(product5));
	console.log(await productManager.getProductById(2));
	console.log(await productManager.getProductById(35));
	//	console.log(await productManager.deleteProduct(3));


	const products = await productManager.getProducts();
	console.log(products);
};

manager();
