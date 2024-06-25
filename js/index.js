/*
jQuery(document).ready(function(){
    console.log('le document est chargé');
});
*/
/* pour utliser l'alias $() de JQuery en évitant les conflit */

jQuery(function($){
    /* on peut ainsi utliser l'alias $() pour les élément de la page */
    console.log($('p'));
    console.log($('p.special.evnt01'));

    /*
    document.getElementById('firstBlood').addEventListener('click', function(){

    });
    */

    $('#firstBlood').on('click', function(evenement){
        console.log('On a cliqué sur le bouton #firstBlood');
        console.log(evenement.target);
    });

    
    /* cibler le paragraphe avec l'id special */
    $('#special').on('click', function(){
        console.log('le p#special est cliqué');
    });
    
    /* cibler tous les paragraphes sauf ceux possèdant la classe 'special' */
    
    /* compter les clics sur les différents type de paragraphe */ 
    let cptClicP = 0;
    let cptClicPSpecial = 0;

    $('p:not(.special)').on('click', function(){
        cptClicP = cptClicP + 1;
        console.log(`cptClicP : ${cptClicP}`);
    });

    $('p.special').on('click', function(){
        cptClicPSpecial = cptClicPSpecial + 1;
        console.log(`cptClicPSpecial : ${cptClicPSpecial}`);
    });

    $('.divLettreCercle').first().on('click', function(){
        console.log(`Click sur la div ${this.innerText}`);
    });
    
    $('.divLettreCercle').last().on('click', function(){
        console.log(`Click sur la div ${this.innerText}`);
    });
    
    $('.divLettreCercle').eq(2).on('click', function(){
        console.log(`Click sur la div ${this.innerText}`);
    });
    
    $('.divLettreCercle').eq(-2).on('click', function(){
        console.log(`Click sur la div ${this.innerText}`);
    });

});