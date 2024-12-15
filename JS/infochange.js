const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id');
const imagePreview = document.getElementsByClassName('img2').item(0);
const plus = document.querySelector('.plus');
const cancel = document.querySelector('.cancel');

let imagebase64=0;

const loadFile = (input) => {
    const file = input.files[0];  // 선택된 파일
    const reader = new FileReader();
    
    reader.onload = (e) => {
        imagebase64 = e.target.result;
        imagePreview.src = `${e.target.result}`;  // 미리보기 이미지 설정
    };

    if (file) {
        reader.readAsDataURL(file);
    }
};

fetch(`http://localhost:3000/users/${dialogId}`)
	.then((response) => {
        if(!response.ok){
            throw new Error("네트워크 응답이 올바르지 않습니다.")
        }
        return response.json();
    })
	.then((json) => {
        document.getElementById("img1").src= json;

    })
    .catch((error) => console.log(error))

fetch(`http://localhost:3000/users/infochange/${dialogId}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        return response.json();
    })
    .then((json) => {
        document.getElementsByClassName('img2').item(0).src = json.img;
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
                const flex2 = document.getElementById('felx2');
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
            document.getElementsByClassName('img2').item(0).src = "data:image/png;base64,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";
        })

        // 닉네임 유효성 검사
        document.getElementById('button').addEventListener('click', () => {
            
            
            fetch(`http://localhost:3000/users/infochange/button/${dialogId}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({img: '',nickname: document.getElementById('inputbox').value, email: document.getElementsByClassName('emailtext').item(0).textContent , img: document.getElementsByClassName('img2').item(0).src}),
            })
            .then(response => response.json())  // JSON 형식으로 응답 받기
            .then(async jsondata => {
                if (jsondata.user_id === 1) {
                    console.log("닉네임변경 성공");
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
            },
            body : JSON.stringify({email : json.email}),
            })
            .then(response => response.json())  // JSON 형식으로 응답 받기
            .then(jsondata => {
                if(jsondata.user_id === 1){
                    setTimeout(() => {
                        window.location.replace('ex');
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
            location.href = 'ex';
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
