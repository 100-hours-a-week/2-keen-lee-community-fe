const checkLoginStatus = () => {
    fetch('http://localhost:3000/status', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                console.log("환영합니다!");
            } else {
                alert("로그인해주세요");
                location.href = `/`;
            }
        })
        .catch(error => console.error('Error:', error));
}

// 로그아웃 요청
document.getElementById('item3').addEventListener('click', () => {
    checkLoginStatus();
    fetch('http://localhost:3000/logout', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => console.error('Error:', error));
});

// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', checkLoginStatus);

const URL_path = "http://localhost:3000";
fetch(`${URL_path}/dialog`, {
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
        console.log(json);
        document.getElementById('button').addEventListener('click', () => {
            checkLoginStatus();
            location.href = `adddialog`;
        });
        document.getElementById('button').addEventListener('mouseover', () => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.sheet.insertRule('.button { background-color: #ffffff }', 0);
            style.sheet.insertRule('.button { color: #000000 }', 0);
            style.sheet.insertRule('.button { width: 592px }', 0);
            style.sheet.insertRule('.button { height: 169px }', 0);
            style.sheet.insertRule('.button { border-radius: 16px 16px 16px 16px }', 0);
            style.sheet.insertRule('.button { transition: all 0.3s ease-in-out }', 0);
        });
        
        document.querySelector('button').addEventListener('mouseout', () => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.sheet.insertRule('.button { background-color: #000000}', 0);
            style.sheet.insertRule('.button { color: #ffffff }', 0);
            style.sheet.insertRule('.button { width: 39px }', 0);
            style.sheet.insertRule('.button { height: 39px }', 0);
            style.sheet.insertRule('.button { border-radius: 100% }', 0);
            style.sheet.insertRule('.button { transition: all 0.3s ease-in-out }', 0);
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
            location.href = `/`;
            checkLoginStatus();
        });

        
        
        const titlelen = document.getElementsByClassName('minititle');
        const goodnum = document.getElementsByClassName('good');
        const commentnum = document.getElementsByClassName('comment');
        const viewsnum = document.getElementsByClassName('views');
        const nickname = document.getElementsByClassName('nickname');
        const date = document.getElementsByClassName('date');
        const image = document.getElementsByClassName('img2');
        const writingpage = document.getElementsByClassName('ex1');


        const commentContainer = document.querySelector('.bigflex'); //HTML 큰 틀
        
        json.forEach(comment => {
            // 1. 새로운 댓글 컨테이너(div.flexcomment2) 생성
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('ex1');
        
            // 2. 댓글 내용 (flex1)
            const commentContentDiv = document.createElement('div');
            commentContentDiv.classList.add('flex1');
            
            // 3. 제목 (minititle)
            const commentInfoDiv = document.createElement('h2');
            commentInfoDiv.classList.add('minititle');
        
            // 4. 숫자 컨테이너 div.flex3
            const numberDiv = document.createElement('div');
            numberDiv.classList.add('flex3');

            // 5.숫자 내부 컨테이너 div.flex
            const numberDiv2 = document.createElement('div');
            numberDiv2.classList.add('flex');
            

            const good = document.createElement('p');
            good.classList.add('good');

            const cmt = document.createElement('p');
            cmt.classList.add('comment');

            const views = document.createElement('p');
            views.classList.add('views');

            const dateDiv = document.createElement('div');
            dateDiv.classList.add('date');

            const hr = document.createElement('hr');
            hr.classList.add('line');


            const flex2 = document.createElement('div');
            flex2.classList.add('flex2');
            

            const commentImage = document.createElement('img');
            commentImage.classList.add('img2');
            commentImage.src = "";//comment.imageSrc; // 이미지 경로 설정
            commentImage.alt = '';
        
            const nicknameDiv = document.createElement('p');
            nicknameDiv.classList.add('nickname');
        
            
        
        
            //flex에 good, cmt, views 포함시키기
            numberDiv2.appendChild(good);
            numberDiv2.appendChild(cmt);
            numberDiv2.appendChild(views);
            
            //flex에 felx3, date 포함
            numberDiv.appendChild(numberDiv2);
            numberDiv.appendChild(dateDiv);


            //flex1에 포함
            commentContentDiv.appendChild(commentInfoDiv);
            commentContentDiv.appendChild(numberDiv);

            //flex2에 포함
            flex2.appendChild(commentImage);
            flex2.appendChild(nicknameDiv);

            //ex1에 포함
            commentDiv.appendChild(commentContentDiv);
            commentDiv.appendChild(hr);
            commentDiv.appendChild(flex2);

        
            // 생성한 댓글을 commentContainer에 추가
            commentContainer.appendChild(commentDiv);
        });
        

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
            document.getElementById("img1").src = `${URL_path}/image/${json}`;
        })
        .catch((error) => console.log(error))

        //제목 json에서 불러오기
        for (let i = 0; i < json.length; i++) {
            const titlelen1 = json[i].title;
            if (titlelen1) {
                titlelen.item(i).textContent = titlelen1.slice(0, 26);
            }


            //좋아요 수 json에서 불러오기
            const good = json[i].good;
            if (Number(good) >= 1000) {
                goodnum.item(i).textContent = `${"좋아요 " + parseInt(Number(good) / 1000)}K`;
            }else {
                goodnum.item(i).textContent = `좋아요 ${good}`;
            }

            //댓글 수 json에서 불러오기
            const comment = json[i].cmt; //json[i].comment;
            if (Number(comment) >= 1000) {
                commentnum.item(i).textContent = `${"댓글 " + parseInt(Number(comment) / 1000)}K`;
            }
            else{
                commentnum.item(i).textContent = `댓글 ${comment}`
            }



            //조회 수 json에서 불러오기
            const views = json[i].views;
            if (Number(views) >= 1000) {
                viewsnum.item(i).textContent = `${"조회수 " + parseInt(Number(views) / 1000)}K`;
            }
            else{
                viewsnum.item(i).textContent = `${"조회수 " + parseInt(Number(views))}`;
            }

            //닉네임 JSON에서 불러오기
            nickname.item(i).textContent = json[i].id;
            
            //날짜 JSON에서 불러오기
            date.item(i).textContent = json[i].date;
            fetch(`http://localhost:3000/users/getimg/${json[i].id}`, {
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
                    image.item(i).src = `http://localhost:3000/image/${json}`;
            })
            .catch((error) => console.log(error))
            writingpage.item(i).addEventListener('click', () => {
                checkLoginStatus();
                const dialogId = json[i].id;
                location.href = `writingpage?dialogId=${dialogId}&no=${i+1}`;
            });
        }
    })
	.catch((error) => console.log(error))