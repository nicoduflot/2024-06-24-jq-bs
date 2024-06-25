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

    /* tous les éléments d'un paragraphe ayant la classe lien */
    $('p .lien').css('color', 'red');

    /*  tous les éléments ayant la classe lien et enfants directs (1er degré) d'un paragraphe */
    $('p > .lien').css('color', 'green');

    /* afficher / effacer l'info liée au champ de saisie au focus / blur */
    /*
    $('#nom').on('focus', function(){
        console.log($(this).attr('aria-describedby'));
        $(`#${$(this).attr('aria-describedby')}`).removeClass('hidden');
    });
    
    $('#nom').on('blur', function(){
        console.log($(this).attr('aria-describedby'));
        $(`#${$(this).attr('aria-describedby')}`).addClass('hidden');
    });
    
    $('#prenom').on('focus', function(){
        console.log($(this).attr('aria-describedby'));
        $(`#${$(this).attr('aria-describedby')}`).removeClass('hidden');
    });
    
    $('#prenom').on('blur', function(){
        console.log($(this).attr('aria-describedby'));
        $(`#${$(this).attr('aria-describedby')}`).addClass('hidden');
    });
    */
    /* transformer cela en un code plus générique ? */

    $('#formContact [aria-describedby]').on('focus', function(){
        /*console.log($(this).attr('aria-describedby'));*/
        $(`#${$(this).attr('aria-describedby')}`).removeClass('hidden');
    });
    
    $('#formContact [aria-describedby]').on('blur', function(){
        /*console.log($(this).attr('aria-describedby'));*/
        $(`#${$(this).attr('aria-describedby')}`).addClass('hidden');
    });

    /* repérer quand une touche est relachée lorsque l'on écrit dans un input de type text et le textarea du formulaire */
    $( '#formContact input[type="text"], #formContact textarea' ).on('keyup', function(){
        if($(this).val().length > 2){
            $(`#${$(this).attr('aria-describedby')}`).addClass('hidden');
        }
    });

    /* empêcher l'envoi de formulaire si nom est vide */
    $('#formContact').on('submit', function(evenement){
        /* empêche de comportement par défaut du document, de l'élément, etc par rapport à l'événement qui l'impacte */
        evenement.preventDefault();

        /* pour rendre le tout plus lisible, on va récupérer le contenu des champs dans des constantes */
        const nom = $('#nom').val();
        const prenom = $('#prenom').val();
        console.log(`nom : ${nom} et prénom : ${prenom}`);
        if(nom !== '' && prenom !== ''){
            /* si le formulaire possède les informations nécessaire, on     arrête d'écouter son événement submit */
            $('#formContact').off('submit');
            /* générer un login par défaut si quand le formulaire est envoyé le login est vide */
            
            $('#formContact').trigger('submit');
        }
    });

    
});