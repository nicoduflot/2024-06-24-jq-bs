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

    /* utiliser la pagination : pagination dynamique */
    $.ajax(
        {
            url: 'https://jsonplaceholder.typicode.com/albums',
            type: 'GET',
            dataType: 'json'
        }
    )
        .done(function (reponse) {
            console.log(reponse);
            const nbElement = reponse.length;
            const nbPage = Math.ceil(reponse.length / 7);
            console.log(`nbElement : ${nbElement}, nbPage : ${nbPage}`);
            /*
            
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        
            */
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
                        <a class="page-link" href="#">${i + 1}</a>
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
            $('#allAlbumsPages').html(pagination);
            console.log($('[aria-label="Previous"]').parent().next());
            console.log($('[aria-label="Next"]').parent().prev());
            $('[aria-label="Previous"]').addClass('disabled');
            $('[aria-label="Previous"]').parent().next().addClass('active').attr('aria-current', 'page');
            $('#pages a').on('click', function(event){
                event.preventDefault();
            });
        })
        .fail(function (erreur) {
            console.log(erreur);
        })
        .always(function () {
            console.log('requête terminée');
        });

});