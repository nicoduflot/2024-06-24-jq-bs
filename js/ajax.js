jQuery(function($){
    $('a.goBottom').on('click', function(e){
        e.preventDefault();
        console.log($(document).height());
        $('html, body').scrollTop( $(document).height() );
    });

    /* ajax js avec fetch */

    fetch('https://jsonplaceholder.typicode.com/users').then(
        /*
        .then() est appelé si et seulement si
        on a une réponse positive du serveur 
        quand on fait la requête 
        (code du statut de la réponse est égal à 200 )
        */
        function(data){
            return data.json()
        }
    ).then(function(json){
        /* on exploite le json */
        console.log(json);
        /*
        json.forEach(function(element){
            console.log(element.name);
            console.log(element.email);
            console.log('-----------');
        });
        */
    }).catch( 
        /* .catch() est appelé si et seulement si
        on a une réponse négative du serveur 
        quand on fait la requête 
        code du statut en erreur ressource (400, 401, etc) 
        ou erreur serveur (500, 501, etc) */
        function(erreur){
            /* on exploite le contenu de l'erreur */
            console.error(erreur);
        }
    ).finally(
        /* s'éxécute quelque soit le code retour du serveur */
        function(){
            /* action(s) à faire à la fin de la requête */
            console.log('requête terminée');
        }
    )

    function jsonToPosts(posts){
        let html = '';
        for(let post of posts){
            html = html + `
            <div class="card m-3" data-postid="${post.id}">
                <div class="card-body">
                    <h3 class="card-title">${post.title}</h3>
                    <p class="card-text">
                        ${post.body}
                    </p>
                </div>
            </div>
            `;
        }
        return html;
    }
    
    function jsonToUsers(users){
        if(!users.length){
            users = [users];
        }
        let html = `
        <table class="table table-dark table-striped">
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Adresse</th>
                </tr>
            </thead>
            <tbody>
        `;
        for(let user of users){
            html = html + `
            <tr data-userid="${user.id}">
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>
                    ${user.address.street}<br />
                    ${user.address.suite}<br />
                    ${user.address.city}<br />
                    ${user.address.zipcode}
                </td>
            </tr>
            `;
        }
        html = html + `
            <tbody>
        </table>
        `;
        return html;
    }

    function listeRecursiveXML(xmlElements, list = ''){
        list = '<ul>';

        /* on parcour tous les éléments de la collection HTML envoyé en paramètre par l'appel de la fonction */
        let listAttr = '';
        for(element of xmlElements){
            listAttr = '';
            if(element.attributes.length > 0){
                listAttr = listAttr + '<ul>';
                for(attr of element.attributes){
                    listAttr = listAttr + `<li>attr <b>${attr['name']}</b> : ${attr['value']}</li>`;
                }
                listAttr = listAttr + '</ul>';
            }
            if(element.children.length !== 0){
                /* si l'élément à des éléments enfants */
                /*console.log(element.nodeName);*/
                list = list + `<li><b>${element.nodeName} : </b><br />`;
                list = list + `${element.firstChild.textContent}`;
                list = list + listAttr;
                list = list + listeRecursiveXML(element.children);
                list = list + '</li>';
            }else{
                /* si l'élément n'a pas d'enfants */
                /*console.log(element.nodeName);*/
                list = list + `<li><b>${element.nodeName} : </b>
                ${listAttr}
                ${element.innerHTML}
                </li>`;
            }
        }

        list = list + '</ul>';
        return list;
    }

    /* ajax avec jQuery */
    $('#showAllPosts').on('click', function(){
        $.ajax(
            /* on défini la requête au serveur */
            {
                url: 'https://jsonplaceholder.typicode.com/posts', /* adresse de la ressource demandée */
                type: 'GET', /* méthode de la requête, GET pour aller chercher des données, POST pour les modifier (ajout, modification et suppression) */
                dataType: 'json'
            }
        ).done(
            /* .done() est appelé si et seulement si
            on a une réponse positive du serveur 
            quand on fait la requête 
            (code du statut de la réponse est égal à 200 ) */
            function(reponse){
                /*console.log(reponse);*/
                $('#allPosts').html( jsonToPosts(reponse) );
            }
        ).fail(
            /* .fail() est appelé si et seulement si
            on a une réponse négative du serveur 
            quand on fait la requête 
            code du statut en erreur ressource (400, 401, etc) 
            ou erreur serveur (500, 501, etc) */
            function(erreur){
                console.log( `La requête s'est terminée sur une erreur : ${erreur.responseText}` );
            }
        ).always(
            /* s'éxécute quelque soit le code retour du serveur */
            function(){
                console.log('requête terminée');
            }
        );
    });

    $('.backButton').hide();
    /* .get() : raccourcis de $.ajax() qui effectue directement la requête en get */
    const baseUrlUser = 'https://jsonplaceholder.typicode.com/users';
    let urluser = baseUrlUser;
    $('#showAllUsers').on('click', function(){
        $.get(
            urluser, /* url de la ressource */
            function(data){
                /* la fonction de rappel a executer équivalent au .done() */
                /*console.log(data);*/
                $('#allUsers').html( jsonToUsers(data) );
                /* on va abonner par délégation les tr créées à un écouteur d'événement */
                $('#allUsers').on('click', 'tbody tr', function(){
                    console.log($(this)[0].dataset.userid);
                    urluser = urluser + `/${$(this)[0].dataset.userid}`;
                    $('#showAllUsers').trigger('click');
                    urluser = baseUrlUser;
                    $('.backButton').show();
                });
            },
            'json' /* le dataType */
        ).fail(
            /* .fail() est appelé si et seulement si
            on a une réponse négative du serveur 
            quand on fait la requête 
            code du statut en erreur ressource (400, 401, etc) 
            ou erreur serveur (500, 501, etc) */
            function(erreur){
                console.log( `La requête s'est terminée sur une erreur : ${erreur.responseText}` );
                $('#allUsers').html( erreur.responseText );
            }
        ).always(
            /* s'éxécute quelque soit le code retour du serveur */
            function(){
                console.log('requête terminée');
            }
        );
    });

    $('.backButton').on('click', function(){
        $('#showAllUsers').trigger('click');
        $('.backButton').hide();
    });

    $('.GetRss').on('click', function(){
        const url = $(this)[0].dataset.url;
        $.get(
            url,
            function(data){
                /*console.log(data.children);*/
                const content = data.children;
                $('#showRss').html(listeRecursiveXML(content));
            },
            'xml' /* le dataType xml */
        ).fail(function(erreur){
            console.log(erreur);
        }).always(function(){
            console.log('requête terminée');
        })
    });

})