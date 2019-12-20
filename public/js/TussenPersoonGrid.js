$('#menuTussenPersonen').click(function(){
    $.get( "/Tussenpersonen/LoadData", function( data ) {
        console.info(data)
        var table = '<table class="table table-hover">' + data.header + data.body + '</table>'
        $('#grid').html(table)
    })
})

function updateTussenPersoon(id, Naam, Adres, Plaats,Telefoon,ContactPersoon){
    $('#Naam' + id).html('<input size="15" type="text" id="editNaam' + id +'" placeholder="'+ Naam +'" ></input>')
    $('#Adres' + id).html('<input size="15" type="text" id="editAdres' + id +'" placeholder="'+ Adres +' "></input>')
    $('#Plaats' + id).html('<input size="15" type="text" id="editPlaats' + id +'" placeholder="'+ Plaats +' "></input>')
    $('#Telefoon' + id).html('<input size="15" type="text" id="editTelefoon' + id +'" placeholder="'+ Telefoon +'"></input>')
    $('#ContactPersoon' + id).html('<input size="15" type="text" id="editContactPersoon' + id +'" placeholder="'+ ContactPersoon +'"></input>')

    $('#edit' + id).html('')
    $('#edit' + id).append('<button id="cmd'+ id+'" type="button" class="btn btn-danger" onclick="updateEmployeeValue(\'' + id + '\')"><span class="glyphicon glyphicon-save"></span> Save</button>')
}
    
function updateEmployeeValue (id) {
    var  firstname = $('#editFirstname' + id).val()
        , lastname = $('#editLastName' + id).val()
        , role = $('#editSelRole' + id + ' option:selected').text()
        , percFullTime = $('#editPercFullTime' + id).val()

    var empObject = {
        "firstname": firstname,
        "lastname": lastname,
        "role": role,
        "percFullTime": percFullTime,
        "id": id
    }

    console.info(empObject)

   $.ajax({
        url: '/admin/editEmployeeResults',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(empObject),
        success: function (response) {
           console.info(response)
           getEmployeeResults(user)
    }})
}    
