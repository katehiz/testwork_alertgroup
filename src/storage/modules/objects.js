import {getRandomIntInclusive, sendAjaxRequest} from "../../assets/js/scripts.js";

export default {
	state: {
		flat: []
	},
	actions: {
		/*LOAD_OBJECT: (context) => {
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
		},*/
		LOAD_OBJECT: async function(context) {
			let objects = await sendAjaxRequest("GET", "/src/storage/database.json");
			objects = JSON.parse(objects);
			let index = 0,
				object = null;
			if (objects.length) {
				index = getRandomIntInclusive(0, objects.length - 1);
				object = objects[index];
			}
			context.commit("updateObject", object);
		},
		SAVE_OBJECT: function (context) {
			let json = JSON.stringify(context.getters.getCurrentObject);
			sendAjaxRequest("POST", "//localhost:8080", json);
		},
		UPDATE_OBJECT: (context, object) => {
			context.commit("updateObject", object);
		},
		UPDATE_USERS: (context, users_object) => {
			context.commit("updateUsersList", users_object)
		}
	},
	mutations: {
		updateObject(state, object) {
			state.flat = {...object} || null;
		},
		setTypeOfProperty(state, property) {
			if (!property || !state.flat) return;
			state.flat.typeOwn = property;
		},
		updateUsersList(state, users_object) {
			state.flat.participants = users_object;
		}
	},
	getters: {
		getCurrentObject(state) {
			return state.flat;
		},
		getUsers(state) {
			return state.flat.participants;
		}

	}
};
