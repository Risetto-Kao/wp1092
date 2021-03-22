let inputComment = document.getElementById('comment-input');
let cancel = document.getElementById('cancel-button');
let leave = document.getElementById('comment-button');
let buttonGroup = document.getElementById('comment-button-group');
let commentGroup = document.getElementById('comment-group');
let addComment = document.getElementById('comment');
let commentNumber = 1;
let commentCount = document.getElementById('comment-num');
cancel.onclick = function () {
  inputComment.value = '';
  buttonGroup.style.visibility = 'hidden';
}
inputComment.oninput = function(){
    leave.style.backgroundColor = '#065fd4';
    if (inputComment.value.trim() == ''){
    leave.style.backgroundColor = '#cccccc';}
}   

inputComment.onfocus = function(){
    buttonGroup.style.visibility = 'visible';
} 
inputComment.onblur = function(){
    if (inputComment.value == ''){
    leave.style.backgroundColor = '#cccccc';}
}
leave.onclick = function(){
    let inputText = inputComment.value;
    inputText.trim();
    const imageResource = 'images/user-icon.jpg';
    const name = 'Toby Chen';
    let time = new Date();
    if (inputComment.value == ''){
        leave.disable = false;

    } else {
    commentNumber += 1;
    commentCount.innerHTML = commentNumber+'則留言';
    commentGroup.insertAdjacentHTML("beforeend",`
    <div class="comment">
        <img class="comment-img" src="${imageResource}"/>
            <div class="comment-right">
                <div>
                    <span class="comment-name">${name}</span>
                    <span class="comment-time">${time}</span>
                </div>
            <p class="comment-text">${inputText}</p>
        </div>
    </div>
    `);
    inputComment.value = '';
    leave.style.backgroundColor = '#cccccc';}


}

