//après le chargement complet du DOM
jQuery(function ($) {
    $('a.goBottom').on('click', function(e){
        e.preventDefault();
        console.log($(document).height());
        $('html, body').scrollTop( $(document).height() );
    });

    /*console.log($('body > nav.navbar ul li a:not(.goBottom)'));*/
    $('body > nav.navbar ul li a:not(.goBottom)').each(function(){
        let href= $(this).attr('href');
        href = href.substring(1, href.length);
        const baseURI = $(this)[0].baseURI;
        /*
        console.log(href);
        console.log(baseURI);
        */
        if(baseURI.includes(href)){
            $(this).addClass('active').attr('aria-current', 'page');
        }
    });
});