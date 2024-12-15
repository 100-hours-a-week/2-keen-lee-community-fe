const nick11 = /.{26,}/;
const textInput = document.getElementById('texttitle');
const contentInput = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id')
let contentimg = "";
let contentimgname = "";
const loadFile = (input) => {
    const file = input.files[0];  // 선택된 파일
    const reader = new FileReader();
    
    if (!file) {
        contentimg = "";
        contentimgname ="";
        return;
    }

    reader.onload = (e) => {
        contentimg = e.target.result;
        contentimgname =file.name;
    };

    reader.readAsDataURL(file);
};


fetch(`http://localhost:3000/users/${dialogId}`)
	.then((response) => {
        if(!response.ok){
            throw new Error("네트워크 응답이 올바르지 않습니다.")
        }
        return response.json();
    })
	.then((json) => {
        document.getElementsByClassName("img1").item(0).src= json;
    })
    .catch((error) => console.log(error))
function a() {
    if (contentInput.value && textInput.value) {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('.enter { background-color: #7F6AEE }', 0);
        document.getElementsByClassName('helper')[0].innerText = '';
    } else {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('.enter { background-color: #ACA0EB}', 0);
        document.getElementsByClassName('helper')[0].innerText =
            '*제목,내용을 모두 작성해주세요';
    }
}

document.getElementById('back').addEventListener('click', () => {
    location.href = `dialog?id=${dialogId}`;
});

textInput.addEventListener('input', () => {
    a();
    if (nick11.test(textInput.value)) {
        textInput.value = textInput.value.substring(0, 26);
        alert('최대26글자까지 입력가능합니다.');
    }
});

contentInput.addEventListener('input', () => {
    a();
});

document.getElementById('enter').addEventListener('click', async(event) => {
    event.preventDefault();
    a();
    
    const userData = {
        title: textInput.value,
        content: contentInput.value,
        // good: 0,
        // comment: 0,
        // views: 0,
        // createdate: "2024-12-03 11:27:55",
        contentimg:contentimg,
        contentimgname : contentimgname,
        // id: dialogId,
    };
    await fetch(`http://localhost:3000/dialog/saveDialog/${dialogId}`, { //닉네임 로그인한 회원으로 바꾸기
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.text())
        .then(data => {
            const jsondata = JSON.parse(data);
            console.log(jsondata);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    location.href = `dialog?id=${dialogId}`;
});
