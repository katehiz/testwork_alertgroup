// Custom select
import Selectr from "mobius1-selectr/src/selectr";

export const CustomSelect = (function (document) {
	function init() {
		const selectboxes = document.querySelectorAll("select");
		if (!selectboxes) return;
		[...selectboxes].forEach(function (element) {
			new Selectr(element, {
				searchable: false
			});
		});
	}
	return {
		init: init
	};
}(window.document));

export const Accordion = (function (document) {
	function init() {
		let toggleButtons = document.querySelectorAll(".section__toggle-btn");
		if (!toggleButtons) return;
		[...toggleButtons].forEach(function (element) {
			let section = element.closest(".accordion");
			if (!section) return;
			element.addEventListener("click", function () {
				section.classList.toggle("toggled");
			});
		});
	}

	return {
		init: init
	};
}(window.document));

// получить случайное целое число
export function getRandomIntInclusive(min, max) {
	let minVal = Math.ceil(min);
	let maxVal = Math.floor(max);
	return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

// асинхронный Ajax-запрос
export function sendAjaxRequest(method = "GET", url, data) {
	let xhr = new XMLHttpRequest();
	return new Promise(function (resolve, reject) {
		xhr.open(method, url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
		xhr.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(xhr.response);
			} else {
				reject(new Error(`Ошибка получения данных: ${this.statusText}`));
			}
		};
		xhr.onerror = function () {
			reject(new Error(`Ошибка получения данных: ${this.statusText}`));
		};
		xhr.send(data);
	});
}
