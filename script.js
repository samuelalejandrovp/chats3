const chat = document.getElementById('chat')
const divElecciones = document.getElementById('divElecciones')
const btnIrAElegir = document.getElementById('btnRegresarAElegir')
const btnRegresarAChat = document.getElementById('btnRegresarAChat')
const fondo = document.getElementById('fondo')
const main = document.querySelector('main')
const barraSuperior = document.getElementById('barraSuperiorChat')
const spanBarraSuperior = document.getElementById('spanBarraSuperior')
let primerMensaje
let claseMensajeAnterior
let horaMensajeAnterior


btnIrAElegir.addEventListener('click', ()=>{
  divElecciones.style.display='flex'
  main.style.filter='blur(5px)'
  fondo.style.filter='blur(5px)'
  barraSuperior.style.filter='opacity(0%)'
  barraSuperior.style.backdropFilter='blur(0)'
  btnIrAElegir.style.display=''
})

divElecciones.addEventListener('click', (e)=>{
  if(e.target.id=='divElecciones'){
    divElecciones.style.display='none'
    btnIrAElegir.style.display='unset'
    main.style.filter='blur(0)'
    fondo.style.filter='blur(0)'
    barraSuperior.style.filter='opacity(100%)'
    barraSuperior.style.backdropFilter=''
  }
})

btnRegresarAChat.addEventListener('click', ()=>{
  divElecciones.style.display='none'
  btnIrAElegir.style.display='unset'
  main.style.filter='blur(0)'
  fondo.style.filter='blur(0)'
 barraSuperior.style.filter='opacity(100%)'
 barraSuperior.style.backdropFilter=''
})

document.getElementById('fotoDePerfil').addEventListener('click', abrirLasFotos)

function generarDivEscribiendoOtraPersona(){
  const div=document.createElement('div')
  div.id='divEscribiendoOtraPersona'
  for (let x=0; x<3; x++){
    const punto = document.createElement('span')
    punto.innerText='•'
    div.append(punto)
    setTimeout(()=>{
      punto.style.animation='escribiendoMensaje infinite 3s'
    }, x*300)
  }
  chat.append(div)

  if (spanBarraSuperior!=undefined){
    spanBarraSuperior.innerText='Escribiendo...'
    spanBarraSuperior.classList.remove('conectado')
   }
}

function removerDivEscribiendoOtraPersona(){
  const divEscribiendoOtraPersona = document.getElementById('divEscribiendoOtraPersona')
  if(divEscribiendoOtraPersona != undefined){
    divEscribiendoOtraPersona.remove()
  }
  
  if (spanBarraSuperior!=undefined){
   spanBarraSuperior.innerText='En línea'
   spanBarraSuperior.classList.add('conectado')
  }
}

function abrirLasFotos(e){
  const contenedorImgGrande=document.createElement('div')
  contenedorImgGrande.classList.add('contenedorImgGrande')
  const imgGrande=document.createElement('img')
  imgGrande.classList.add('imgGrande')
  imgGrande.src=e.target.src
  contenedorImgGrande.append(imgGrande)
  main.style.filter='blur(5px)'
  fondo.style.filter='blur(5px)'
  barraSuperior.style.filter='opacity(0%)'
  barraSuperior.style.backdropFilter='blur(0)'
  contenedorImgGrande.addEventListener('click', ()=>{
    main.style.filter='blur(0)'
    fondo.style.filter='blur(0)'
    barraSuperior.style.filter='opacity(100%)'
    barraSuperior.style.backdropFilter=''
    contenedorImgGrande.remove()
  })
  document.querySelector('body').append(contenedorImgGrande)

}

/*Formato en que debe estar el array con los mensajes:
[{
  clase : 'mensajePropio' o 'mensajeOtraPersona',
  texto : '',
  hora : '00:00 am'
}, 
{   
  img : 'img',
  clase : '',
  src : ''
},
{
  img : 'stickers',
  clase : '',
  src : []
},
]*/

function procesarMensajesDosPersonas(arrayMensajes, funcFinal){
  const cantidadDeMensajes = arrayMensajes.length
  let indiceActual = 0
  function procesarMensajesUnoPorUno(){
    if (indiceActual<cantidadDeMensajes){
      const objetoDatosMensaje = arrayMensajes[indiceActual]
      let clase = objetoDatosMensaje.clase
      const divMensajeCompleto = document.createElement('div')
      if (clase==undefined){
          primerMensaje=false
          clase=claseMensajeAnterior
          if(clase=='mensajeOtraPersona'){
              document.getElementById('divEscribiendoOtraPersona').style.marginTop='0'
          }
      }
      else{
          primerMensaje=true
          claseMensajeAnterior=clase
          if(clase=='mensajeOtraPersona'){
              generarDivEscribiendoOtraPersona()
              document.getElementById('divEscribiendoOtraPersona').style.marginTop='4px'
          }
          else{
              removerDivEscribiendoOtraPersona()
          }
          divMensajeCompleto.style.marginTop='4px'
      }

      if(objetoDatosMensaje.img==undefined){
          divMensajeCompleto.classList.add(clase)
          divMensajeCompleto.classList.add('mensaje')
          const texto = document.createElement('h5')
          const textoInvisible = document.createElement('span')
          textoInvisible.classList.add('textoInvisible')
          const textoVisible = document.createElement('span')

      const hora = document.createElement('h6')
      hora.classList.add('horaMensaje')
      if (objetoDatosMensaje.hora!=undefined){
          hora.innerText = objetoDatosMensaje.hora
          horaMensajeAnterior=objetoDatosMensaje.hora
      }
      else{
          hora.innerText = horaMensajeAnterior
      }

      divMensajeCompleto.append(texto)
      divMensajeCompleto.append(hora)
      indiceActual++

      let cantidadDeLetras = objetoDatosMensaje.texto.length

      if (clase == 'mensajeOtraPersona'){
          texto.innerText = objetoDatosMensaje.texto
          let tiempoDeEscritura
          if (cantidadDeLetras<26){
              tiempoDeEscritura=2500
          }
          else if(cantidadDeLetras<80){
              tiempoDeEscritura=4000
          }
          else{
              tiempoDeEscritura=6000
          }

          setTimeout(()=>{
              chat.insertBefore(divMensajeCompleto, btnIrAElegir)
              if (chat.offsetWidth*0.7-100>divMensajeCompleto.offsetWidth){
                divMensajeCompleto.style.display='flex'
              }
              procesarMensajesUnoPorUno()
          }, tiempoDeEscritura) 
      }

      else{
        textoInvisible.innerText=objetoDatosMensaje.texto
        texto.append(textoVisible)
        texto.append(textoInvisible)
        
        let tiempoExtra
        if (primerMensaje){
          tiempoExtra = 1500
        }
        else{
          tiempoExtra = 0
        }
        setTimeout(()=>{
          chat.insertBefore(divMensajeCompleto, btnIrAElegir)
            
          if (chat.offsetWidth*0.7-100>divMensajeCompleto.offsetWidth){
            divMensajeCompleto.style.display='flex'
          }
          hora.classList.add('mensajeVisto')
          const intervaloDeEscritura = setInterval(()=>{
              if (textoInvisible.innerText.length>0){
                if (textoInvisible.innerText[0]!=' '){
                  textoVisible.innerText=`${textoVisible.innerText}${textoInvisible.innerText[0]}`
                  textoInvisible.innerText=textoInvisible.innerText.substring(1)
                }
                else {
                  textoVisible.innerText=`${textoVisible.innerText} ${textoInvisible.innerText[1]}` 
                  textoInvisible.innerText=textoInvisible.innerText.substring(2)
                }
              }
              else{
                clearInterval(intervaloDeEscritura)
                setTimeout(()=>procesarMensajesUnoPorUno(), 1000)
              }
          },85)
        }, tiempoExtra)
      }
      }
      else if (objetoDatosMensaje.img=='stickers'){
          divMensajeCompleto.classList.add('contenedorStickers')

          if(clase=='mensajePropio'){
              divMensajeCompleto.style.alignSelf='flex-end'
              divMensajeCompleto.style.justifyContent='flex-end'
              divEscribiendoOtraPersona.style.right='100vw'
          }
          else{
              divMensajeCompleto.style.alignSelf='flex-start'
              divMensajeCompleto.style.justifyContent='flex-start'
          }
          chat.insertBefore(divMensajeCompleto, btnIrAElegir)
          const src = objetoDatosMensaje.src
          let nroSticker=0
              setTimeout(()=>{
                  const intervaloStickers = setInterval(() => {
                      if(nroSticker<src.length-1){
                          const sticker = document.createElement('img')
                          sticker.src=src[nroSticker]
                          sticker.classList.add('sticker')
                          divMensajeCompleto.append(sticker)
                          nroSticker++
                          sticker.addEventListener('click', abrirLasFotos)
                      }
                      else{
                          const sticker = document.createElement('img')
                          sticker.src=src[nroSticker]
                          sticker.classList.add('sticker')
                          divMensajeCompleto.append(sticker)
                          sticker.addEventListener('click', abrirLasFotos)
                          indiceActual++
                          clearInterval(intervaloStickers)
                          procesarMensajesUnoPorUno()
                      }
                  }, 2000);
              }, 1000)
          
        }

        else if(objetoDatosMensaje.img=='img'){
            divMensajeCompleto.classList.add(clase)
            
            if (clase=='mensajePropio'){
              divMensajeCompleto.style.borderColor='hwb(267 14% 20% / 0.7)'
            }
            else{
              divMensajeCompleto.style.borderColor='rgba(0, 0, 0, 0.7)'
            }

            let x = 0
            const src=objetoDatosMensaje.src
            divMensajeCompleto.classList.add('divImgChat')
            const imgACrear = document.createElement('img')
            divMensajeCompleto.append(imgACrear)
            imgACrear.src=src
            divMensajeCompleto.addEventListener('click', abrirLasFotos)

            setTimeout(()=>{
                chat.insertBefore(divMensajeCompleto, btnIrAElegir)
                indiceActual++
                procesarMensajesUnoPorUno()
            }, 3000)
        }
    }    
    else{
      removerDivEscribiendoOtraPersona()
      funcFinal()
    }
  }
  procesarMensajesUnoPorUno()
}
function realizarElección(arrayDeElecciones){
    /*Formato en que debe estar el array de las posibles elecciones
    [{
        elegir:" texto que sale a escoger 1",
        respuesta:()=>{
            instrucciones que se ejecutan, pudiendo llamar una función que procesa los mensajes, o una img
        }
    },
    {
        elegir:'segunda elección posible',
        respuesta: ()=>{
            instrucciones para la segunda elección
        }
    }
]*/ 
    for (const unaDeLasElecciones of arrayDeElecciones){
        const btnIndividual = document.createElement('button')
        btnIndividual.type='button'
        btnIndividual.innerText = unaDeLasElecciones.elegir
        btnIndividual.classList.add('btnElecciones')
        btnIndividual.classList.add('btnChat')
        btnIndividual.addEventListener('click',()=>{
            unaDeLasElecciones.respuesta()
            divElecciones.style.display='none'
            const btnsDeElecciones = divElecciones.getElementsByClassName('btnElecciones')
            while (btnsDeElecciones.length>0){
                btnsDeElecciones[0].remove()
            }
            main.style.filter='blur(0)'
            fondo.style.filter='blur(0)'
            barraSuperior.style.filter='opacity(100%)'
            barraSuperior.style.backdropFilter=''
        })
        divElecciones.append(btnIndividual)
        }
    btnIrAElegir.style.display='unset'
}


const mensajes1 = [
    {
        clase : 'mensajeOtraPersona',
        texto : 'heyyy',
        hora : '10:44 pm'
    }, 
    {
        img : 'img',
        src : 'st1.png'
    },
    {
        texto : 'qué tal estás?',
    }, 
    {
        clase : 'mensajePropio',
        texto : 'holaaa :)',
        hora : '10:45 pm'
    }, 
    {
        texto : 'bien, y tú?',
    }, 
    {
        clase : 'mensajeOtraPersona',
        texto : 'genuall, te tengo que hacer una pregunta muy importante...',
    }, 
    {
        texto : '*genial',
    }, 
    {
        texto : 'finalmente vas a Puerto Escondido?',
        hora : '10:46 pm'
    }, 
]

const mensajes2p1 = [
  {
      clase : 'mensajePropio',
      texto : 'a Puerto Escondido?',
  }, 
  {
      clase : 'mensajeOtraPersona',
      texto : 'sí',
  }, 
  {
      clase : 'mensajePropio',
      texto : 'qué día?',
  }, 
  {
      clase : 'mensajeOtraPersona',
      texto : 'vamos los días 15, 16 y 17 del mes que viene',
      hora : '10:47 pm'
  }, 
  {
      texto : 'no hay excusas',
  }, 
  {
      img : 'stickers',
      src : ['st3.webp', 'st1.png']
  },
]
const mensajes2p2=[
  {
      clase : 'mensajePropio',
      texto : 'no tengo ganas',
  }, 
  {
      img : 'stickers',
      clase : 'mensajeOtraPersona',
      src : ['st1.png']
  },
  {
      texto : 'te voy a mandar par de fotos para que te animes',
      hora : '10:47 pm'
  }, 
  {
      texto : 'y te acuerdes de la vez pasada',
  }, 
  {   
      img : 'img',
      src : '1.webp'
  },
  {   
      img : 'img',
      src : '2.webp'
  },
  {
      texto : 'si cambias de idea me vuelves a escribir..... amargado',
  }, 
]
const elección1 = [{
  elegir:"puerto escondido? qué día?",
  respuesta:()=>{
      procesarMensajesDosPersonas(mensajes2p1, ()=>{
          console.log('fin')
      })
  }
},
{
  elegir:'no tengo ganas',
  respuesta: ()=>{
      procesarMensajesDosPersonas(mensajes2p2, ()=>{
          console.log('fin')
      })
  }
}
]

procesarMensajesDosPersonas(mensajes1, ()=>{realizarElección(elección1)})