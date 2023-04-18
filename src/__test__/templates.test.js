const { default: mongoose } = require("mongoose");
const supertest = require("supertest");
const templates = require("../models/templates");
const createServer = require("../server");

const app = createServer();
require("dotenv").config();

const templatePayload = {
	name: "testTemplate",
	header: "testHeader",
	body: "testBody",
	cssFile: "testCss",
};

const editTemplatePayload = {
	name: "editpayload",
	header: "editHeader",
	body: "editBody",
	cssFile: "editCss",
};
describe("Templates", () => {
	beforeAll(async () => {
		try {
			mongoose.connect(process.env.test_connection_url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			const db = mongoose.connection;
			db.once("open", () => {
				console.log("Test DB connected");
			});
			console.log(`Server is running at port ${process.env.PORT}`);
		} catch (error) {
			console.log(error);
		}
	});

	afterAll(async () => {
		const collections = await mongoose.connection.db.collections();

		for (let collection of collections) {
			await collection.drop();
		}
		await mongoose.disconnect();
	});

	describe("Get all templates", () => {
		it("Should return all templates", async () => {
			const template = await templates.create(templatePayload);
			const { body, statusCode } = await supertest(app).get(
				"/v1/api/templates"
			);

			expect(statusCode).toBe(200);
			expect(body).toBeTruthy();
		});
	});

	describe("Get a template by id", () => {
		it("Should return the respective template", async () => {
			const template = await templates.create(templatePayload);
			const { body, statusCode } = await supertest(app).get(
				`/v1/api/templates/${template._id}`
			);

			expect(statusCode).toBe(200);
			expect(body.template).toEqual({
				__v: 0,
				_id: expect.any(String),
				name: template.name,
				header: template.header,
				body: template.body,
				cssFile: template.cssFile,
			});
		});
	});

	describe("Create template", () => {
		it("Should create a template based on the payload", async () => {
			const { body, statusCode } = await supertest(app)
				.post("/v1/api/templates/create")
				.send(templatePayload);
			expect(statusCode).toBe(200);
			expect(body).toHaveProperty("message", "Succesfully created template");
		});
	});

	describe("Update template", () => {
		it("Should update a part of the template", async () => {
			const template = await templates.create(templatePayload);
			const id = template._id.toString();

			const { body, statusCode } = await supertest(app)
				.patch(`/v1/api/templates/${id}`)
				.send(editTemplatePayload);

			expect(statusCode).toBe(200);
			expect(body.updateTemplate).toEqual({
				__v: 0,
				_id: expect.any(String),
				name: editTemplatePayload.name,
				header: editTemplatePayload.header,
				body: editTemplatePayload.body,
				cssFile: editTemplatePayload.cssFile,
			});
		});
	});
});
