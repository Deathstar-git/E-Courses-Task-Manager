document.addEventListener('DOMContentLoaded', function () {
    var default_data = JSON.parse(localStorage.getItem('my_data'));
    // chrome.storage.local.get(['my_data'], ({data}) => {
    //     default_data = data;
    // });
    document.querySelector(".username-div").innerHTML = "Привет," + default_data.name + "!";
    if (document.getElementById('login_link') !== null) {
        var login_link = document.getElementById('login_link');
        login_link.parentNode.removeChild(login_link);
    }
    for (var i = 0; i <= default_data.subjects.length - 1; i++) {
        const $newSubject = document.createElement('div');
        
        $newSubject.classList.add('subject');
        
        const $newSubjectName = document.createElement('p');
        $newSubjectName.textContent = default_data.subjects[i].name;
        $newSubject.appendChild($newSubjectName);

        const $subjects = document.querySelector('#subjects');
        $subjects.appendChild($newSubject);
        for (var j = 0; j <= default_data.tasks.length - 1; j++) {
            if(default_data.tasks[j].subject === default_data.subjects[i].name) {
                const $newTaskDiv = document.createElement('div');
                const $newTask = document.createElement('a');
                $newTask.href = default_data.tasks[j].href;
                let task_status = default_data.tasks[j].status;
                if (task_status == "Ответы для оценки" || task_status == "Оценено") {
                    $newTaskDiv.classList.add('success');
                }
                if (task_status == "-") {
                    $newTaskDiv.classList.add('error');
                }
                else {
                    $newTaskDiv.classList.add('success');
                }
                $newTask.textContent = default_data.tasks[j].name;
                if (default_data.tasks[j].name.includes('Задание')){
                 
                    $TaskImg = document.createElement('i');
                    $TaskImg.classList.add('fas');
                    $TaskImg.classList.add('fa-tasks');
                    $newTaskDiv.appendChild($TaskImg);

                };
                if (default_data.tasks[j].name.includes('Тест')){
                 
                    $TaskImg = document.createElement('i');
                    $TaskImg.classList.add('far');
                    $TaskImg.classList.add('fa-edit');
                    $newTaskDiv.appendChild($TaskImg);

                };
                if (default_data.tasks[j].name.includes('Лекция')){
                   
                    $TaskImg = document.createElement('i');
                    $TaskImg.classList.add('fas');
                    $TaskImg.classList.add('fa-book-open');
                    $newTaskDiv.appendChild($TaskImg);
                };
                $newTaskDiv.appendChild($newTask);
                $newSubject.appendChild($newTaskDiv);
                $newSubject.appendChild(document.createElement('br'));
            }
        }

    }
});

chrome.runtime.onMessage.addListener(
    function (response, sender, sendResponse) {

        let data = response;
        localStorage.setItem('my_data', JSON.stringify(data));
        document.querySelector(".username-div").innerHTML = "Привет," + data.name + "!";
        if (document.getElementById('login_link') !== null) {
            var login_link = document.getElementById('login_link');
            login_link.parentNode.removeChild(login_link);
        };
        for (var i = 0; i <= data.subjects.length - 1; i++) {
        const $newSubject = document.createElement('div');
        
        $newSubject.classList.add('subject');
        
        const $newSubjectName = document.createElement('p');
        $newSubjectName.textContent = data.subjects[i].name;
        $newSubject.appendChild($newSubjectName);

        const $subjects = document.querySelector('#subjects');
        $subjects.appendChild($newSubject);
        for (var j = 0; j <= data.tasks.length - 1; j++) {
            if(data.tasks[j].subject === data.subjects[i].name) {
                const $newTaskDiv = document.createElement('div');
                const $newTask = document.createElement('a');
                $newTask.href = data.tasks[j].href;
                let task_status = data.tasks[j].status;
                if (task_status == "Ответы для оценки" || task_status == "Оценено") {
                    $newTaskDiv.classList.add('success');
                }
                if (task_status == "-") {
                    $newTaskDiv.classList.add('error');
                }
                else {
                    $newTaskDiv.classList.add('success');
                }
                $newTask.textContent = data.tasks[j].name;
                if (data.tasks[j].name.includes('Задание')){
                 
                    $TaskImg = document.createElement('i');
                    $TaskImg.classList.add('fas');
                    $TaskImg.classList.add('fa-tasks');
                    $newTaskDiv.appendChild($TaskImg);

                };
                if (data.tasks[j].name.includes('Тест')){
                 
                    $TaskImg = document.createElement('i');
                    $TaskImg.classList.add('far');
                    $TaskImg.classList.add('fa-edit');
                    $newTaskDiv.appendChild($TaskImg);

                };
                if (data.tasks[j].name.includes('Лекция')){
                   
                    $TaskImg = document.createElement('i');
                    $TaskImg.classList.add('fas');
                    $TaskImg.classList.add('fa-book-open');
                    $newTaskDiv.appendChild($TaskImg);
                };
                $newTaskDiv.appendChild($newTask);
                $newSubject.appendChild($newTaskDiv);
                $newSubject.appendChild(document.createElement('br'));
            }
        }
        }
    }
);
// function download(filename, text) {
//     var pom = document.createElement('a');
//     pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     pom.setAttribute('download', filename);
//
//     if (document.createEvent) {
//         var event = document.createEvent('MouseEvents');
//         event.initEvent('click', true, true);
//         pom.dispatchEvent(event);
//     }
//     else {
//         pom.click();
//     }
// }
//
