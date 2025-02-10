const localhost = 'localhost';
const checkLoginStatus = () => {
    fetch(`http://${localhost}:3000/status`, { credentials: 'include' })
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
const urlParams = new URLSearchParams(window.location.search);
const no = urlParams.get('no');
const nick11 = /.{26,}/;

let contentimgname = "";
const formData = new FormData();
const loadFile = (input) => {
    const file = input.files[0];  // 선택된 파일
    const reader = new FileReader();
    formData.append('image', file);
    if(!file){
        contentimgname ="";
        document.getElementById('fileName').textContent = contentimgname;
        return;
    }


    reader.onload = (e) => {
        contentimgname =file.name;
        document.getElementById('fileName').textContent = contentimgname;
    };
    reader.readAsDataURL(file);
    
};

document.getElementById('input').addEventListener('click', () => {
    checkLoginStatus();
    contentimgname ="";
    document.getElementById('fileName').textContent = contentimgname;
    formData.delete("image");
})

fetch(`http://${localhost}:3000/users`, {credentials:'include'})
	.then((response) => {
        if(!response.ok){
            throw new Error("네트워크 응답이 올바르지 않습니다.")
        }
        return response.json();
    })
	.then((json) => {
        document.getElementsByClassName("img1").item(0).src= `http://${localhost}:3000/image/${json}`;
    })
    .catch((error) => console.log(error))
fetch(`http://${localhost}:3000/dialog/getwritingchange/${no}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
    },
    credentials:'include'
})
    .then(response => response.json())
    .then(data => {
        let contentimg = data.contentimgname;


        document.getElementById('title1').value = data.title; //제목 JSON에서 가져와야함
        document.getElementById('content').value =data.content;
        document.getElementById('fileName').textContent = '업로드 이미지: '+data.contentimgname;
        document.getElementById('title1').addEventListener('input', () => {
            if (nick11.test(document.getElementById('title1').value)) {
                document.getElementById('title1').value = document
                    .getElementById('title1')
                    .value.substring(0, 26);
                alert('최대26글자까지 입력가능합니다.');
            }
            
        });
         
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
            fetch(`http://${localhost}:3000/logout`, { credentials: 'include' })
                .then(response => response.json())
                .then(data => {
                    location.href='/';
                    alert(data.message);
                })
                .catch(error => console.error('Error:', error));
        });

        document.getElementById('back').addEventListener('click', () => {
            checkLoginStatus();
            //뒤로가기
            location.href = `writingpage?dialogId=${data.id}&no=${no}`;
        });
        document.getElementById('enter').addEventListener('click', () => {
            checkLoginStatus();
            if(document.getElementById('title1').value !== ""&& document.getElementById('content').value !== ""){
            fetch(`http://${localhost}:3000/image`, {
                method: 'POST',
                body: formData,
                })
                .then(response => response.json())  // JSON 형식으로 응답 받기
                .then(jsondata => {
                    if(jsondata.filename){
                        contentimg=jsondata.filename;
                    }
                    else if(!jsondata.filename){
                        contentimg="";
                    }
            //개시글 수정버튼
            fetch(`http://${localhost}:3000/dialog/patchwritingchange/${no}`, {
                method : "PATCH",
                headers : {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                credentials:'include',
                body: JSON.stringify({ 
                    title: document.getElementById('title1').value,
                    content: document.getElementById('content').value,
                    contentimgname: contentimg,
                })
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("네트워크 응답이 올바르지 않습니다.")
                }
                location.href = `writingpage?dialogId=${data.id}&no=${no}`;
            })
            .then(data => {
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
        }
        else{
            document.getElementsByClassName('helper').item(0).textContent = "제목과 내용을 모두 작성해주세요.";
        }
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('권한이 없습니다.');
        location.href='dialog';
    });