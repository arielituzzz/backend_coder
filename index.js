class ProductManager {

	#autoId = 1;

	constructor() {
		this.products = [];
	}

	addProduct(title, description, price, thumbnail, stock, code) {
		
		if(title, description, price, thumbnail, stock, code) {
			

			const duplicateCode = this.products.some(product => product.code === code)
			
			if(!duplicateCode) {
	
				const product = {
						id: this.#autoId,
						title: title,
						description: description,
						price: price,
						thumbnail: thumbnail,
						stock: stock,
						code: code
						}

			this.products.push(product);

			this.#autoId++

			return "Saved product";

			}else{
				return `Code "${code}" duplicate`;
			};
		}else{
			return "Fiels are missing";
		};
		

	};

	getProducts() {
		return this.products;
	};

	getProductById(id) {
		const product = this.products.find(product => product.id === id)

		if(product) {
			return product;
		}else{
			return "Not found";
		};
	};


}

const fruits = new ProductManager();

fruits.addProduct("Banana","amarilla",100,"https://pixabay.com/es/vectors/pl%c3%a1tano-fruta-comida-fruta-amarilla-310449/",500,"abc111");

fruits.addProduct("Kiwi","verde",300,"https://www.gastronomiavasca.net/es/gastro/glossary/2179",1500,"abc222");

console.log(fruits.addProduct("roja",200,"https://es.dreamstime.com/imagenes-de-archivo-apple-rojo-aislado-con-el-camino-de-recortes-image19130134",1000,"abc333")); //Este producto no lo deberia agregar porque me falto el "title".

console.log(fruits.addProduct("Manzana","roja",200,"https://es.dreamstime.com/imagenes-de-archivo-apple-rojo-aislado-con-el-camino-de-recortes-image19130134",1000,"abc222")); //Este producto no lo deberia agregar porque esta duplicado el "code".

console.log(fruits.getProducts());

console.log(fruits.getProductById(2));

console.log(fruits.getProductById(4));
