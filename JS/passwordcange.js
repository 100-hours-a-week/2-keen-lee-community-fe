const passwordreg =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,20}$/;
let set = false;
let set2 = false;

const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id');

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
document.getElementById('helper').textContent = "";
document.getElementById('helper2').textContent = "";
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
        document.getElementsByClassName("img1").item(0).src= json;

    })
    .catch((error) => console.log(error))

document.getElementById('img1').addEventListener('click', () => {
    if (document.getElementById('flex2').style.display === 'none') {
        document.getElementById('flex2').style.display = 'flex';
    } else {
        document.getElementById('flex2').style.display = 'none';
    }
});
colorcg('item1');
colorcg('item2');
colorcg('item3');

document.getElementById('item1').addEventListener('click', () => {
    location.href = `infochange?id=${dialogId}`;
});

document.getElementById('item2').addEventListener('click', () => {
    location.href = `passwordcange?id=${dialogId}`;
});

document.getElementById('item3').addEventListener('click', () => {
    location.href = `/`;
});



document.getElementById('passwordinput').addEventListener('focusout', () => {
    if (passwordreg.test(document.getElementById('passwordinput').value)) {
        document.getElementById('helper').innerText = '';
        set = true;
        if (
            document.getElementById('passwordinput').value !=
            document.getElementById('passwordinput2').value
        ) {
            set2 = false;
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.sheet.insertRule(`#button1 { background-color: #aca0eb}`, 0);
        }
        if (
            document.getElementById('passwordinput').value ==
            document.getElementById('passwordinput2').value
        ) {
            set2 = true;
        }
    }
    if (!passwordreg.test(document.getElementById('passwordinput').value)) {
        document.getElementById('helper').innerText =
            '유효성을 만족하지 못하였습니다.';
        set = false;
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#button1 { background-color: #aca0eb}`, 0);
    }
    if (!document.getElementById('passwordinput').value) {
        document.getElementById('helper').innerText = '비밀번호를 입력해주세요';
        set = false;
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#button1 { background-color: #aca0eb}`, 0);
    }
});

document.getElementById('passwordinput2').addEventListener('focusout', () => {
    if (
        passwordreg.test(document.getElementById('passwordinput2').value) &&
        document.getElementById('passwordinput2').value ==
            document.getElementById('passwordinput').value
    ) {
        document.getElementById('helper2').innerText = '';
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#button1 { background-color: #7F6AEE}`, 0);
        set2 = true;
    }
    if (!document.getElementById('passwordinput2').value) {
        document.getElementById('helper2').innerText =
            '비밀번호를 한번 더 입력해주세요';
        set2 = false;
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#button1 { background-color: #aca0eb}`, 0);
    }
    if (
        document.getElementById('passwordinput2').value !=
        document.getElementById('passwordinput').value
    ) {
        document.getElementById('helper2').innerText = '비밀번호와 다릅니다.';
        set2 = false;
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(`#button1 { background-color: #aca0eb}`, 0);
    }
});

document.getElementById('button1').addEventListener('click', () => {
    if (set && set2) {
        fetch(`http://localhost:3000/users/updatePassword/${dialogId}`, {
            method : "POST",
            headers :{'Content-Type' : 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body : JSON.stringify({password : document.getElementById('passwordinput').value}),
        })
        .then(response => response.json())  // JSON 형식으로 응답 받기
        .then(jsondata => {
            if(jsondata.user_id === 1){
                document.getElementById('tost').classList.add('active');
                setTimeout(() => {
                    document.getElementById('tost').classList.remove('active');
                    location.reload();
                }, 1000);
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
       
    }
});
document.getElementsByClassName('title').item(0).addEventListener('click', () => {
    setTimeout(() => {
        window.location.replace(`dialog?id=${dialogId}`);
    }, 100);
});