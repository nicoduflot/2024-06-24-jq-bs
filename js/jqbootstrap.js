//après le chargement complet du DOM
jQuery(function ($) {
    $('a.goBottom').on('click', function(e){
        e.preventDefault();
        console.log($(document).height());
        $('html, body').scrollTop( $(document).height() );
    });


    $('#favoriteTeenAgeAlbum a').on('click', function(event){
        event.preventDefault();
        $('#favoriteTeenAgeAlbum a').each(function(){
            /* le $(this) dans ce each() correspond à chaque lien correspondant au sélecteur CSS (les lien contenu dans la nav avec l'id favoriteTeenAgeAlbum : $('#favoriteTeenAgeAlbum a') */
            $(this).removeClass('active');
            $(this).removeAttr('aria-current');
        });
        /* le $(this) suivant correspond lui au lien cliqué */
        $(this).addClass('active');
        $(this).attr('aria-current', 'page');
        console.log($(this)[0].dataset.target);
        const info = $(this)[0].dataset.target;
        $('#favoriteTeenAgeAlbum .content > div').each(function(){
            /* $(this) correspond à toutes les div contenant les infos que l'on parcours */
            $(this).addClass('hidden');
        });
        $(`#favoriteTeenAgeAlbum .content > div#${info}`).removeClass('hidden');
    });
    

});