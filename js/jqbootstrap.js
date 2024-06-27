//après le chargement complet du DOM
jQuery(function ($) {
    $('a.goBottom').on('click', function(e){
        e.preventDefault();
        console.log($(document).height());
        $('html, body').scrollTop( $(document).height() );
    });

    $('.favoriteContent li a').on('click', function(event){
        /* on reprère le clique sur n'importe quel lien situé dans un élément ayant la classe favoriteContent */
        /* on annule le comportement par défaut d'un clic sur un lien */
        event.preventDefault();
        /* on reprère l'id de l'élément ancètre le plus proche possèdant la classe favoriteContent */
        const parent = $(this).closest('.favoriteContent').attr('id');
        /*console.log(parent);*/
        /* on exploite l'id dans le script pour faitre les remplacement de classe et d'attributs */
        $(`#${parent} a`).each(function(){
            /* le $(this) dans ce each() correspond à chaque lien correspondant au sélecteur CSS (les lien contenu dans la nav avec l'id favoriteTeenAgeAlbum : $('#favoriteTeenAgeAlbum a') */
            $(this).removeClass('active');
            $(this).removeAttr('aria-current');
        });
        /* le $(this) suivant correspond lui au lien cliqué */
        $(this).addClass('active');
        $(this).attr('aria-current', 'page');
        /*console.log($(this)[0].dataset.target);*/
        const info = $(this)[0].dataset.target;
        $(`#${parent} .content > div`).each(function(){
            /* $(this) correspond à toutes les div contenant les infos que l'on parcours */
            $(this).addClass('hidden');
        });
        $(`#${parent} .content > div#${info}`).removeClass('hidden');
    });
});