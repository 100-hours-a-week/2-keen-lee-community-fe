const nick11 = /.{26,}/;
const textInput = document.getElementById('texttitle');
const contentInput = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id')
let contentimg = "";
let contentimgname = "";
const formData = new FormData();
const loadFile = (input) => {
    const file = input.files[0];  // 선택된 파일
    const reader = new FileReader();
    formData.append('image', file);
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


fetch(`http://localhost:3000/users/${dialogId}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
    }
})
	.then((response) => {
        if(!response.ok){
            throw new Error("네트워크 응답이 올바르지 않습니다.")
        }
        return response.json();
    })
	.then((json) => {
        document.getElementsByClassName("img1").item(0).src= `http://localhost:3000/image/${json}`;
    })
    .catch((error) => console.log(error))
function a() {
    if (contentInput.value!="" && textInput.value!="") {
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


function colorcg(item) {
    document.getElementById(`${item}`).addEventListener('mouseover', () => {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#${item} { background-color: #E9E9E9 }`, 0);
    });

    document.getElementById(`${item}`).addEventListener('mouseout', () => {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#${item} { background-color: #d9d9d9}`, 0);
    });
}

document.getElementById('img1').addEventListener('click', () => {
    if (document.getElementById('felx2').style.display === 'none') {
        document.getElementById('felx2').style.display = 'flex';
    } else {
        document.getElementById('felx2').style.display = 'none';
    }
});
colorcg('item1');
colorcg('item2');
colorcg('item3');

document.getElementById('item1').addEventListener('click', () => { //리스트
    location.href = `infochange?id=${dialogId}`;
});

document.getElementById('item2').addEventListener('click', () => {
    location.href = `passwordcange?id=${dialogId}`;
});

document.getElementById('item3').addEventListener('click', () => {
    location.href = `/`;
});

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

document.getElementById('input').addEventListener('click', () => {
    formData.delete("image");
})

document.getElementById('enter').addEventListener('click', async () => {
    a(); // 입력값 유효성 검사
    if (textInput.value !== "" && contentInput.value !== "") {
        try {
            // 1. 이미지 업로드
            const imageResponse = await fetch('http://localhost:3000/image', {
                method: 'POST',
                body: formData,
            });

            if (!imageResponse.ok) {
                throw new Error('이미지 업로드 실패');
            }

            const imageData = await imageResponse.json();

            // 2. 정보 저장
            const userData = {
                title: textInput.value,
                content: contentInput.value,
                contentimgname: imageData.filename,
            };

            await fetch(`http://localhost:3000/dialog/saveDialog/${dialogId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(userData),
            })
            .then((res) => {
                if(!res.ok){
                    throw new Error("네트워크 응답이 올바르지 않습니다.")
                }
                return res.json();
            })
            .catch(error => {
                console.error('error발생:', error);
            })
            // 3. 리디렉션
            location.href = `dialog?id=${dialogId}`;
        } catch (error) {
            console.error('에러 발생:', error);
            alert('작업 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    } else {
        document.getElementsByClassName('helper')[0].innerText ='*제목,내용을 모두 작성해주세요';
    }
});
