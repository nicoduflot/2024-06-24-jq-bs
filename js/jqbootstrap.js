//après le chargement complet du DOM
jQuery(function ($) {
    $('.favoriteContent li a').on('click', function (event) {
        /* on reprère le clique sur n'importe quel lien situé dans un élément ayant la classe favoriteContent */
        /* on annule le comportement par défaut d'un clic sur un lien */
        event.preventDefault();
        /* on reprère l'id de l'élément ancètre le plus proche possèdant la classe favoriteContent */
        const parent = $(this).closest('.favoriteContent').attr('id');
        /*console.log(parent);*/
        /* on exploite l'id dans le script pour faitre les remplacement de classe et d'attributs */
        $(`#${parent} a`).each(function () {
            /* le $(this) dans ce each() correspond à chaque lien correspondant au sélecteur CSS (les lien contenu dans la nav avec l'id favoriteTeenAgeAlbum : $('#favoriteTeenAgeAlbum a') */
            /*$(this).removeClass('active');
            $(this).removeAttr('aria-current');
            */
            $(this).removeClass('active').removeAttr('aria-current');
        });
        /* le $(this) suivant correspond lui au lien cliqué */
        $(this).addClass('active');
        $(this).attr('aria-current', 'page');
        /*console.log($(this)[0].dataset.target);*/
        const info = $(this)[0].dataset.target;
        $(`#${parent} .content > div`).each(function () {
            /* $(this) correspond à toutes les div contenant les infos que l'on parcours */
            $(this).addClass('hidden');
        });
        $(`#${parent} .content > div#${info}`).removeClass('hidden');
    });

    /*
    déclencher la modale quand on clique 
    sur les tr du tbody du tableau .reactiveModal
    table.reactiveModal tbody tr
    */

    $('table.reactiveModal tbody tr').on('click', function () {
        const parent = $(this).closest('.reactiveModal').attr('data-bs-target');
        $(`button.reactiveModal[data-bs-target="${parent}"]`).trigger('click');
        const modalTitle = $(this).closest('.reactiveModal').attr('data-modal-title');
        $(`${parent} .modal-title`).html(modalTitle);
        let modalSections = [];
        let modalSectionsContent = [];
        $(`[data-bs-target="${parent}"] thead tr th`).each(function () {
            console.log($(this).html());
            modalSections.push($(this).html());
        });
        console.log(modalSections);
        console.log($(this)[0].children);
        for (info of $(this)[0].children) {
            modalSectionsContent.push(info.innerHTML);
        }
        console.log(modalSectionsContent);
        $(`${parent} .modal-body`).html('');
        for (key in modalSections) {
            let sectionTitle = `<h3>${modalSections[key]}</h3>`;
            let sectionContent = `<p>${modalSectionsContent[key]}</p>`;
            $(`${parent} .modal-body`).append(sectionTitle);
            $(`${parent} .modal-body`).append(sectionContent);

        }
    });

    /* cette fonction permet de créer un tableau de tableau. le tableau parent possède autant d'élement que de pages calculée par rapport au nombre d'élément par page demandé */
    function albumPages(nbElement, elementsByPage, data){
        /* le tableau principal (les pages) */
        let tabElements = [];
        /* le tableau des éléments par page */
        let tabPage = [];
        /* un compteur d'élément par page */
        let cptElPage = 0;
        /* un compteur d'élément qui permet de récupérer les derniers éléments de la dernière page */
        let cptEl = 0;
        /* on parcours tous les éléments du tableau de données envoyé */
        for(i = 0; i < nbElement; i = i + 1){
            /* on ajoute l'élément dans le tableau de contenu de la page */
            tabPage.push(data[i]);
            /* on augmente le compteur des éléments par page de 1 */
            cptElPage = cptElPage + 1;
            /* on augment le compteur d'élément total visité de 1 */
            cptEl = cptEl + 1;
            /* si on atteint la limite d'élement pour une page */
            if(cptElPage === elementsByPage){
                /* on ajoute le tableau de la page dans les tableau principal */
                tabElements.push(tabPage);
                /* on réinitialise le compteur d'élément par page à 0 */
                cptElPage = 0;
                /* on réinitialise le tableau des éléments par page */
                tabPage = [];
            }
        }
        /* si il reste des éléments, c'est à dire que le dernier tableau de page n'a pas été ajouté à la pagination */
        if(cptEl !== nbElement - 1){
            /* on pousse dans le tableau principal la dernière page (le nb d'élément dans cette page n'atteint pas le nombre d'élément par page demandé) */
            tabElements.push(tabPage);
        }
        /* on renvoi le tableau de tableau */
        return tabElements;
    }

    /*  */
    function createPage(tabElement){
        let page = '';
        /* on parcours le tableau d'objet json et on créer la page mise en forme des données */
        for(element of tabElement){
            page = page + `
                <div class="card m-3" data-albumid="${element.id}">
                    <div class="card-body">
                        <h3 class="card-title">${element.title}</h3>
                        <p class="card-text">
                            userid : ${element.userId}<br />
                            element id : ${element.id}
                        </p>
                    </div>
                </div>
            `;
        }

        /* on renvoie la page */
        return page;
    }

    /* utiliser la pagination : pagination dynamique */
    $.ajax(
        {
            url: 'https://jsonplaceholder.typicode.com/albums',
            type: 'GET',
            dataType: 'json'
        }
    )
        .done(function (reponse) {
            /* on défini le nombre d'éléments par page */
            const elementsByPage = 7;
            /* à l'ouverture de la page, on est sur la première */
            let currentPage = 0;
            /* on récupère le nombre d'éléments total récupérés par ajax */
            const nbElement = reponse.length;
            /* on calcul le nombre de page nécessaire pour avoir au max x élément par page */
            const nbPage = Math.ceil(reponse.length / elementsByPage);
            /* on récupère le tableau normé des données et déjà paginé  */
            let paginatedElements = albumPages(nbElement, elementsByPage, reponse);
            /* on récupère les données de la première page */
            const firstPage = paginatedElements[currentPage];
            /* on crée la page à l'aide tu tableau récupéré dans les données paginées */
            let page = createPage(firstPage);

            /* on affiche la première page des données */
            $('#allAlbums').html(page);

            /* on crée la pagination selon sa configuration */
            let pagination = `
            <nav aria-label="Page navigation example" id="pages">
                <ul class="pagination">
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
        `;
            /* boucle des pages */
            for(let i = 0; i < nbPage; i = i + 1){
                pagination = pagination + `
                    <li class="page-item">
                        <a class="page-link" data-current-page="${i}" href="#">${i + 1}</a>
                    </li>
                `;
            }
            pagination = pagination + `
                    <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
            `;
            /* on ajoute la pagination sur le document */
            $('#allAlbumsPages').html(pagination);
            /* par défaut, previous est disabled */
            $('[aria-label="Previous"]').addClass('disabled');
            /* par défaut, le premier élément de pagination est actif et page courante */
            $('[aria-label="Previous"]').parent().next().addClass('active').attr('aria-current', 'page');

            /* on surveille le clic sur les lien de navigation */
            $('#pages a').on('click', function(event){
                /* on annule le comportement lien */
                event.preventDefault();
                /* on retire les clas disabled de previous et next */
                $('[aria-label="Previous"]').removeClass('disabled');
                $('[aria-label="Next"]').removeClass('disabled');
                /* on véirife si le clic vient de previous, next ou une des lien direct vers une page */
                if($(this).attr('aria-label')){
                    /* si c'est prévious ou next, ou change de 1 le compteur */
                    if($(this).attr('aria-label') === 'Previous'){
                        currentPage = currentPage - 1;
                    }else{
                        currentPage = currentPage + 1;
                    }
                }else{
                    /* si c'est un lien de page, le compteur et initialisé au numéro de page désiré */
                    console.log($(this)[0].dataset.currentPage);
                    currentPage = parseInt($(this)[0].dataset.currentPage);
                }
                /* on crée la page comme la page par défaut avec les paramètre de la page demandée */
                page = createPage(paginatedElements[currentPage]);
                /* on vérifie s'il faut disabled previous ou next */
                if(currentPage === 0){
                    $('[aria-label="Previous"]').addClass('disabled');
                }
                if(currentPage === (nbPage-1) ){
                    $('[aria-label="Next"]').addClass('disabled');
                }
                /* on gère l'affichage couleur de la pagination ainsi que la présence du aria-current */
                $('#pages li').removeClass('active').removeAttr('aria-current');
                $(`#pages a[data-current-page="${currentPage}"]`).parent().addClass('active').attr('aria-current', 'page');

                /* on vide le réceptacle de lancienne page affichée */
                $('#allAlbums').html('');
                /* on affiche la page demandée */
                $('#allAlbums').html(page);
            });
        })
        .fail(function (erreur) {
            console.log(erreur);
        })
        .always(function () {
            console.log('requête terminée');
        });

});