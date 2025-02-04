const checkLoginStatus = ()=> {
    fetch('http://localhost:3000/status', { credentials: 'include' })
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
            } else {
                location.href='/';
                alert("로그인해주세요");
            }
        })
        .catch(error => console.error('Error:', error));
}



// 페이지 로드 시 로그인 상태 확인
document.addEventListener('DOMContentLoaded', checkLoginStatus);

const urlParams = new URLSearchParams(window.location.search);
const dialogId = urlParams.get('dialogId');
const no = urlParams.get('no');
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
fetch(`http://localhost:3000/dialog/writingpage/${dialogId}/${no}`, {
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
        console.log(json);
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
fetch(`http://localhost:3000/dialog/writingpage/comment/${dialogId}/${no}`, {
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
	.then((data) => {
        if(data.data!=''){
            data.data.forEach(comment => {
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
                commentImage.src = ``;//comment.imageSrc; // 이미지 경로 설정
                commentImage.alt = '';
                fetch(`http://localhost:3000/users/getimg/${comment.id}`, {
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
                    commentImage.src  = `http://localhost:3000/image/${json}`;
                })
                .catch((error) => console.log(error))
                
            
                const nicknameDiv = document.createElement('div');
                nicknameDiv.classList.add('nickname');
                nicknameDiv.textContent = comment.id;
            
                const dateDiv = document.createElement('div');
                dateDiv.classList.add('date2');
                dateDiv.textContent = comment.date;
            
                // 4. 댓글 텍스트
                const textDiv = document.createElement('div');
                textDiv.classList.add('textmin');
                textDiv.textContent = comment.content;
            
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
            
            
                buttonDiv.appendChild(editButton);
                buttonDiv.appendChild(deleteButton);
            
                // 최종적으로 commentDiv에 content와 button을 추가
                commentDiv.appendChild(commentContentDiv);
                commentDiv.appendChild(buttonDiv);
            
                // 생성한 댓글을 commentContainer에 추가
                commentContainer.appendChild(commentDiv);
            });
        }
    })
    .catch((error) => console.log(error))

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


        ch(title.item(0) ,json.data.title.slice(0, 26));
        ch(userid.item(0), json.data.id); //게시글 작성자 아이디
        ch(date.item(0), json.data.date); //게시글 작성일자
        
        //게시글 작성자 프로필 사진
        fetch(`http://localhost:3000/users/getimg/${json.data.id}`, {
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
            image.item(0).src = `http://localhost:3000/image/${json}`;
        })
        .catch((error) => console.log(error))
        if(!json.data.contentimgname){
            img3.item(0).remove();
        }
        else{
            
            img3.item(0).src = `http://localhost:3000/image/${json.data.contentimgname}`; //게시글 이미지
        }
        content.item(0).innerHTML = json.data.content.replace(/\n/g, "<br>");
       



        // 로그인한 유저가 작성자라면 fix, del 버튼 활성화
        if(json.username===document.getElementsByClassName('userid')[0].textContent){
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
        
        document.getElementById('img1').addEventListener('mouseover', () => {
            checkLoginStatus();
                document.getElementById('felx2').style.display = 'flex';
                document.getElementById('felx2').style.zIndex = 9999;
        });

        document.getElementsByClassName('felx1')[0].addEventListener('mouseleave', () => {
            checkLoginStatus();
            document.getElementById('felx2').style.display = 'none';
            document.getElementById('felx2').style.zIndex = -1;
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
        //뒤로가기
        location.href = `dialog`;
    });
    document.getElementById('fix').addEventListener('click', () => {
        checkLoginStatus();
        //개시글 수정버튼
        location.href = `writingchange?no=${no}`; 
    });

    document.getElementById('del').addEventListener('click', () => {
        checkLoginStatus();
        //개시글 삭제버튼
        document.getElementById('delcontent').style.display = 'inline-block'; 
        
    });
    fetch(`http://localhost:3000/dialog/writingpage/comment/${dialogId}/${no}`, {
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
        .then((data) => {
            console.log(data);
        for(let i = 0; i<data.data.length;i++){
            if(nickname.item(i).textContent===json.username){
                document.getElementsByClassName('fix').item(i+1).style.display = 'inline-block';
                document.getElementsByClassName('del').item(i+1).style.display = 'inline-block';
            }
            if(nickname.item(i).textContent!==json.username){
                document.getElementsByClassName('fix').item(i+1).style.display = 'none';
                document.getElementsByClassName('del').item(i+1).style.display = 'none';
            }

            
        document.getElementsByClassName('del')[i+1].addEventListener('click', () => {
            checkLoginStatus();
            //댓글 삭제버튼
            document.getElementById('delcomment').style.display = 'inline-block';
            ///////////
            document.getElementById('modalbutton4').addEventListener('click', () => {
                checkLoginStatus();
                fetch(`http://localhost:3000/dialog/deletecomment/${dialogId}/${no}/${i}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.text();
                })
                .then(data => {
                    const commentToDelete = document.getElementsByClassName('flexcomment2')[i];
                    if (commentToDelete) {
                        commentToDelete.remove();
                    }
                    document.getElementById('delcomment').style.display = 'none';
                    // location.reload();
                    // 삭제가 성공적으로 처리되면 페이지 리디렉션
                    //location.href = `writingpage.html?id=${dialogId}&inckname=${urlnick}`;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
        document.getElementsByClassName('fix')[i+1].addEventListener('click', () => {
            checkLoginStatus();
            fetch(`http://localhost:3000/dialog/getupdateComment/${no}/${i}`, {
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
                input.value = json.cmt;
                document.getElementById('cmtbutton').textContent = '댓글 수정';
                document.getElementById('cmtbutton').addEventListener('click', () => {
                    checkLoginStatus();
                    const style = document.createElement('style');
                    document.head.appendChild(style);
                    if (document.getElementById('cmtbutton').textContent == '댓글 수정') {
                        fetch(`http://localhost:3000/dialog/patchupdateComment/${no}/${i}`, {
                            method : 'PATCH',
                            headers : {
                                'Content-Type': 'application/json',
                                'ngrok-skip-browser-warning': 'true'
                            },
                            credentials:'include',
                            body: JSON.stringify({ 
                                "cmt": input.value
                              })
                    })// TODO :로그인 한 id로 받아야함
                    .then((response) => {
                        if(!response.ok){
                            throw new Error("네트워크 응답이 올바르지 않습니다.")
                        }
                        return response.json();
                    })
                    .then((json) => {
                    })
                    .catch((error) => console.log(error))
                    document.getElementsByClassName('flexcomment3')[i].getElementsByClassName('textmin')[0].textContent = input.value;
                        document.getElementById('cmtbutton').textContent = '댓글 등록';
                        input.value = '';
                    }
                    style.sheet.insertRule('#cmtbutton { background-color: #000000}', 0);
                    
        
                });
            })
            .catch((error) => console.log(error))
        });
        }//for문 여기까지//////////////////
     })
     .catch((error) => console.log(error)) 
        document.getElementsByClassName('cntgood').item(0).addEventListener('click', () => {
            checkLoginStatus();
            fetch(`http://localhost:3000/dialog/goodcnt/${dialogId}/${no}`, {credentials:'include'})
            .then(response => {
                if (!response.ok) {
                    throw new Error('서버 요청 실패');
                }
                return response.json();
            })
            .then(json => {
                console.log(json)
            const index=json.goodcheck.findIndex(nickname => nickname.nickname === json.username);
            console.log(index)
            if(index !== -1){
                fetch(`http://localhost:3000/dialog/ungood/${dialogId}/${no}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
                    }, 
                    credentials:'include'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.json();
                })
                .then(json => {
                    document.getElementById('good').textContent =Number(document.getElementById('good').textContent) - 1; 
                    // location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
            else if(index === -1){
                fetch(`http://localhost:3000/dialog/good/${dialogId}/${no}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true' // ngrok 경고 우회
                    },
                     credentials:'include'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.json();
                })
                .then(json => {
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
            checkLoginStatus();
            if(input.value != '' && document.getElementById('cmtbutton').textContent != '댓글 수정'){
                let today = new Date();   
                const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate() + " " + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
                fetch(`http://localhost:3000/dialog/addcomment/${dialogId}/${no}`, {
                    method : 'POST',
                    headers : {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    },
                    credentials:'include',
                    body: JSON.stringify({
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
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            } //TODO: 댓글 추가 나중에 DB에 넣어야됌
        });

        document.getElementById('modalbutton1').addEventListener('click', () => {
            checkLoginStatus();
            //개시글삭제모달창 취소버튼
            document.getElementById('delcontent').style.display = 'none';
        });
        document.getElementById('modalbutton3').addEventListener('click', () => {
            checkLoginStatus();
            //댓글모달창 취소버튼
            document.getElementById('delcomment').style.display = 'none';
        });

        
        document.getElementById('modalbutton2').addEventListener('click', () => { ////////////////TODO : 수정중...
            checkLoginStatus();
            //개시글모달창 확인버튼
            fetch(`http://localhost:3000/dialog/deletedialog/${dialogId}/${no}`, {//개시글 삭제 delete fetch 구현
                method : 'DELETE',
                headers :{
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                },
                credentials:'include',
                body: JSON.stringify({ 'message' : '삭제버튼 클릭'})
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 요청 실패');
                    }
                    return response.text();
                })
                .then(data => {
                    location.href = `dialog`;
                })
                .catch(error => {
                    console.error('Error:', error);
                })
           
             
            document.getElementById('delcontent').style.display = 'none';
        });

        a(good, json.data.good);
        a(show, json.data.views); //개시글 좋아요,댓글,조회수
        a(cmtnum, json.data.cmt);

        document.getElementById('inputbox').addEventListener('input', () => {
            //댓글 버튼 색상변경
            const style = document.createElement('style');
            document.head.appendChild(style);
            if (document.getElementById('inputbox').value) {
                style.sheet.insertRule('#cmtbutton { background-color: skyblue }', 0);
            }
            style.sheet.insertRule('#cmtbutton { background-color: #000000}', 0);
        });
    
    })
    .catch((error) => console.log(error))