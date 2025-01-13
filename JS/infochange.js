const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id');
const imagePreview = document.getElementsByClassName('img2').item(0);
const plus = document.querySelector('.plus');
const cancel = document.querySelector('.cancel');
const formData = new FormData();

const loadFile = (input) => {
    const file = input.files[0];  // 선택된 파일
    const reader = new FileReader();
    formData.append('image', file);
    reader.onload = (e) => {
        imagePreview.src = `${e.target.result}`;  // 미리보기 이미지 설정
    };

    if (file) {
        reader.readAsDataURL(file);
    }
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
        document.getElementById("img1").src= `http://localhost:3000/image/${json}`;
    })
    .catch((error) => console.log(error))

fetch(`http://localhost:3000/users/infochange/${dialogId}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
    }
})
    .then((response) => {
        if (!response.ok) {
            throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
    })
    .then((json) => {
        document.getElementsByClassName('img2').item(0).src = `http://localhost:3000/image/${json.imgname}`;
        document.getElementsByClassName('emailtext').item(0).textContent = json.email;
        document.getElementById('inputbox').value = json.nickname;
        //document.getElementsByClassName('img2').item(0).textContent = json.email; //TODO 나중에 이미지 추가시에 추가
        // 정규식: 닉네임 검증
        const nickreg = /^(?=.*\s).{0,11}$/;  // 띄어쓰기 포함하는지 검사
        const nick11 = /^.{11,}$/;           // 11자 이상 검사

        
 


        function colorcg(item) {
            const element = document.getElementById(item);
            if (element) {
                element.addEventListener('mouseover', () => {
                    const style = document.createElement('style');
                    document.head.appendChild(style);
                    style.sheet.insertRule(`#${item} { background-color: #E9E9E9 }`, 0);
                });

                element.addEventListener('mouseout', () => {
                    const style = document.createElement('style');
                    document.head.appendChild(style);
                    style.sheet.insertRule(`#${item} { background-color: #d9d9d9}`, 0);
                });
            }
        }

        const img1 = document.getElementById('img1');
        if (img1) {
            img1.addEventListener('click', () => {
                const flex2 = document.getElementById('flex2');
                if (flex2) {
                    if (flex2.style.display !== 'none') {
                        flex2.style.display = 'none';
                    } else {
                        flex2.style.display = 'flex';
                    }
                }
            });
        }

        // 색상 변경
        colorcg('item1');
        colorcg('item2');
        colorcg('item3');


        document.getElementsByClassName('img2').item(0).addEventListener('click', () => { // 이미지 클릭시 기본 이미지로 변경 업로드 안하면 기본이미지로 변함
            document.getElementsByClassName('img2').item(0).src = 'http://localhost:3000/image/default_profile.png';
            formData.delete("image");
            json.imgname = "default_profile.png";
            json.imgpath = "POTO/default_profile.png";
        })

        // 닉네임 유효성 검사
        document.getElementById('button').addEventListener('click', () => {
            
            fetch('http://localhost:3000/image', {
                method: 'POST',
                body: formData,
                })
                .then(response => response.json())  // JSON 형식으로 응답 받기
                .then(jsondata => {
                    if(!jsondata.filePath){
                        jsondata.filePath = json.imgpath;
                        jsondata.filename = json.imgname;
                    }
            fetch(`http://localhost:3000/users/infochange/button/${dialogId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({imgpath: jsondata.filePath, imgname: jsondata.filename, nickname: document.getElementById('inputbox').value, email: document.getElementsByClassName('emailtext').item(0).textContent}),
            })
            .then(response => response.json())  // JSON 형식으로 응답 받기
            .then(async jsondata => {
                if (jsondata.user_id === 1) {
                    {
                        document.getElementsByClassName('helper')[0].innerText = '';
                        document.getElementById('button1').classList.add('active');
                        setTimeout(() => {
                            document.getElementById('button1').classList.remove('active');
                            location.href = `dialog?id=${document.getElementById('inputbox').value}`;
                        }, 1000);
                    }
                }
                else{
                document.getElementsByClassName('helper')[0].style.display = 'inline-block';
                document.getElementsByClassName('helper')[0].innerText=jsondata.message;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
            
            /*
             else {
                document.getElementsByClassName('helper')[0].innerText = '';
                document.getElementById('button1').classList.add('active');
                setTimeout(() => {
                    document.getElementById('button1').classList.remove('active');  //변경 성공시 띄우기
                }, 1000);
            }
                */
        });

        // 회원 탈퇴 모달
        document.getElementById('userout').addEventListener('click', () => {
            document.getElementById('delcomment').style.display = 'inline-block';
        });

        document.getElementById('modalbutton3').addEventListener('click', () => {
            document.getElementById('delcomment').style.display = 'none';
        });

        document.getElementById('modalbutton4').addEventListener('click', () => {
            fetch(`http://localhost:3000/users/deleteUser/infochange/${dialogId}`, {
                method : "DELETE",
            headers :{'Content-Type' : 'application/json',
                'ngrok-skip-browser-warning': 'true'
            },
            body : JSON.stringify({email : json.email}),
            })
            .then(response => response.json())  // JSON 형식으로 응답 받기
            .then(jsondata => {
                if(jsondata.user_id === 1){
                    setTimeout(() => {
                        window.location.replace('/');
                    }, 100);  // 100ms 후에 리다이렉션
                    alert('탈퇴되었습니다!');
                }
                
            })
            .catch(error => {
                console.error('Error:', error);
            });   
        });

        // 메뉴 클릭 시 페이지 이동
        document.getElementById('item1').addEventListener('click', () => {
            location.href = `infochange?id=${dialogId}`;
        });

        document.getElementById('item2').addEventListener('click', () => {
            location.href = `passwordcange?id=${dialogId}`;
        });

        document.getElementById('item3').addEventListener('click', () => {
            location.href = '/';
        });
        document.getElementById('inputbox').addEventListener('focusout', () =>{
            if (!document.getElementById('inputbox').value) {
                document.getElementsByClassName('helper')[0].style.display = 'inline-block';
                document.getElementsByClassName('helper')[0].innerText = '*닉네임을 입력해주세요';
            } else if (nickreg.test(document.getElementById('inputbox').value)) {
                document.getElementsByClassName('helper')[0].style.display = 'inline-block';
                document.getElementsByClassName('helper')[0].innerText = '*띄어쓰기를 없애주세요';
            } else if (nick11.test(document.getElementById('inputbox').value)) {
                document.getElementsByClassName('helper')[0].style.display = 'inline-block';
                document.getElementsByClassName('helper')[0].innerText = '닉네임은 최대10자 까지 작성 가능합니다.';
            }
            else{
                document.getElementsByClassName('helper')[0].style.display = 'none';
            }
        })
    })
    .catch((error) => {
        console.log(error);
    });

document.getElementsByClassName('title').item(0).addEventListener('click', () => {
    setTimeout(() => {
        window.location.replace(`dialog?id=${dialogId}`);
    }, 100);
});
