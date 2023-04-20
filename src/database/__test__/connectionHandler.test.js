const mongoose = require("mongoose");
require("dotenv").config();

jest.useFakeTimers();

describe("connectionHandler test suite", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should have the correct properties", () => {
		const DBConn = require("../connectionHandler");
		expect(DBConn.mongoDB.connect).toBeDefined();
		expect(typeof DBConn.mongoDB.connect).toBe("function");
		expect(DBConn.mongoDB.disconnect).toBeDefined();
		expect(typeof DBConn.mongoDB.disconnect).toBe("function");
	});

	test("When succesfull in making connection", async () => {
		const fakeDBConnString = "fake-dbconnStr";
		const fakeDBName = "fake-dbName";

		process.env.connection_url = fakeDBConnString;
		process.env.db_name = fakeDBName;

		const spyMongoConnect = jest
			.spyOn(mongoose, "connect")
			.mockResolvedValue(true);

		const DBConn = require("../connectionHandler");

		await DBConn.mongoDB.connect();

		expect(spyMongoConnect).toBeCalledTimes(1);
		expect(spyMongoConnect).toBeCalledWith(`${fakeDBConnString}`, {
			useNewUrlParser: true,
			dbName: fakeDBName,
			useUnifiedTopology: true,
		});
	});

	test("When unsuccessfull in making connection", async () => {
		const fakeDBConnString = "fake-dbconnStr";
		const fakeDBName = "fake-dbName";

		process.env.connection_url = fakeDBConnString;
		process.env.db_name = fakeDBName;

		const fakeError = new Error("fake-db-conn-error");
		const spyMongoConnect = jest
			.spyOn(mongoose, "connect")
			.mockResolvedValue(fakeError);

		const DBConn = require("../connectionHandler");

		await DBConn.mongoDB.connect();

		expect(spyMongoConnect).toBeCalledTimes(1);
		expect(spyMongoConnect).toBeCalledWith(`${fakeDBConnString}`, {
			useNewUrlParser: true,
			dbName: fakeDBName,
			useUnifiedTopology: true,
		});
	});
});

describe("Check registered event handers", () => {
	test("On connected", () => {
		const onConnected = mongoose.connection._events["connected"];
		expect(typeof onConnected).toBe("function");
		const spyConsoleLog = jest.spyOn(console, "log");

		const result = onConnected();
		expect(spyConsoleLog).toHaveBeenCalledTimes(1);
		expect(spyConsoleLog.mock.calls).toMatchSnapshot();

		expect(result).toBe(undefined);
	});

	test("on reconnected", () => {
		const onReconnected = mongoose.connection._events.reconnected;

		expect(typeof onReconnected).toBe("function");
		const spyConsoleLog = jest.spyOn(console, "log");

		const result = onReconnected();

		expect(spyConsoleLog).toHaveBeenCalledTimes(1);
		expect(spyConsoleLog.mock.calls).toMatchSnapshot();

		expect(result).toBe(undefined);
	});
});
