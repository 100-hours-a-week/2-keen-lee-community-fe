const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('id');
const urlnick = urlParams.get('nickname');
const no = urlParams.get('no');
fetch(`http://localhost:3000/users/${urlnick}`, {
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
fetch(`http://localhost:3000/dialog/writingpage/${dialogId}/${no}`, {
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

        const good = document.getElementById('good');
        const show = document.getElementById('show');
        const cmtnum = document.getElementById('cmtnum');
        const input = document.getElementById('inputbox');
        const userid = document.getElementsByClassName('userid');
        const date = document.getElementsByClassName('date');
        const image = document.getElementsByClassName('img2');
        const img3 = document.getElementsByClassName('img3');
        const img4 = document.getElementsByClassName('img4');
        const content = document.getElementsByClassName('content');
        const nickname = document.getElementsByClassName('nickname');
        const textmin = document.getElementsByClassName('textmin');
        const date2 = document.getElementsByClassName('date2');
        const title = document.getElementsByClassName('bodytitle');
        

        // 댓글 리스트를 담을 컨테이너
const commentContainer = document.querySelector('.flex');

// 댓글 데이터 배열을 순회하면서 동적으로 HTML 요소를 생성
json.cmt.forEach(comment => {
    // 1. 새로운 댓글 컨테이너(div.flexcomment2) 생성
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('flexcomment2');

    // 2. 댓글 내용 (flexcomment3)
    const commentContentDiv = document.createElement('div');
    commentContentDiv.classList.add('flexcomment3');
    
    // 3. 작성자 정보 (flexcomment4)
    const commentInfoDiv = document.createElement('div');
    commentInfoDiv.classList.add('flexcomment4');

    const commentImage = document.createElement('img');
    commentImage.classList.add('img4');
    commentImage.src = "";//comment.imageSrc; // 이미지 경로 설정
    commentImage.alt = '';

    const nicknameDiv = document.createElement('div');
    nicknameDiv.classList.add('nickname');
    nicknameDiv.textContent = comment.nickname;

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('date2');
    dateDiv.textContent = comment.date;

    // 4. 댓글 텍스트
    const textDiv = document.createElement('div');
    textDiv.classList.add('textmin');
    textDiv.textContent = comment.cmt;

    // 작성자 정보 및 댓글 텍스트를 commentContentDiv에 추가
    commentInfoDiv.appendChild(commentImage);
    commentInfoDiv.appendChild(nicknameDiv);
    commentInfoDiv.appendChild(dateDiv);
    commentContentDiv.appendChild(commentInfoDiv);
    commentContentDiv.appendChild(textDiv);

    // 5. 수정 및 삭제 버튼 (flexcomment5)
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('flexcomment5');

    const editButton = document.createElement('button');
    editButton.classList.add('fix');
    editButton.textContent = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('del');
    deleteButton.textContent = '삭제';

    // 삭제 버튼 클릭 시 동작 정의
    // deleteButton.addEventListener('click', () => {
    //     if (confirm('정말 삭제하시겠습니까?')) {
    //         commentDiv.remove(); // 해당 댓글 삭제
    //         alert('댓글이 삭제되었습니다.');
    //     }
    // });

    // 수정 및 삭제 버튼을 buttonDiv에 추가
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    // 최종적으로 commentDiv에 content와 button을 추가
    commentDiv.appendChild(commentContentDiv);
    commentDiv.appendChild(buttonDiv);

    // 생성한 댓글을 commentContainer에 추가
    commentContainer.appendChild(commentDiv);
});

        function a(q, js) {
            if (Number(js) >= 1000) {
                const a = parseInt(Number(js) / 1000);
                q.textContent = `${a}K`;
            }
            else{
                q.textContent = js;
            }
        }
        
        function ch(q, js){
            q.textContent = js;
        }


        ch(title.item(0) ,json.title.slice(0, 26));
        ch(userid.item(0), json.id); //게시글 작성자 아이디
        ch(date.item(0), json.createdate); //게시글 작성일자
        img3.item(0).src = json.contentimg; //게시글 이미지
        //게시글 작성자 프로필 사진
        fetch(`http://localhost:3000/users/getimg/${json.id}`, {
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
            image.item(0).src = json.img;
        })
        .catch((error) => console.log(error))
        if(json.contentimg===""){
            img3.item(0).remove();
        }
        content.item(0).innerHTML = json.content.replace(/\n/g, "<br>");
       



        // 로그인한 유저가 작성자라면 fix, del 버튼 활성화
        if(urlnick===document.getElementsByClassName('userid')[0].textContent){
            document.getElementById('fix').style.display = 'inline-block';
            document.getElementById('del').style.display = 'inline-block';
        }
        else{
            document.getElementById('fix').style.display = 'none';
            document.getElementById('del').style.display = 'none';
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
        location.href = `dialog?id=${urlnick}`;
    });
    document.getElementById('fix').addEventListener('click', () => {
        //개시글 수정버튼
        location.href = `writingchange?id=${dialogId}&nick=${urlnick}&no=${no}`; 
    });

    document.getElementById('del').addEventListener('click', () => {
        //개시글 삭제버튼
        document.getElementById('delcontent').style.display = 'inline-block'; 
    });
       
        for(let i = 0; i<json.cmt.length;i++){
            nickname.item(i).textContent=json.cmt[i].id;
            textmin.item(i).textContent=json.cmt[i].cmt;
            fetch(`http://localhost:3000/users/getimg/${json.cmt[i].id}`, {
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
            .then((imgae) => {
                img4.item(i).src=imgae.img;
            })
            .catch((error) => console.log(error))
            
            date2.item(i).textContent=json.cmt[i].date;
            if(nickname.item(i).textContent===urlnick){
                document.getElementsByClassName('fix').item(i+1).style.display = 'inline-block';
                document.getElementsByClassName('del').item(i+1).style.display = 'inline-block';
            }
            if(nickname.item(i).textContent!==urlnick){
                document.getElementsByClassName('fix').item(i+1).style.display = 'none';
                document.getElementsByClassName('del').item(i+1).style.display = 'none';
            }

            
        document.getElementsByClassName('del')[i+1].addEventListener('click', () => {
            //댓글 삭제버튼
            const scrollY = window.scrollY;
            const top = scrollY;
            document.getElementById('delcomment').style.top = `${top}px`;
            document.getElementById('delcomment').style.display = 'inline-block';
            ///////////
            document.getElementById('modalbutton4').addEventListener('click', () => {
                fetch(`http://localhost:3000/dialog/deletecomment/${dialogId}/${no}/${i+1}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    // JSON.stringify()를 사용하여 데이터를 직렬화하고,
                    // 반환된 JSON 문자열을 body로 전송
                    body: JSON.stringify({ reson : '삭제버튼 클릭' })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('삭제 성공:', data);
                    const commentToDelete = document.getElementsByClassName('flexcomment2')[i];
                    if (commentToDelete) {
                        commentToDelete.remove();
                    }
                    location.reload();
                    // 삭제가 성공적으로 처리되면 페이지 리디렉션
                    //location.href = `writingpage.html?id=${dialogId}&inckname=${urlnick}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
        document.getElementsByClassName('fix')[i+1].addEventListener('click', () => {
            
            fetch(`http://localhost:3000/dialog/getupdateComment/${dialogId}/${urlnick}/${i}`, {
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
                console.log(json)
                input.value = json.cmt;
                document.getElementById('cmtbutton').textContent = '댓글 수정';
                document.getElementById('cmtbutton').addEventListener('click', () => {
                    const style = document.createElement('style');
                    document.head.appendChild(style);
                    if (document.getElementById('cmtbutton').textContent == '댓글 수정') {
                        fetch(`http://localhost:3000/dialog/patchupdateComment/${dialogId}/${urlnick}/${i}`, {
                            method : 'PATCH',
                            headers : {
                                'Content-Type': 'application/json',
                                'ngrok-skip-browser-warning': 'true'
                            },
                            body: JSON.stringify({ 
                                "cmt": input.value
                              })
                    })// TODO :로그인 한 id로 받아야함
                    .then((response) => {
                        console.log(i);
                        if(!response.ok){
                            throw new Error("네트워크 응답이 올바르지 않습니다.")
                        }
                        return response.json();
                    })
                    .then((json) => {
                        console.log(json)
                    })
                    .catch((error) => console.log(error))

                        document.getElementById('cmtbutton').textContent = '댓글 등록';
                        input.value = '';
                        location.reload();
                    }
                    style.sheet.insertRule('#cmtbutton { background-color: #ACA0EB}', 0);
                    
        
                });
            })
            .catch((error) => console.log(error))
        });
        } //for문 여기까지//////////////////
        document.getElementsByClassName('cntgood').item(0).addEventListener('click', () => {
            fetch(`http://localhost:3000/dialog/good/${dialogId}/${no}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('서버 요청 실패');
                }
                return response.json();
            })
            .then(json => {
           

            const index=json.findIndex(nickname => nickname.nickname === urlnick);
            
            if(index !== -1){
                fetch(`http://localhost:3000/dialog/ungood/${dialogId}/${urlnick}/${no}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.json();
                })
                .then(json => {
                    console.log('좋아요 클릭성공:', json);
                    document.getElementById('good').textContent =Number(document.getElementById('good').textContent) - 1; 
                    // location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
            else if(index === -1){
                fetch(`http://localhost:3000/dialog/good/${dialogId}/${urlnick}/${no}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.json();
                })
                .then(json => {
                    console.log('좋아요 클릭성공:', json);
                    document.getElementById('good').textContent =Number(document.getElementById('good').textContent) + Number(json.good);
                    // location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })




        document.getElementById('cmtbutton').addEventListener('click', () => {
            if(input.value != '' && document.getElementById('cmtbutton').textContent != '댓글 수정'){
                let today = new Date();   
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + " " + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                fetch(`http://localhost:3000/dialog/addcomment/${dialogId}/${urlnick}/${no}`, {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    body: JSON.stringify({ 
                        "no" : json.cmt.length+1,
                        "id": urlnick,
                        "cmt": input.value,
                        "date": date
                      } )
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('댓글 추가 성공:', data);
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } //TODO: 댓글 추가 나중에 DB에 넣어야됌
        });

        document.getElementById('modalbutton1').addEventListener('click', () => {
            //개시글삭제모달창 취소버튼
            document.getElementById('delcontent').style.display = 'none';
        });
        document.getElementById('modalbutton3').addEventListener('click', () => {
            //댓글모달창 취소버튼
            document.getElementById('delcomment').style.display = 'none';
        });

        
        document.getElementById('modalbutton2').addEventListener('click', () => { ////////////////TODO : 수정중...
            //개시글모달창 확인버튼
            fetch(`http://localhost:3000/dialog/deletedialog/${dialogId}/${urlnick}/${no}`, {//개시글 삭제 delete fetch 구현
                method : 'DELETE',
                headers :{
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({ 'message' : '삭제버튼 클릭'})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('삭제 성공:', data);
                    location.href = `dialog?id=${urlnick}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                })
           
             
            document.getElementById('delcontent').style.display = 'none';
        });

        a(good, json.good.length);
        a(show, json.views); //개시글 좋아요,댓글,조회수
        a(cmtnum, json.cmt.length);

        document.getElementById('inputbox').addEventListener('input', () => {
            //댓글 버튼 색상변경
            const style = document.createElement('style');
            document.head.appendChild(style);
            if (document.getElementById('inputbox').value) {
                style.sheet.insertRule('#cmtbutton { background-color: #7F6AEE }', 0);
            }
            style.sheet.insertRule('#cmtbutton { background-color: #ACA0EB}', 0);
        });
    
    })
    .catch((error) => console.log(error))