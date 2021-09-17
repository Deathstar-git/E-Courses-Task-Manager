
if( document.readyState !== 'loading' ) {
    console.log( 'Документ уже загружен' );
    setTimeout(function() {
  myInitCode();
}, 1000);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log( 'Документ только грузится' );
        setTimeout(function() {
  myInitCode();
}, 1000);
    });
}
function myInitCode() {
	var link = $("a.aalink.coursename.mr-2");
    console.log(link); 
}

let textNodes = [];
function recursion(element) {
	element.childNodes.forEach(node => {
		if (node.nodeName.match(/^SPAN/)) {
			console.log(node);
			console.log(node.nodeValue);
			console.log(node.q)
			textNodes.push(node.textContent);
		} else {
			recursion(node);
		}
	});
}


