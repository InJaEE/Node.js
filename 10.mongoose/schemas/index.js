const mongoose = require('mongoose');
module.exports = () => {
	const connect = () => {
		mongoose.connect("mongodb://in11202:000000@localhost:15000/admin", {
			dbName: "in11202"
		}, (err) => {
			if(err) console.error("몽고디비 연결 오류", err);
			else console.log("몽고디비 연결 성공");
		})
	}
	connect();

	mongoose.connection.on("error", (err) => {
		console.error("MongooseERROR", err);
	});

	mongoose.connection.on("disconnected", () => {
		console.error("MongooseDisconnection");
		connect();
	});
}