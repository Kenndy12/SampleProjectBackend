const {
	list,
	getTemplatesByUser,
	create,
	edit,
	sendEmail,
} = require("../../handlers/templateHandler");

jest.mock("../../handlers/templateHandler");

describe("test template routes", () => {
	let mockRoutePost;
	let mockRoutePatch;
	let mockRouteGet;

	beforeAll(() => {
		mockRoutePost = jest.fn();
		mockRoutePatch = jest.fn();
		mockRouteGet = jest.fn();
		jest.mock("express", () => ({
			Router: jest.fn(() => ({
				post: mockRoutePost,
				patch: mockRoutePatch,
				get: mockRouteGet,
			})),
		}));
	});

	const mockTemplateService = jest.fn();
	let templateRouter;
	beforeEach(() => {
		templateRouter = require("../templates");
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("List Template should be configured correctly", async () => {
		templateRouter(mockTemplateService);
		expect(mockRouteGet).toHaveBeenCalledTimes(2);
		expect(list).toHaveBeenCalledWith(mockTemplateService);
	});

	test("Get Template by user should be configured correcty", async () => {
		templateRouter(mockTemplateService);
		expect(mockRouteGet).toHaveBeenCalledTimes(2);
		expect(getTemplatesByUser).toHaveBeenCalledWith(mockTemplateService);
	});

	test("Create Template should be configured correcty", async () => {
		templateRouter(mockTemplateService);
		expect(mockRoutePost).toHaveBeenCalledTimes(2);
		expect(edit).toHaveBeenCalledWith(mockTemplateService);
	});

	test("Edit Template should be configured correcty", async () => {
		templateRouter(mockTemplateService);
		expect(mockRoutePatch).toHaveBeenCalledTimes(1);
		expect(create).toHaveBeenCalledWith(mockTemplateService);
	});

	test("Send Template Email should be configured correcty", async () => {
		templateRouter(mockTemplateService);
		expect(mockRoutePost).toHaveBeenCalledTimes(2);
		expect(sendEmail).toHaveBeenCalledWith(mockTemplateService);
	});
});
