const checkLoginStatus = () => {
    fetch('http://localhost:3000/status', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                console.log("환영합니다!");
            } else {
                alert("로그인해주세요");
                location.href='/';
            }
        })
        .catch(error => console.error('Error:', error));
}



// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', checkLoginStatus);
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


fetch(`http://localhost:3000/users`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
    },
    credentials:'include'
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
const a = () => {
    if (contentInput.value!="" && textInput.value!="") {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('.enter { background-color: skyblue }', 0);
        document.getElementsByClassName('helper')[0].innerText = '';
    } else {
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('.enter { background-color: #000000}', 0);
        document.getElementsByClassName('helper')[0].innerText =
            '*제목,내용을 모두 작성해주세요';
    }
}


const colorcg = (item) => {
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

document.getElementById('img1').addEventListener('mouseover', () => {
    checkLoginStatus();
        document.getElementById('felx2').style.display = 'flex';
});

document.getElementsByClassName('felx1')[0].addEventListener('mouseleave', () => {
    checkLoginStatus();
    document.getElementById('felx2').style.display = 'none';
});
colorcg('item1');
colorcg('item2');
colorcg('item3');

document.getElementById('item1').addEventListener('click', () => { //리스트
    checkLoginStatus();
    location.href = `infochange`;
});

document.getElementById('item2').addEventListener('click', () => {
    checkLoginStatus();
    location.href = `passwordcange`;
});

document.getElementById('item3').addEventListener('click', () => {
    checkLoginStatus();
    fetch('http://localhost:3000/logout', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            location.href='/';
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('back').addEventListener('click', () => {
    checkLoginStatus();
    location.href = `dialog`;
});

textInput.addEventListener('input', () => {
    checkLoginStatus();
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
    checkLoginStatus();
    formData.delete("image");
})

document.getElementById('enter').addEventListener('click', async () => {
    checkLoginStatus();
    a(); 
    if (textInput.value !== "" && contentInput.value !== "") {
        try {
            const imageResponse = await fetch('http://localhost:3000/image', {
                method: 'POST',
                body: formData,
            });
            if (!imageResponse.ok) {
                throw new Error('이미지가 없습니다.');
            }
            const imageData = await imageResponse.json();
            const userData = {
                title: textInput.value,
                content: contentInput.value,
                contentimgname: imageData.filename,
            };

            await fetch(`http://localhost:3000/dialog/saveDialog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                credentials:'include',
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
            location.href = `dialog`;
        } catch (error) {
            console.error('에러 발생:', error);
            alert('작업 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    } else {
        document.getElementsByClassName('helper')[0].innerText ='*제목,내용을 모두 작성해주세요';
    }
});
