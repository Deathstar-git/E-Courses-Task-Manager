window.addEventListener('DOMContentLoaded', () => {
	const body = document.getElementByClass('body');
	body.childNodes.forEach(node => {
		console.log(node);
	})
});