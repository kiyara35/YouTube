const RESULTS = 20
const KEY = '&key=AIzaSyAkIzApNPKrtGOHlTUnf6x3inRCA05EgBg'
const API = 'https://www.googleapis.com/youtube/v3/search?&part=snippet&type=video&maxResults=' + RESULTS + KEY + '&q='
let output = document.getElementById('output')
let input = document.getElementById('input')
let btn = document.getElementById('button')
let voice = document.getElementById('voice')

const getVideo = async () => {
    let value = input.value
    let req = await fetch(value === null ? API : API + value)
    let res = await req.json()
    console.log(res.items)
    renderVideo(res.items)

}
getVideo()

const renderVideo = (arr) => {
    output.innerHTML = ''
    arr.map((el, index, array) => {

        let video = document.createElement('div')
        video.className = 'video__box'

        let name = document.createElement('span')
        name.innerHTML = el.snippet.title
        name.className = 'name'

        let channel = document.createElement('p')
        channel.innerHTML = el.snippet.channelTitle
        channel.className = 'channel'

        let description = document.createElement('p')
        description.innerHTML = el.snippet.description

        let text = document.createElement('div')
        text.className = 'text'
        text.append(name, channel, description)

        let iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${el.id.videoId}`
        video.append(iframe, text)
        output.append(video)
    })

}

btn.addEventListener('click', (e) => {
    e.preventDefault()
    getVideo()
})

// распознователь
let recognizer = new webkitSpeechRecognition()
let name = ""
//втсавка опции для того чтоб распознование началось до того момента пока не закончил пользователь
recognizer.interimResult = true
//опция настройки языка
recognizer.lang = 'ru-Ru'
//функция для обработки результата
recognizer.onresult = (event) => {
    let result = event.results[event.resultIndex]
    if (result.isFinal) {
        name = result[0].transcript
        input.value = name
        getVideo(name)
    } else {
        console.log("Промежуточный результат: ", result[0].transcript)
    }
}

speech = () => {
    recognizer.start()
}

talk = () => {
    let synth = window.speechSynthesis
    let utterance = new SpeechSynthesisUtterance(name)
    synth.speak(utterance)
}
voice.addEventListener('click', speech)









