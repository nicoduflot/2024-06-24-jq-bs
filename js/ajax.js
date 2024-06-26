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
            <tr>
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

    /* .get() : raccourcis de $.ajax() qui effectue directement la requête en get */
    $('#showAllUsers').on('click', function(){
        $.get(
            'https://jsonplaceholder.typicode.com/users', /* url de la ressource */
            function(data){
                /* la fonction de rappel a executer équivalent au .done() */
                /*console.log(data);*/
                $('#allUsers').html( jsonToUsers(data) );
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
})