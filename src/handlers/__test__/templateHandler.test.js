const {
	list,
	getTemplatesByUser,
	create,
	edit,
	sendEmail,
} = require("../templateHandler");

const mockedTemplateService = {
	list: jest.fn(),
	getTemplatesByUser: jest.fn(),
	createTemplate: jest.fn(),
	updateTemplate: jest.fn(),
	sendEmail: jest.fn(),
};

describe("Template handler test", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	describe("List template method", () => {
		test("List should be called correctly and response ok", async () => {
			const templates = [{ name: "Template 1" }, { name: "Template 2" }];
			mockedTemplateService.list.mockResolvedValue(templates);

			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await list(mockedTemplateService)(null, mockResponse);

			expect(mockedTemplateService.list).toHaveBeenCalled();
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Succesfully retrieved templats",
				templates,
			});
		});
		test("List called uncorrectly and will return an error 500", async () => {
			mockedTemplateService.list.mockRejectedValue();

			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			await list(mockedTemplateService)(null, mockResponse);

			expect(mockedTemplateService.list).toHaveBeenCalled();
			expect(mockResponse.status).toHaveBeenCalledWith(500);
		});
	});

	describe("getTemplateByUser method", () => {
		test("getTemplateByUser should be called correctly and the response is ok", async () => {
			const userId = "123";
			const templates = [{ name: "Template 1" }, { name: "Template 2" }];
			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				user: { id: userId },
			};
			mockedTemplateService.getTemplatesByUser.mockResolvedValue(templates);

			await getTemplatesByUser(mockedTemplateService)(null, mockResponse);

			expect(mockedTemplateService.getTemplatesByUser).toHaveBeenCalledWith(
				userId
			);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Succesfully retrieved templates",
				templates,
			});
		});

		test("getTemplateByUser called uncorrectly and will return an error 500", async () => {
			const userId = "123";
			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				user: { id: userId },
			};
			mockedTemplateService.getTemplatesByUser.mockRejectedValue();

			await getTemplatesByUser(mockedTemplateService)(null, mockResponse);

			expect(mockedTemplateService.getTemplatesByUser).toHaveBeenCalledWith(
				userId
			);
			expect(mockResponse.status).toHaveBeenCalledWith(500);
		});
	});

	describe("Create template method", () => {
		test("Create should be called correctly and return an ok response", async () => {
			const userId = "123";
			const newTemplate = {
				name: "New Template",
				body: "<h1>Hello world</h1>",
			};
			const mockRequest = { body: newTemplate };
			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				user: { id: userId },
			};
			const createdTemplate = {
				_id: "template-123",
				...newTemplate,
				belongsTo: userId,
			};
			mockedTemplateService.createTemplate.mockResolvedValue(createdTemplate);

			await create(mockedTemplateService)(mockRequest, mockResponse);

			expect(mockedTemplateService.createTemplate).toHaveBeenCalledWith({
				id: userId,
				...newTemplate,
			});
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Succesfully created template",
				data: createdTemplate,
			});
		});

		test("Create called uncorrectly and will return an error 500", async () => {
			const userId = "123";
			const mockRequest = {
				body: { name: "New Template", content: "<h1>Hello world</h1>" },
			};
			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(() => mockResponse),
				user: { id: userId },
			};
			mockedTemplateService.createTemplate.mockRejectedValue();

			await create(mockedTemplateService)(mockRequest, mockResponse);

			expect(mockedTemplateService.createTemplate).toHaveBeenCalledWith({
				id: userId,
				...mockRequest.body,
			});
			expect(mockResponse.status).toHaveBeenCalledWith(500);
		});
	});

	describe("Edit template method", () => {
		test("Edit should be called correctly and return an ok response", async () => {
			const mockRequest = {
				params: {
					id: "template-id",
				},
				body: {
					name: "Updated Template Name",
					body: "<h1>Updated Hello World</h1>",
				},
			};

			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				user: { id: "123" },
			};

			const expectedData = {
				id: "template-id",
				name: "UpdatedTemplate Name",
				body: "<h1>Updated Hello world</h1>",
			};
			mockedTemplateService.updateTemplate.mockResolvedValueOnce(expectedData);

			await edit(mockedTemplateService)(mockRequest, mockResponse);

			expect(mockedTemplateService.updateTemplate).toHaveBeenCalledWith({
				id: "template-id",
				name: "Updated Template Name",
				body: "<h1>Updated Hello World</h1>",
			});
			expect(mockResponse.status).toHaveBeenCalledWith(200);
		});
		test("Edit should be called uncorrectly and return an error 500", async () => {
			const mockRequest = {
				params: {
					id: "template-id",
				},
				body: {
					name: "Updated Template Name",
					body: "<h1>Updated Hello World</h1>",
				},
			};

			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
				user: { id: "123" },
			};

			mockedTemplateService.updateTemplate.mockRejectedValue();

			await edit(mockedTemplateService)(mockRequest, mockResponse);

			expect(mockedTemplateService.updateTemplate).toHaveBeenCalledWith({
				id: "template-id",
				name: "Updated Template Name",
				body: "<h1>Updated Hello World</h1>",
			});
			expect(mockResponse.status).toHaveBeenCalledWith(500);
		});
	});
	describe("sendEmail method", () => {
		test("sendEmail called correctly and should return an OK response", async () => {
			const mockRequest = {
				sender: "example@email.com",
				receiver: "example2@email.com",
				header: "this is header",
				body: "<h1>Hello World</h1>",
			};

			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			mockedTemplateService.sendEmail.mockResolvedValueOnce(true);
			await sendEmail(mockedTemplateService)(mockRequest, mockResponse);

			// Assert
			expect(mockedTemplateService.sendEmail).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(200);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "Successfully sent email",
				sentStatus: true,
			});
		});
		test("sendEmail called uncorrectly and returns an error 500", async () => {
			const mockRequest = {
				sender: "example@email.com",
				receiver: "example2@email.com",
				header: "this is header",
				body: "<h1>Hello World</h1>",
			};

			const mockResponse = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};
			mockedTemplateService.sendEmail.mockRejectedValueOnce("error");
			await sendEmail(mockedTemplateService)(mockRequest, mockResponse);

			// Assert
			expect(mockedTemplateService.sendEmail).toHaveBeenCalledTimes(1);
			expect(mockResponse.status).toHaveBeenCalledWith(500);
			expect(mockResponse.json).toHaveBeenCalledWith({
				message: "error",
			});
		});
	});
});
