const prevButton=document.getElementById("prev")
const nextButton=document.getElementById("next")
const repeatButton=document.getElementById("repeat")
const shuffleButton=document.getElementById("shuffle")
const pauseButton=document.getElementById("pause")
const playButton=document.getElementById("play")
const audio=document.getElementById("audio")
const songImage=document.getElementById("song-image")
const songName=document.getElementById("song-name")
const songArtist=document.getElementById("song-artist")
const playListButton = document.getElementById("playlist");
const maxDuration=document.getElementById("max-duration")
const currentTimeRef=document.getElementById("current-time")
const progressBar=document.getElementById("progress-bar")
const playListContainer=document.getElementById("playlist-container")
const closeButton=document.getElementById("close-button")
const playListSongs=document.getElementById("playlist-songs")
const currentProgress = document.getElementById('current-progress')

//!SIRA
let index

//!DÖNGÜ
let loop =true

//!JSON ŞARKI LİSTE YAPISI
const songsList=[
    {
        name:"Şeyhim Beni Yetmişlere Işınla",
        link:"assests/mp3/Kaan Boşnak - Şeyhim Beni Işınla (Yeni Kayıt).mp3",
        artist:"Kaan Boşnak",
        image:"assests/img/kaan boşnak.jpg"
    },

      {
        name:"Fikrim Yok",
        link:"assests/mp3/Hüsnü Arkan  Erkan Oğur - Fikrim Yok - Video Klip - 2019.mp3",
        artist:"Hüsnü Arkan & Erkan Oğur",
        image:"assests/img/husnu_arkan_erkan_ogur_final_fikrim_yok.jpg"
    },

    {
        name:"Yıldızlara Doğru",
        link:"assests/mp3/05. Aytekin Ataş - Yıldızlara Doğru.mp3",
        artist:"Aytekin Ataş",
        image:"assests/img/aytekin ataş.jpg"
    },

    {
        name:"Ay Işığında",
        link:"assests/mp3/İmamyar Hasanov  Nermine Memmedova-Ay ışığında.mp3",
        artist:"İmamyar Hasanov",
        image:"assests/img/imamyar hasanov.jpg"
    },

    {
        name:"Arzuhal",
        link:"assests/mp3/Arzuhal.mp3",
        artist:"Ömer Karaoğlu",
        image:"assests/img/arzuhal.jpg"
    },

    {
        name:"Biz Çocukken",
        link:"assests/mp3/TARKAN - Biz Çocukken.mp3",
        artist:"Tarkan",
        image:"assests/img/Tarkan.webp"
    }
]

//TİME FORMATER
const timeFormatter=(timeInput)=>{
    let minute=Math.floor(timeInput/60)
    minute=minute<10?"0"+minute:minute
    let second=Math.floor(timeInput%60)
    second=second<10?"0"+second:second
    return`${minute}:${second}`

}

//ŞARKI ATAMA
const setSong=(arrayIndex)=>{
    let{name,link,artist,image}=songsList[arrayIndex]

//AUDİ ATAMA
audio.src=link
songName.innerHTML=name
songArtist.innerHTML=artist
songImage.src=image

//max vakit ver
audio.onloadeddata=()=>{
    maxDuration.innerText=timeFormatter(audio.duration)
}
//container görünüyorsa yok et
playListContainer.classList.add("hide")
playAudio()
}

const playAudio=()=>{
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
}

const pauseAudio=()=>{
    audio.pause()
    pauseButton.classList.add("hide")
    playButton.classList.remove("hide")
}

const nextSong=()=>{
    if(loop){
        if(index==(songsList.length-1)){
            index=0
        }else{
            index +=1
        }
        setSong(index)
        playAudio()
    } else {
            let randIndex=Math.floor(Math.random()*songsList.length)
            console.log(randIndex)
            setSong(randIndex)
            playAudio()
        }
  
}

const previosSong=()=>{
    if(index>0){
        pauseAudio()
        index-=1
    }else{
        index=songsList.length-1
    }
    setSong(index)
    playAudio()
}

audio.onended=()=>{
    nextSong()
}


progressBar.addEventListener("click", (event)=>{
    let coordStart=progressBar.getBoundingClientRect().left
    let coordEnd=event.clientX
    let progress=(coordEnd-coordStart)/progressBar.offsetWidth

    currentProgress.style.width=progress*100+"%"

    audio.currentTime=progress*audio.duration
    audio.play()
    pauseButton.classList.remove("hide")
    playButton.classList.add("hide")
})







//TEKRAR TIKLANDIĞINDA
repeatButton.addEventListener("click",()=>{
    if(repeatButton.classList.contains("active")){
        repeatButton.classList.remove("active")
        loop=false
        console.log("karıştırma kapalı")

    }else{
        repeatButton.classList.add("active")
        loop=true
        console.log("karıştırma açık")
    }
})

const initializePlayList = () =>{
    for (const i in songsList) {
      playListSongs.innerHTML += `<li class="playlistSong"
      onclick="setSong(${i})">
      <div class="playlist-image-container">
       <img src="${songsList[i].image}"/>
       </div>
       <div class="playlist-song-details">
        <span id="playlist-song-name">
         ${songsList[i].name}
         </span>
         <span id="playlist-song-artist-album">
         ${songsList[i].artist}
         </span>
        </div>
       </li>`
    }
}
playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})

closeButton.addEventListener('click',()=>{
    playListContainer.classList.add('hide')
})


//PLAY BUTONU
playButton.addEventListener("click", playAudio)
//DURDUR BUTONU
pauseButton.addEventListener("click", pauseAudio)
//NEX BUTONU
nextButton.addEventListener("click", nextSong)
//ÖNCEKİNE GİT
prevButton.addEventListener("click", previosSong)
//KARIŞTIR TIKLANILDIĞINDA
shuffleButton.addEventListener("click",()=>{
    if(shuffleButton.classList.contains("active")){
        shuffleButton.classList.remove("active")
        loop=true
        console.log("karıştırma kapalı")

    }else{
        shuffleButton.classList.add("active")
        loop=false
        console.log("karıştırma açık")
    }
})

setInterval(() => {
    currentTimeRef.innerHTML=timeFormatter(audio.currentTime)
    currentProgress.style.width=(audio.currentTime/audio.duration.toFixed(3))*100+"%"
}, 1000);

//ZAMAN GÜNCELLEME YAKALA
audio.addEventListener("timeupdate",()=>{
    currentTimeRef.innerText=timeFormatter(audio.currentTime)
})

//EKRAN YÜKLENİLDİĞİNDE
window.onload=()=>{
    index=0
    setSong(index)
    pauseAudio();
    initializePlayList();
}