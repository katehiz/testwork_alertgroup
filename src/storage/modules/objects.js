export default {
    state: {
        flat: []
    },
    actions: {
        loadObject: function (context) {
            sendAjaxRequest("GET", "/src/storage/database.json")
                .then( (response) => JSON.parse(response) )
                .then( (db) => {
                    let index, object = null;
                    if (db.length) {
                        index = getRandomIntInclusive(0, db.length - 1);
                        object = db[index];
                    }
                    context.commit("updateObject", object);
                })
                .catch( (error) => {console.error("Ошибка получения данных", error.statusText);} );
        },
        saveObject(context) {
            let json = JSON.stringify(context.getters.getCurrentObject);
            sendAjaxRequest("POST", "//localhost", json);
        }
    },
    mutations: {
        updateObject(state, object) {
            state.flat = object || null;
        },
        setTypeOfProperty(state, property) {
            if (!property || !state.flat) return;
            state.flat.typeOwn = property;
        },
        updateUsersList(state, AUsers) {
            state.flat.participants = AUsers;
        }
    },
    getters: {
        getCurrentObject(state) {
            return state.flat;
        }
    }
};

// получить случайное целое число
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

// асинхронный Ajax-запрос
function sendAjaxRequest(method, url, data) {
    method = method || "GET";
    let xhr = new XMLHttpRequest();
    return new Promise( function(resolve, reject) {
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(data);
    });
}