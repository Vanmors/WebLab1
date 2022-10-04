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
