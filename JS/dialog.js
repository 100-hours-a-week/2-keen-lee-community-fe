const urlParams = new URLSearchParams(window.location.search);
const nick = urlParams.get('id');

fetch("http://localhost:3000/dialog", {
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
        const nick11 = /.{26,}/;
        document.getElementById('button').addEventListener('click', () => {
            location.href = `adddialog?id=${nick}`; //로그인한 회원 닉네임
        });
        document.getElementById('button').addEventListener('mouseover', () => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.sheet.insertRule('.button { background-color: #7F6AEE }', 0);
        });
        
        document.querySelector('button').addEventListener('mouseout', () => {
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.sheet.insertRule('.button { background-color: #ACA0EB}', 0);
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
            location.href = `infochange?id=${nick}`;
        });
        
        document.getElementById('item2').addEventListener('click', () => {
            location.href = `passwordcange?id=${nick}`;
        });
        
        document.getElementById('item3').addEventListener('click', () => {
            location.href = `/`;
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
            dateDiv.textContent = comment.date;
            
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
            nicknameDiv.textContent = comment.nickname;
        
            
        
        
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
        fetch(`http://localhost:3000/users/${nick}`, {
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
        document.getElementById("img1").src= json;

    })
    .catch((error) => console.log(error))

        //제목 json에서 불러오기
        for (let i = 0; i < json.length; i++) {
            const titlelen1 = json[i].title;
            if (titlelen1) {
                titlelen.item(i).textContent = titlelen1.slice(0, 26);
            }


            //좋아요 수 json에서 불러오기
            const good = json[i].good.length;
            if (Number(good) >= 1000) {
                goodnum.item(i).textContent = `${"좋아요 " + parseInt(Number(good) / 1000)}K`;
            }else {
                goodnum.item(i).textContent = `좋아요 ${good}`;
            }

            //댓글 수 json에서 불러오기
            const comment = json[i].cmt.length; //json[i].comment;
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
            date.item(i).textContent = json[i].createdate;
            fetch(`http://localhost:3000/users/getimg/${json[i].id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
                }
            })
            .then((response) => {
                if(!response.ok){
                    console.log(i);
                    throw new Error("네트워크 응답이 올바르지 않습니다.")
                    
                }
                return response.json();
            })
            .then((json) => {
                    image.item(i).src = json.img;
            })
            .catch((error) => console.log(error))
            writingpage.item(i).addEventListener('click', () => {
                const dialogId = json[i].id;
                location.href = `writingpage?id=${dialogId}&nickname=${nick}&no=${i+1}`;
            });
        }
    })
	.catch((error) => console.log(error))