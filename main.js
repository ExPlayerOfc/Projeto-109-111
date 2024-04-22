previsao1=""
previsao2=""

Webcam.set({
    width:350, 
    height: 300,
    imageFormat: 'png',
    pngQuality: 90,
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("resultado").innerHTML='<img id= "Foto" src="'+data_uri+'"/>'
    });
}

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/0VgKTE5al/model.json', modelLoaded);
function modelLoaded() {
    console.log("model Loaded");
} 

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "A primeira previsão é " + previsao1;
    speakData2 = "E a segunda previsão é " + previsao2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
  }
  
  function check() {
    img=document.getElementById("foto");
    classifier.classify(img, gotResult);
  }

  function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("resultado_da_emocao").innerHTML= results[0].label;
        document.getElementById("resultado_da_emocao2").innerHTML= results[1].label;
        previsao1= results[0].label;
        previsao2= results[1].label;
        speak();
        if (results[0].label=="perfeito") {
            document.getElementById("atualizar_emoji").innerHTML= "&#128076";
        }
        if (results[0].label=="negativo"){
            document.getElementById("atualizar_emoji").innerHTML= "&#128078";
        }
        if (results[0].label=="positivio"){
            document.getElementById("atualizar_emoji").innerHTML= "&#128077";
        }
        if (results[1].label=="perfeito") {
            document.getElementById("atualizar_emoji2").innerHTML= "&#128076";
        }
        if (results[1].label=="negativo"){
            document.getElementById("atualizar_emoji2").innerHTML= "&#128078";
        }
        if (results[1].label=="positivo"){
            document.getElementById("atualizar_emoji2").innerHTML= "&#128077";
        }
    }
  }