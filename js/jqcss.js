jQuery(function($){
    

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
    $('#resSetPropValue').on('click', function(){
        $('#resSetPropValue').css('color', 'blue');
    });

    /* objet litéral en JS */

    const monObjLiteral = {
        nom : 'Duflot',
        prenom : 'Nicolas',
        bonjour : function(){
            return this.prenom;
        }
    };

    console.log(monObjLiteral);
    console.log(monObjLiteral.nom);
    console.log(monObjLiteral.bonjour());

    $('#animation01').on('click', function(){

        /* animer blocAnimate01 */
        $('#blocAnimate01').animate(
            /* prop css a changer */
            {
                width: '250px',
                fontSize : ['2rem', 'linear']
            },
            /* vitesse de l'animation */
            1000,
            'swing',
            function(){
                console.log('blocAnimate01 a grandi');
            }
        );
        
        /* animer blocAnimate02 */
        $('#blocAnimate02').animate(
            /* prop css a changer */
            {
                width: '250px',
                fontSize : ['2rem', 'swing']
            },
            /* vitesse de l'animation */
            1000,
            'linear',
            function(){
                console.log('blocAnimate02 a grandi');
            }
        );

    });

    /* quand on clique sur #anim01Reset, on remet les blocs à leur apparence d'origine */

    $('#anim01Reset').on('click', function(){

        /* animer blocAnimate01 */
        $('#blocAnimate01').animate(
            /* prop css a changer */
            {
                width: '50px',
                fontSize : ['1rem', 'linear']
            },
            /* vitesse de l'animation */
            1000,
            'swing',
            function(){
                console.log('blocAnimate01 a rétréci');
            }
        );
        
        /* animer blocAnimate02 */
        $('#blocAnimate02').animate(
            /* prop css a changer */
            {
                width: '50px',
                fontSize : ['1rem', 'swing']
            },
            /* vitesse de l'animation */
            1000,
            'linear',
            function(){
                console.log('blocAnimate02 a rétréci');
            }
        );
    });

    $('#show01').on('click', function(){
        /* on peut utliser les méthodes jquery */
        /*$('#threeStates').show();*/
        $('#threeStates').animate(
            {
                width: 'show'
            }
        );
    });
    
    $('#hide01').on('click', function(){
        /* on peut utliser les méthodes jquery */
        /*$('#threeStates').hide();*/
        $('#threeStates').animate(
            {
                width: 'hide'
            }
        );
    });
    
    $('#toggle01').on('click', function(){
        /* on peut utliser les méthodes jquery */
        /*$('#threeStates').toggle();*/
        $('#threeStates').animate(
            {
                width: 'toggle'
            }
        );
    });


});