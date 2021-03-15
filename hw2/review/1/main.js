var dis = document.getElementById('display')
var load = document.createElement('img')
// ---------------------------------------
load.id = 'display'
load.src = 'images/loading.gif'
dis.parentNode.replaceChild(load, dis)
// ---------------------------------------
var memes=[
    'https://i.redd.it/rdbzqhx822n61.png',
    'https://i.redd.it/s8ntkew524n61.jpg',
    'https://i.redd.it/zqcv8rq551n61.png',
    'https://i.redd.it/qz82js97j1n61.png'
]
var disEles = []
var prev = document.getElementById('previous')
var next = document.getElementById('next')
var curr = 0
var src = document.getElementsByClassName('image-viewer__display-source-wrapper')
// ---------------------------------------
for (let i = 0; i < memes.length; i++) {
    const e = memes[i]
    imgg = document.createElement('img')
    imgg.id = 'display'
    imgg.src = e
    disEles.push(imgg)
}
dis = document.getElementById('display')
setTimeout(() => { dis.parentNode.replaceChild(disEles[0], dis) }, 1000);

// ---------------------------------------
prev.className = 'disabled'
prev.onclick = function(){
    if (curr <= 0 || curr > 3) {
        return
    }
    else {
        curr--
        dis = document.getElementById('display')
        dis.parentNode.replaceChild(disEles[curr], dis)
        src[0].innerHTML='<span><a>' + memes[curr] + '</a></span>'
        if (curr == 0) {
            this.className = 'disabled'
        }
        else{
            this.className = ''
            if (curr == 2){
                next.className = ''
            }
        }
    }
}
next.onclick = function(){
    if (curr < 0 || curr >= 3) {
        return
    }
    else {
        curr++
        dis = document.getElementById('display')
        dis.parentNode.replaceChild(disEles[curr], dis)
        src[0].innerHTML='<span><a>' + memes[curr] + '</a></span>'
        if (curr == 3) {
            this.className = 'disabled'
        }
        else{
            this.className = ''
            if (curr == 1){
                prev.className = ''
            }
        }
    }
}
// ---------------------------------------
