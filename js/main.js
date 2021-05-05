
// CHANGER LES COULEURS NOIRS ET BLANC
// ANIMER LES 2 CELLULES LORS DU DEDOUBLEMENT


let cpt = 0;
let clickCpt = 0;
// Contenus textes
let texteBoule = ['Cellule', 'Cellule', 'Cellule', 'Cellule'];

// On force le translate3d pour les perfs
gsap.config({
    force3D: true,
});

let boule1 = $('#boule1');
let boules = $('.boules');

let boulesNot = $('.boules:not(#boule1)');

// Fonction pour convertir en unité relative
const vw = (coef) => window.innerWidth * (coef / 100);
const vh = (coef) => window.innerHeight * (coef / 100);

let xClick;
let yClick;

// Fonction de couleur aléatoire

// #59b291 vert jade
// #28278e blue indigo
// #5c6eb4 blue pale
// #151d60 bleue saphire
// #e670ae rose
// #e86350 rouge orange
// #ea7462 rouge orange pale
// #fcf3a8 jaune
// #faea60 pacman
// let colors = ['#59b291', '#28278e', '#5c6eb4', '#151d60', '#e670ae', '#e86350', '#ea7462', '#fcf3a8', '#faea60'];
// let colors = ['#000', '#fff'];


// function rdColor() {
//     let randomColor = Math.floor(Math.random() * colors.length);
//     return colors[randomColor];
// }

function rdClass() {

    return Math.random() < 0.5 ? 'noir' : 'blanc';
}

function plusOrMinus() {
    return Math.random() < 0.5 ? -1 : 1;
}

function rdScale() {
    return Math.random() * 1.5 + 1;
}

function rdPosition(cell) {
    gsap.to(cell, .75, {
        // backgroundColor: rdColor(),
        transform: 'translate3d(' + (xClick / 1.5) + 'px,' + (yClick / 1.5) + 'px,0)',
        ease: 'power4.inOut'
    });
}



function clickCounter(e) {
    // console.log('e :>> ', e);
    clickCpt++;
    // console.log('clickCpt :>> ', clickCpt);
}


// On crée et charge le son
var audio = new Audio('../click3.mp3');

$("#container").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('#container').css('pointer-events', 'none');
    // console.log(' moveBoule(s)');

    audio.play();

    // let randomColor = rdColor();

    let rdx = Math.round(vh(5)) * plusOrMinus();
    let rdy = Math.round(vh(5)) * plusOrMinus();

    xClick = (e.clientX - (vh(7))) + rdx;
    yClick = (e.clientY - (vh(7))) + rdy;

    // console.log('xClick, yClick, rdx, rdy', yClick, yClick, rdx, rdy);

    $('#boule1 h1').html(texteBoule[cpt])

    // if (clickCpt < 5) {
        gsap.to(boule1, .75, {
            transform: 'translate3d(' + xClick + 'px,' + yClick + 'px,0)',
            ease: 'power4.inOut'
        });

        if (boulesNot.length != 0) {
            // console.log('boulesNot :>> ', boulesNot);
            boulesNot.each(function (i) {
                rdPosition(boulesNot[i]);
            });
        }
    // } else {
    //     gsap.to(boules, .75, {
    //         transform: 'translate3d(' + xClick + 'px,' + yClick + 'px,0)',
    //         ease: 'power4.inOut'
    //     });
    // }

    gsap.delayedCall(.75, function () {
        $('#container').css('pointer-events', 'all');

    });

    cpt++;

    if (cpt == (texteBoule.length)) {
        cpt = 0
    }
});

$('#boule1').on('click', e => clickCounter(e));

$('#boule1').click(e => addBoule(e));

function addBoule(e) {
    e.preventDefault();
    e.stopPropagation();

    // if (clickCpt == 5) {
    //     gsap.to(boules, .75, {
    //         scale: rdScale(),
    //         backgroundColor: rdColor(),
    //         transform: 'translate3d(' + xClick + 'px,' + yClick + 'px,0)',
    //         ease: 'power4.inOut'
    //     });
    //     return;
    // }

    let dedoubleBoule = document.createElement('div');
    let dedoubleText = document.createElement('h1');

    dedoubleText.innerText = 'Cellule enfant';
    dedoubleBoule.appendChild(dedoubleText);
    dedoubleBoule.classList.add('boules');
    dedoubleBoule.classList.add(rdClass());


    let wBoule1 = boule1.width();

    let xClick = e.clientX - wBoule1 / 2;
    let yClick = e.clientY - wBoule1 / 2;


    dedoubleBoule.style.transform = 'translate(' + xClick + 'px, ' + yClick + 'px)';

    $('#container').append(dedoubleBoule);

    dedoubleBoule.addEventListener('click', e => addBoule(e));
    dedoubleBoule.addEventListener('click',e => clickCounter(e));

    let randomX = (Math.floor(Math.random() * 200) + wBoule1) * plusOrMinus();
    let randomY = (Math.floor(Math.random() * 200) + wBoule1) * plusOrMinus();

    gsap.to(dedoubleBoule, 1, { x: '+=' + randomX + 'px', y: '+=' + randomY + 'px', ease: 'power4.inOut' });

    boulesNot = $('.boules:not(#boule1)');
    boules = $('.boules');

}

