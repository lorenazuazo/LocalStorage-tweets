//variables

const formulario = document.querySelector('#formulario');
const listaTweets= document.querySelector('#lista-tweets');

let tweets = []

//eventListener
eventListener();
function eventListener(){
    //para agregar tweet
    formulario.addEventListener('submit',agregarTweet);
    //paraleer tweets del localStorage
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [] ;
        crearHtml();
    });
};


//funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(!tweet.length){
        mostrarError('El mensaje no puede ir vacio');
        return;
    };

    const tweetObj = {
        id: Date.now(),
        tweet,
    };

    tweets = [...tweets,tweetObj];
    formulario.reset();
    crearHtml();
};

function mostrarError(err){
    const msjError = document.createElement('p');
    msjError.textContent = err;
    msjError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(msjError);

    setTimeout(()=>{
        msjError.remove();
    },3000);
};

function crearHtml(){

    limpiarHtml();

    if(tweets.length){
        tweets.forEach(tweet =>{
            const btnEliminar = document.createElement('a');
            btnEliminar.classList = 'borrar-tweet';
            btnEliminar.textContent = 'X';
            btnEliminar.onclick = ()=>{
                borrarTweet(tweet.id);
            }
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
            
        });
    }

    sincronizarStorage();
};

function sincronizarStorage(){
    localStorage.setItem('tweets',JSON.stringify(tweets));
};

function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
};

function borrarTweet(id){
  tweets = tweets.filter(tweet => tweet.id !== id);
  crearHtml();
}