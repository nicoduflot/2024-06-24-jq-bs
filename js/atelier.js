function products(data, infos = []) {
    let html = '<div class="row">';
    for (element of data) {
        /*console.log(element);*/

        html = html + `
        
            <div class="col-lg-6 col-xl-4">
                <article class="card my-3 products">
                    <img src="${element.thumbnail}" class="card-img-top" alt="...">
                    <div class="card-header">
                        <h3 class="card-title h4">${element.title}</h3>
                    </div>
                    <div class="card-body">
                        <p>
                            ${element.description}
                        </p>
                    </div>
                    <div class="card-footer">
                        <button type="button" class="btn btn-primary stretched-link productModal" data-bs-toggle="modal" data-bs-target="#exampleModal" data-idproduit="${element.id}" data-productType="">
                            Voir le produit
                        </button>
                    </div>
                </article>
            </div>
        
        `;

    }
    html = html + `</div>`;
    return html;
}

jQuery(function ($) {

    /* listen to the music */

    let value = $("#slider").val();
        document.getElementById("thatSong").volume = (value / 100);

    $('#playSong').on('click', function () {
        $(`#${$(this)[0].dataset.target}`).trigger('play');
    });
    $('#stopSong').on('click', function () {
        $(`#${$(this)[0].dataset.target}`).trigger('pause');
    });

    $("#slider").on('change', function(){
        let value = $("#slider").val();
        document.getElementById("thatSong").volume = (value / 100);
    });

    $('#searchProducts').on('click', function (event) {
        event.preventDefault();
        /*let dataSource = $('#searchP').val() || 'products';*/
        let dataSource = 'products';
        $.get(
            `https://dummyjson.com/${dataSource}`,
            function (data) {
                /*console.log(data);*/
                let cptFields = 0;
                let infos = new Map();
                data;
                /*console.log(data);*/
                for (key in data) {
                    if (key === dataSource) {
                        elements = data[key];
                    } else {
                        infos.set(key, data[key]);
                    }
                }
                console.log(infos);
                $('#dataFeed').html(products(elements, infos));

                $('button.productModal').on('click', function(){
                    console.log($(this)[0].dataset);
                    const urlproduct = `https://dummyjson.com/${dataSource}/${$(this)[0].dataset.idproduit}`;
                    $.get(
                        urlproduct,
                        function(dataProduct){
                            console.log(dataProduct);
                            console.log(dataProduct.title);
                            console.log(dataProduct.thumbnail);
                            $('#exampleModalLabel').html(`${dataProduct.title}`);
                            $('#exampleModal img').attr('src',dataProduct.thumbnail);
                            $('#exampleModal .content').html(dataProduct.description);
                        },
                        'json'
                    )
                });

            },
            'json'
        ).fail(
            function (erreur) {
                console.log(erreur);
                console.log(`la données ${dataSource} n'existe pas`);
            }
        ).always(
            function () {
                console.log('Requête termminée');
            }
        )
    });

    
});