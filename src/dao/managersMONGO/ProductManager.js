import ProductsMongoose from "./ProductsMongoose.js";
// import CourseMongooseDao from "../daos/CourseMongooseDao.js";

class ProductManager
{
	constructor()
	{
		this.products = new ProductsMongoose();
		// this.courseDao = new CourseMongooseDao();
	}

	async find()
	{
		return this.products.find();
	}

	async getOne(code)
	{
		return this.products.getOne(code);
	}

	async create(data)
	{
		return await this.products.create(data);
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

export default ProductManager;
