
document.addEventListener('DOMContentLoaded', function () {
	var default_data;
	chrome.storage.sync.get("data", ({ data }) => {
		default_data = data;
	  });
	document.querySelector(".info").innerHTML = "Привет," + default_data.name + "!";
	var login_link = document.getElementById('login_link');
	login_link.parentNode.removeChild(login_link);
	for (var i = default_data.subjects.length - 2; i >= 0; i--) {
		const $newLi = document.createElement('li');
		$newLi.textContent = default_data.subjects[i].name;
		const $colors = document.querySelector('#subjects');
		const $tasks = document.querySelector('#tasks');
		$colors.appendChild($newLi);
		for (var j = default_data.subjects[i].tasks.length - 1; j >= 0; j--) {
			const $newTask = document.createElement('li');
			let subjects = data.subjects[i];
			$newTask.textContent = subjects.tasks[j];
			$tasks.appendChild($newTask);
		}
		
	  }
});
chrome.runtime.onMessage.addListener(
	function(response, sender, sendResponse) {

	  let data  = response;
	  document.querySelector(".info").innerHTML = "Привет," + data.name + "!";
	  var login_link = document.getElementById('login_link');
      login_link.parentNode.removeChild(login_link);
	  for (var i = data.subjects.length - 2; i >= 0; i--) {
		const $newLi = document.createElement('li');
		$newLi.textContent = data.subjects[i].name;
		const $colors = document.querySelector('#subjects');
		const $tasks = document.querySelector('#tasks');
		$colors.appendChild($newLi);
		for (var j = data.subjects[i].tasks.length - 1; j >= 0; j--) {
			const $newTask = document.createElement('li');
			let subjects = data.subjects[i];
			$newTask.textContent = subjects.tasks[j];
			$tasks.appendChild($newTask);
		}
	  }
	}
  );

