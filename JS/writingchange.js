const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id');
const urlnick = urlParams.get('nick');
const no = urlParams.get('no');
const nick11 = /.{26,}/;

let contentimg = "";
let contentimgname = "";
const loadFile = (input) => {
    const file = input.files[0];  // 선택된 파일
    const reader = new FileReader();
    
    if(!file){
        contentimg = "";
        contentimgname ="";
        document.getElementById('fileName').textContent = contentimgname;
        return;
    }


    reader.onload = (e) => {
        contentimg = e.target.result;
        contentimgname =file.name;
        document.getElementById('fileName').textContent = contentimgname;
    };
    reader.readAsDataURL(file);
    
};

document.getElementById('input').addEventListener('click', () => {
    contentimg = "";
    contentimgname ="";
    document.getElementById('fileName').textContent = contentimgname;
})

fetch(`http://localhost:3000/users/${urlnick}`)
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
fetch(`http://localhost:3000/dialog/getwritingchange/${dialogId}/${urlnick}/${no}`, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
    }
})
    .then(response => response.text())
    .then(data => {
        const jsondata = JSON.parse(data);
        console.log(data);
        contentimg = jsondata.contentimg;
        contentimgname = jsondata.contentimgname;


        document.getElementById('title1').value = jsondata.title; //제목 JSON에서 가져와야함
        document.getElementById('content').value =jsondata.content;
        document.getElementById('fileName').textContent = jsondata.contentimgname;
        document.getElementById('title1').addEventListener('input', () => {
            if (nick11.test(document.getElementById('title1').value)) {
                document.getElementById('title1').value = document
                    .getElementById('title1')
                    .value.substring(0, 26);
                alert('최대26글자까지 입력가능합니다.');
            }
        });

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
            location.href = `infochange?id=${urlnick}`;
        });
        
        document.getElementById('item2').addEventListener('click', () => {
            location.href = `passwordcange?id=${urlnick}`;
        });
        
        document.getElementById('item3').addEventListener('click', () => {
            location.href = `/`;
        });

        document.getElementById('back').addEventListener('click', () => {
            //뒤로가기
            location.href = `writingpage?id=${dialogId}&nickname=${urlnick}&no=${no}`;
        });
        document.getElementById('enter').addEventListener('click', () => {
            //개시글 수정버튼
            fetch(`http://localhost:3000/dialog/patchwritingchange/${dialogId}/${urlnick}/${no}`, {
                method : "PATCH",
                headers : {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ 
                    title: document.getElementById('title1').value,
                    content: document.getElementById('content').value,
                    contentimg: contentimg,
                    contentimgname: contentimgname
                })
            })
            .then(response => {
                if(!response.ok){
                    throw new Error("네트워크 응답이 올바르지 않습니다.")
                }
                console.log(response.json());
                location.href = `writingpage?id=${dialogId}&nickname=${urlnick}&no=${no}`;
            })
            .then(data => {
                console.log(data)
            })
            .catch((error) => console.log(error))
            
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });