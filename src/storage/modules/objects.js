import {getRandomIntInclusive, sendAjaxRequest} from "../../assets/js/scripts.js";

export default {
	state: {
		flat: []
	},
	actions: {
		loadObject: function (context) {
			sendAjaxRequest("GET", "/src/storage/database.json")
				.then((response) => JSON.parse(response))
				.then((db) => {
					let index;
					let object = null;
					if (db.length) {
						index = getRandomIntInclusive(0, db.length - 1);
						object = db[index];
					}
					context.commit("updateObject", object);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		saveObject: function (context) {
			let json = JSON.stringify(context.getters.getCurrentObject);
			sendAjaxRequest("POST", "//localhost:8080", json);
		}
	},
	mutations: {
		updateObject(state, object) {
			state.flat = ({...object}) || null;
		},
		setTypeOfProperty(state, property) {
			if (!property || !state.flat) return;
			state.flat.typeOwn = property;
		},
		updateUsersList(state, users) {
			state.flat.participants = users;
		}
	},
	getters: {
		getCurrentObject(state) {
			return state.flat;
		}
	}
};
