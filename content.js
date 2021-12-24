
if( document.readyState !== 'loading' ) {
    console.log( 'Документ уже загружен' );
    setTimeout(function() {
  myInitCode();
}, 3000);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log( 'Документ только грузится' );
        setTimeout(function() {
  myInitCode();
}, 3000);
    });
}
function getElement(url, selector, c) {
    request(new XMLHttpRequest());

    function request(xhr) {
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4) {
                if(xhr.status == 200) {
                    html = document.createElement('div');
                    html.innerHTML = xhr.responseText;
                    c(html.querySelectorAll(selector));
                }
            }
        }
    }
}
function myInitCode() {
	var link = $("a.aalink.coursename.mr-2");
	var name_link = $(".page-header-headings")
	var name = name_link[0].innerHTML.slice(4, -5).split(" ")[1];
	var subjects = [];
	
    for (var i = link.length - 2; i >= 0; i--) {
		let tasks = [];
		let href = link[i].href;
		let course_id = href.replace(/[^0-9]/g,"");
		getElement('https://e.sfu-kras.ru/grade/report/user/index.php?id=' + course_id, '.gradeitemheader', function(element) {
			for(var j = element.length - 1; j >=0; j--) {
				let task_check = element[j].title.includes("Итого");
				if (task_check == false) {
					tasks[j] = element[j].title.replace("Ссылка на элемент курса ", "");
				}
				
			}
		});
		subjects[i] = {
			'name':link[i].innerText.substr(15),
			 'tasks':tasks};
     }; 
	 var data = {
		'name': name,
		'subjects': subjects

	};
	console.log(data);
	let p = data.subjects[0];
	console.log(p);
	setTimeout(function() {
		chrome.storage.sync.set({ data });
		chrome.runtime.sendMessage(data);
	  }, 6000);
	
	
	
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


