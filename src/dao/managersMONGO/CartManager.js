import ProductsMongoose from "./ProductsMongoose.js";
import CartsMongoose from "./CartsMongoose.js";

class CartManager
{
	constructor()
	{
		this.carts = new CartsMongoose();
		// this.courseDao = new CourseMongooseDao();
	}

	async find()
	{
		return this.carts.find();
	}

	async getOne(id)
	{
		return this.carts.getOne(id);
	}

	async create()
	{
		return await this.carts.create();
	}

	async updateOne(code, data)
	{
		return this.products.updateOne(code, data);
	}

	async deleteOne(id)
	{
		return this.products.deleteOne(id);
	}

//async addCourse(sid, cid)
//{
//	const student = await this.studentDao.getOne(sid);
//	const course = await this.courseDao.getOne(cid);
//
//	const oldCoursesId = student.courses.map(course => course.id);
//
//	oldCoursesId.forEach((id) =>
//		{
//			if( id.toString() !== course.id.toString() )
//			{
//				oldCoursesId.push(course.id);
//			}
//		});
//
//	student.courses = oldCoursesId;
//
//	await this.studentDao.updateOne(sid, student);
//}

}

export default CartManager;
