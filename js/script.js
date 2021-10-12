$(document).ready(function () {
    $('#inp_cep').focus();
    $('#inp_cep').mask('00000-000');

    $('#btn_search').click(function () {
        var cep = $('#inp_cep').cleanVal();
        if ($.isNumeric(cep) == true) {
            if (cep.length != 8) {
                alert("Digite a quantia de caracteres necessários!\nNo mínimo e máximo 8 caracteres.");
                $('#inp_cep').focus();
            }
            else {
                ajaxRequest(cep);
            }
        }
        else {
            alert("Digite somente números!");
            $('#inp_cep').focus();
        }
    });

    $('#btn_reset').click(function () {
        $('#inp_cep').val("");
        $('#inp_cep').focus();
    });

    function ajaxRequest(cep){
        $.ajax({
            type: "GET",
            url: "https://viacep.com.br/ws/" + cep + "/json/",
            success: function (response) {
                if (response.erro == true) {
                    alert("O CEP informado não existe!\nDigite outro CEP.");
                    $('#inp_cep').focus();
                }
                else {
                    $('#cep_inf').html(response.cep);
                    $('#log_inf').html(response.logradouro);
                    $('#bairro_inf').html(response.bairro);
                    $('#local_inf').html(response.localidade);
                    $('#uf_inf').html(response.uf);
                    $('#ddd_inf').html(response.ddd);
                }
            }
        });
    }

    $(document).keypress(function (e) { 
        if(e.which == 13){
            $('#btn_search').click();
        }
    });
});