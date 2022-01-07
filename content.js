let subjects = [];
let tasks = [];
let username;

function getSubjects() {
    let link = $("a.aalink.coursename.mr-2");
    var name_link = $(".page-header-headings");
    username = name_link[0].innerHTML.slice(4, -5).split(" ")[1];
    for (let i = link.length - 2; i >= 0; i--) {
        subjects[i] = {
            'name': link[i].innerText.substr(15),
            'href': link[i]['href']
        };
    }
    ;
}

function getTasks() {
    let task_selector = '.gradeitemheader';
    let tasks_elem;
    let statuses_elem;

    subjects.forEach(function (sub) {
        let course_id = sub.href.replace(/[^0-9]/g, "");
        let url = 'https://e.sfu-kras.ru/grade/report/user/index.php?id=' + course_id;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                html = document.createElement('div');
                html.innerHTML = xhr.responseText;
                tasks_elem = html.querySelectorAll(task_selector);
                statuses_elem = html.querySelectorAll('.level1.levelodd.oddd1.baggt.b2b.itemcenter.column-grade, .level2.leveleven.item.b1b.itemcenter.column-grade, .level2.leveleven.oddd2.baggt.b2b.itemcenter.column-grade, .level2.leveleven.evend2.baggt.b2b.itemcenter.column-grade, .level3.levelodd.item.b1b.itemcenter.column-grade'
                );

                tasks_elem.forEach(function (t, i) {
                    tasks.push(
                        {
                            'name': t.title.replace("Ссылка на элемент курса ", ""),
                            'href': t.href,
                            'subject': sub.name,
                            'status': statuses_elem[i].innerHTML
                        })
                });
            }
        }

    });
}


if (document.readyState !== 'loading') {
    console.log('Документ уже загружен');

    setTimeout(function () {
        getSubjects();
    }, 3000);
    setTimeout(function () {
        getTasks();
    }, 3000);
    setTimeout(function () {
        var data = {
            'name': username,
            'subjects': subjects,
            'tasks': tasks,
        }
        chrome.runtime.sendMessage(data);
        console.log(data);
    }, 20000);
} else {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('Документ только грузится');
        setTimeout(function () {
            getSubjects();
        }, 3000);

    });
}

/////////////////////////////////////////////

// if( document.readyState !== 'loading' ) {
//     console.log( 'Документ уже загружен' );
//     setTimeout(function() {
//         myInitCode();
//     }, 3000);
// } else {
//     document.addEventListener('DOMContentLoaded', function () {
//         console.log( 'Документ только грузится' );
//         setTimeout(function() {
//             myInitCode();
//         }, 3000);
//     });
// }

// var tasks = [];
// var subjects = [];
// function myInitCode() {
//     var link = $("a.aalink.coursename.mr-2");
//     var name_link = $(".page-header-headings")
//     var name = name_link[0].innerHTML.slice(4, -5).split(" ")[1];
//     for (var i = link.length - 2; i >= 0; i--) {
//
//         let href = link[i].href;
//         let course_id = href.replace(/[^0-9]/g,"");
//
//         getElement('https://e.sfu-kras.ru/grade/report/user/index.php?id=' + course_id, '.gradeitemheader', function(element) {
//             for(var j = element.length - 1; j >=0; j--) {
//                 let task_check = element[j].title.includes("Итого");
//                 if (task_check == false) {
//                     if (element[j].href == undefined) {
//
//                     } else {
//                         tasks[j] = {
//                             'name':element[j].title.replace("Ссылка на элемент курса ", ""),
//                             'href':element[j].href,
//                             'status': getElement(element[j].href, ".lastcol", function(element){
//                             })
//                         };
//
//
//                     };
//
//                 };
//
//
//             };
//             console.log(element);
//
//         });
//
//     };
//
//
//     setTimeout(function() {
//         var link = $("a.aalink.coursename.mr-2");
//         for(var i = link.length - 2; i >= 0; i--) {
//             subjects[i] = {
//                 'name':link[i].innerText.substr(15),
//                 'tasks':tasks
//             };
//         };
//         var data = {
//             'name': name,
//             'subjects': subjects
//         };
//         chrome.runtime.sendMessage(data);
//     }, 15000);
// };


// function getElement(url, selector) {
//     let elem;
//
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.send();
//
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             html = document.createElement('div');
//             html.innerHTML = xhr.responseText;
//             console.log(html);
//             elem = html.querySelectorAll(selector);
//             console.log(elem);
//         }
//     }
//
//     console.log(elem)
//     return elem;
// }
// function getElement(url, selector) {
//     let elem;
//     $.get(url, function (data){
//         elem = $(selector, data).html();
//         console.log(elem);
//     });
// }
// function getElement(url, selector, c, store, key) {
//     request(new XMLHttpRequest());
//     let elem;
//
//     function request(xhr) {
//         xhr.open('GET', url, true);
//         xhr.send();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 html = document.createElement('div');
//                 html.innerHTML = xhr.responseText;
//                 elem = html.querySelectorAll(selector);
//                 c(store, key);
//             }
//         }
//     }
// }
// function getStatuses() {
//     let selector = '.lastcol';
//     let elem;
//
//     tasks.forEach(function (task) {
//         let url = task.href;
//
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url);
//         xhr.send();
//
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 html = document.createElement('div');
//                 html.innerHTML = xhr.responseText;
//                 elem = html.querySelectorAll(selector);
//                 console.log(elem);
//
//
//             }
//         }
//     });
// }
// function getTasks() {
//     subjects.forEach(function (sub) {
//         let course_id = sub.href.replace(/[^0-9]/g, "");
//         getElement('https://e.sfu-kras.ru/grade/report/user/index.php?id=' + course_id, '.gradeitemheader', key=sub.name);
//     });
// }
