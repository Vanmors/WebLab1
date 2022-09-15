function resetPreviousData(){
    if (localStorage.getItem("attempts") !== null) {
        var attempts = localStorage['attempts'].split('|');
        attempts.forEach(element => {
            if(element !== "" && element !== null) {
                $('#result-table').append(element);
            }
        });
    }
}

$(function() {

        // function isNumeric(n) {
        //     return !isNaN(parseFloat(n)) && isFinite(n);
        // }
        //
        // function validateY() {
        //     const Y_MIN = -5;
        //     const Y_MAX = +5;
        //     let xField = $('#y-textinput');
        //     let numY = xField.val().trim().replace(',','.');
        //
        //     xField.val(numY);
        //     if(isNumeric(numY) && numY > Y_MIN && numY < Y_MAX) {
        //         xField.removeClass('text-error');
        //         return true;
        //     } else {
        //         xField.addClass('text-error');
        //         return false;
        //     }
        // }
        // function validateR() {
        //     if ($('.r-radio').is(':checked')) {
        //         $('.rbox-label').removeClass('box-error');
        //         return true;
        //     } else {
        //         $('.rbox-label').addClass('box-error');
        //         return false;
        //     }
        // }
        // function validateX() {
        //     const X_VALUES = ["-4","-3","-2","-1","0","1","2","3","4"];
        //     let xButtonLabel = $('#x-textinput');
        //     let numX = xButtonLabel.val().replace(',', '.');
        //     if(isNumeric(numX) && numX in X_VALUES){
        //         xButtonLabel.removeClass('text-error');
        //         return true;
        //     } else {
        //         xButtonLabel.addClass('text-error');
        //         return false;
        //     }
        // }
        // function validateForm() {
        //     return validateX() & validateY() & validateR();
        // }

        $('#input-form').on('submit', function(event) {
            event.preventDefault();
            console.log( $( this ).serialize() );
            // if (!validateForm()) return;
            $.ajax({
                url: 'contact.php',
                method: 'GET',
                data: $(this).serialize() + '&timezone=' + new Date().getTimezoneOffset(),
                dataType: "json",
                beforeSend: function() {
                    $('.button').attr('disabled', 'disabled');
                },
                success: function(data) {
                    $('.button').attr('disabled', false);
                    console.log(data);
                    if (data.validate) {
                        console.log(data);
                        let newRow = `<tr>
              <td class="table-text">${data.x}</td>
              <td class="table-text">${data.y}</td>
              <td class="table-text">${data.r}</td>
              <td class="table-text">${data.curtime}</td>
              <td class="table-text">${data.exectime}</td>
              <td class="${(data.hitres) ? "hit-text":"miss-text"}">${data.hitres}</td>
              </tr>`;
                        console.log(newRow);
                        $('#result-table').append(newRow);

                        if (localStorage.getItem("attempts") !== null) {
                            localStorage['attempts'] += "|" + newRow;
                        } else {
                            localStorage['attempts'] = newRow;
                        }

                        $.ajax({
                            url: 'out.php',
                            method: 'GET',
                            success: function(data){
                                location.href = data;
                            }
                        });
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                }
            });
        });

        $('#input-form').on('reset', function(event) {
            $("#result-table").empty().append(`<tr class="table-header">
              <th class="coords-col">X</th>
              <th class="coords-col">Y</th>
              <th class="coords-col">R</th>
              <th class="time-col">Current time</th>
              <th class="time-col">Execution time</th>
              <th class="hitres-col">Hit result</th>
            </tr>`);

            localStorage['attempts'] = "";
        });

    }
);
