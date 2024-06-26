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

    /* il est possible de documenter les méthode en utilisant jsdoc */

    /**
     * Renvoi un entier compris entre [min, max]
     * @param {int} min - valeur minimum du random comprise
     * @param {int} max - valeur maximum du random comprise
     * @returns {int}
     */
    function randomize(min = 0, max = 0){
        if(isNaN(parseFloat(min)) || isNaN(parseFloat(max))){
            return 0;
        }else{
            if(parseFloat(max) <= parseFloat(min)){
                return 0;
            }else{
                return Math.floor(Math.random() * (parseFloat(max) - parseFloat(min) + 1)) + parseFloat(min);
            }
        }
    }

    function checkLogin(login){
        /* faire un appel ajax vers la tables des utilisateurs inscrit, vérifier si un login similaire existe, si oui, compter le nombre d'utilisateur et ajouter 1 */
        const valRandom = randomize(1, 5);
        if(valRandom === 5){
            login = `${login}-1`;
        }
        return login;
    }

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
            /* générer un login par défaut si, quand le formulaire est envoyé le login est vide */
            if($('#login').val() === ''){
                let login = `${nom.toLowerCase()}.${prenom.toLowerCase()}`;
                login = checkLogin(login);
                $('#login').val(login);
            }
            $('#formContact').trigger('submit');
        }
    });

    /* $(this) */

    $('p.demoThis').on('click', function(){
        $(this).css('color', 'red');
        $(this).css('fontWeight', 'bold');
    });

    $('.resetColors').on('click', function(){
        $('p.demoThis').each( function(){
            $(this).removeAttr('style');
        });
    });

    /* surveiller les touches appuyée */
    $(document).on('keyup', function(evenement){
        /*
        console.log(evenement);
        console.log(evenement.which);
        console.log(evenement.key);
        */
        $('p#quelleTouche').text(`La touche ${evenement.key}, code clavier ${evenement.which}`);
    });

    $('p#clickMeVirtual').on('click', function(){
        console.log('on a cliqué sur le p.clickMeVirtual');
    });

    /* déclencher le click automatique sur le p.clickMeVirtual */
    $('p#clickMeVirtual').trigger('click');

    /* preventdefault d'un événement sur un élément */
    $('a.backUp').on('click', function(evenement){
        evenement.preventDefault();
        /*$('html, body').animate({scrollTop: 0});*/
        $('html, body').scrollTop(0);
    });

    $('a.goBottom').on('click', function(e){
        e.preventDefault();
        console.log($(document).height());
        $('html, body').scrollTop( $(document).height() );
    });

    /* utiliser le gestionnaire d'événement : des actions similaires ou différentes selon des événements différents sur un même élément */
    
    $('.evnt01').on('focus dblclick', function(){
        console.log($('.evnt01').text());
    });

    $('.evnt02').on({
        focus :function(){
            console.log('focus sur evnt02');
        },
        dblclick : function(){
            console.log('double click sur evnt02');
        },
        blur : function(){
            console.log('curseur hors evnt02');
        }
    });

    /*const span = document.createElement('span');*/
    
    /*console.log(span);*/
    /*span.on('click', function(){
        console.log('clic sur le span');
    });
    */

    /*$('p#addSpan').append(span);*/

    const tr = $('<tr><td class="c01">C01</td><td class="c02">C02</td></tr>');

    $('#tableGenerate tbody').append(tr);

    /* sans délégation, il est impossible de surveiller le clic sur la td.c01 car elle n'a pas été ajoutée correctement dans le DOM */
    /*
    $('td.c01').on('clic', function(){
        console.log('clic sur td.c01 sans délégation');
    });
    */

    /* la délégation permet de surveiller le clic sur un élément parent enregistré correctement dans le DOM, on indique la cible du clic qui serait concerné par le clic action demandé */
    $('#tableGenerate tbody').on('click', 'td.c01', function(){
        console.log('clic sur td.c01');
    });
    
    $('#nameSpace').on('click.nom', function(){
        console.log('clic namespace nom');
    });
    
    $('#nameSpace').on('click.prenom', function(){
        console.log('clic namespace prenom');
    });

    $('#nameSpace').trigger('click.prenom');
    $('#nameSpace').trigger('click.nom');

    $('#annuleCptClick').on('click', function(){
        $('p:not(.special)').off('click');
    });
    
    $('#reactiveCptClick').on('click', function(){
        $('p:not(.special)').on('click', function(){
            cptClicP = cptClicP + 1;
            console.log(`cptClicP : ${cptClicP}`);
        });
    });

    $('body').on('click', 'p', function(){
        console.log('clic sur un p du body');
    });

    $('#annuleClickBody').on('click', function(){
        $('body').off('click', 'p');
    });
});