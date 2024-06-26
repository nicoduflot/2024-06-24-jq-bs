jQuery(function($){
    $('a.goBottom').on('click', function(e){
        e.preventDefault();
        console.log($(document).height());
        $('html, body').scrollTop( $(document).height() );
    });

    $('#getPropValue').on('click', function(){
        const resultat = `${$('#getPropValue').css('color')}, ${$('#getPropValue').css('fontWeight')}`;
        $('#resGetPropValue').html( resultat );
    });

    $('#setPropValueRed').on('click', function(){
        $('#resSetPropValue').css('color', 'red');
    });
    
    $('#setPropValueBlack').on('click', function(){
        $('#resSetPropValue').css('color', 'black');
    });

    /* quand on clique sur #resSetPropValue, on remet la couleur d'origine */

});