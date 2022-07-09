$(document).ready(function () {

    var timestamp = "1653517730";
    var apikey = "2fe0b4d5dc3a466342708f4498672929";
    var hash = "e87d44266f60dc9b9c729b6643f92438";

    var base_url = "http://gateway.marvel.com/v1/public/characters";

    var parametros = {
        'ts': timestamp,
        'limit' : 50,
        'apikey': apikey,
        'hash': hash,
    };

    getCharacters();

    $('html').on('click', '.btn-personagens', function() {

        console.log($(this).text());

        var idPersonagem = $(this).text();

        getData(idPersonagem, function(resultado) {
            console.log('resultado aqui', resultado.data.results);

            var character = resultado.data.results[0].name;
            var description = resultado.data.results[0].description;
            var modified = resultado.data.results[0].modified;

            $('#modal-marvel-label').text('Personagem: ' + character);
            $('.description').text('Descrição: ' + description);
            $('.modified').text('Modificação: ' + modified);

        });

    });
    

    function getCharacters() {

        $.ajax({
            url: base_url,
            data: parametros,
            method: "GET",
            dataType: "json",
            success: function(data) {
                if(data.code == 200 && data.status == "Ok") {
                    console.log('caiu buscar personagens');

                    var personagens = data.data.results;

                    $.each(personagens, function(index, result) {

                        var htmlPersonagens = '<div class="col-sm-6 col-md-4">\n\
                                                    <div class="thumbnail">\n\
                                                      <img src="'+result.thumbnail.path + '.' + result.thumbnail.extension +'">\n\
                                                        <div class="caption">\n\
                                                            <button type="button" class="btn btn-primary btn-personagens ladda-button" data-style="zoom-in" data-toggle="modal" data-target="#modal-marvel"><span class="ladda-label"><i class="fa-solid fa-magnifying-glass"></i>'+result.id+'</span></button>\n\
                                                        </div>\n\
                                                    </div>\n\
                                                </div>';

                        $('.personagens').append(htmlPersonagens);
                         
                    }); 
                }
            }
        });    
    }

    function getData(id, callback) {
        $.ajax({
            url: 'http://gateway.marvel.com/v1/public/characters/'+ id,
            data: parametros,
            contentType: 'application/x-www-form-urlencoded',
            method: "GET",
            dataType: "json",
            success: function(data) {
                callback(data);
                
            }
        });
    }

});