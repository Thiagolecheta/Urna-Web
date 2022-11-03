let seuVoto = document.querySelector('.d1-voto span');
let cargo = document.querySelector('.d1-cargo span');
let descricao = document.querySelector('.d1-nome-descricao');
let alerta = document.querySelector('.d-2');
let lateraImagem = document.querySelector('.d1-rigth');
let numeros = document.querySelector('.d1-digitacao');



let etapaAtual = 0;
let numero = ''
let votoBranco = false

let votos = []

function comercarEtapa() {

    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for(let i=0; i < etapa.numeros; i++ ){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVoto.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    alerta.style.display = 'none';
    lateraImagem.innerHTML = '';
    numeros.innerHTML = numeroHtml;
    
    
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) =>{
        if (item.numero === numero){
            return true
        }else {
            return false
        }
    })
    if(candidato.length > 0 ){
        candidato = candidato[0]
        seuVoto.style.display = 'block';
        alerta.style.display = 'block';
        descricao.innerHTML = `Nome:${candidato.nome}</br>Partido: ${candidato.partido}`

        let fotosHtml = ''

        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d1-rigth-image small"><img src="imagens/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].legenda}</div>`

            } else {
                fotosHtml += `<div class="d1-rigth-image"><img src="imagens/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].legenda}</div>`

            }
        }

        lateraImagem.innerHTML = fotosHtml
    } else {
        seuVoto.style.display = 'block';
        alerta.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'

    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')

    if(elNumero != null){
        elNumero.innerHTML = n
        numero = `${numero}${n}`


        elNumero.classList.remove('pisca');
        if (elNumero.nextElementSibling != null){
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface();
        }
    }
}

function branco(){
    numero = ''
    votoBranco = true 
    seuVoto.style.display = 'block';
    alerta.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
    numeros.innerHTML = ''
    lateraImagem.innerHTML = ''
    
}

function corrige(){
    comercarEtapa();
}

function confirma(){

    let etapa = etapas[etapaAtual];
    let votoConfirmado = false

    if ( votoBranco === true){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        })
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined){
            comercarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        console.log(votos)
        }
    }
}

comercarEtapa()