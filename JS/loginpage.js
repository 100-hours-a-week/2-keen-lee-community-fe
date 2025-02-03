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

const passwordreg =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const emailreg =
    /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const getemail = () => {
    const email = document.getElementById('email').value;
    return emailreg.test(email);
}
const getpss = () => {
    const password = document.getElementById('password').value;
    return passwordreg.test(password);
}
document.getElementsByClassName('helper').item(0).textContent = "";
document.getElementById('email').addEventListener('focusout', () => {
    if (getemail() & getpss()) {
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);
        styleSheet.sheet.insertRule('button { background-color: #7F6AEE; }', 0);
    }
    else{
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);
        styleSheet.sheet.insertRule('button { background-color: #ACA0EB; }', 0);
    }
});

document.getElementById('password').addEventListener('focusout', () => {
    if (getemail() & getpss()) {
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);
        styleSheet.sheet.insertRule('button { background-color: #7F6AEE; }', 0);
    }
    else{
        const styleSheet = document.createElement('style');
        document.head.appendChild(styleSheet);
        styleSheet.sheet.insertRule('button { background-color: #ACA0EB; }', 0);
    }
});

document.getElementById('login').addEventListener('click', () => {
    // alert('요소가 클릭되었습니다!');
    if (!getemail()) {
        alert('*올바른 이메일 주소를 입력해주세요. (예: example@example.com)');
    }
    if (!getpss()) {
        alert(
            '비밀번호는 8자이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.',
        );
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userData = {
        email: email,
        password: password
    };
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true'
        },
        credentials: 'include',
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {
            checkLoginStatus();
            
            if(data.user_id===1){
                location.href = `./dialog`;
            }
            else{
                document.getElementsByClassName('helper').item(0).textContent = "*아이디 또는 비밀번호를 확인해주세요";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    //location.href = 'dialog.html';
});
document.getElementById('email').addEventListener('focusout', () =>{
    document.getElementsByClassName('helper').item(0).textContent = "";
})
document.getElementById('password').addEventListener('focusout', () =>{
    document.getElementsByClassName('helper').item(0).textContent = "";
})

document.getElementById('signup').addEventListener('click', () => {
    location.href = 'sinup';
});

/*
    fetch('https://jsonplaceholder.typicode.com/posts/1')
	// 데이터를 JSON 형태로 변환
  .then(response => response.json())
*/


