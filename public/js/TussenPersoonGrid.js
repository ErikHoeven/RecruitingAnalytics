$('#menuTussenPersonen').click(function(){
    console.info('menuTussenPersonen')
    getTussenPersonenResultaat()
})

function getTussenPersonenResultaat (){
    $.get( "/Tussenpersonen/LoadData", function( data ) {
        console.info(data)
        var table = '<table class="table table-hover">' + data.header + data.body + '</table>'
        $('#grid').html('')
        $('#grid').html(table)
    })
}

function updateTussenPersoon(id, Naam, Adres, Plaats,Postcode, Telefoon, ContactPersoon, Marge){
    $('#Naam' + id).html('<input size="15" type="text" id="editNaam' + id +'" placeholder="'+ Naam +'" ></input>')
    $('#Adres' + id).html('<input size="15" type="text" id="editAdres' + id +'" placeholder="'+ Adres +' "></input>')
    $('#Plaats' + id).html('<input size="10" type="text" id="editPlaats' + id +'" placeholder="'+ Plaats +' "></input>')
    $('#Postcode' + id).html('<input size="6" type="text" id="editPostcode' + id +'" placeholder="'+ Postcode +' "></input>')
    $('#Telefoon' + id).html('<input size="11" type="text" id="editTelefoon' + id +'" placeholder="'+ Telefoon +'"></input>')
    $('#ContactPersoon' + id).html('<input size="15" type="text" id="editContactPersoon' + id +'" placeholder="'+ ContactPersoon +'"></input>')
    $('#Marge' + id).html('<input size="5" type="text" id="editMarge' + id +'" placeholder="'+ Marge +'"></input>')

    $('#edit' + id).html('')
    $('#edit' + id).append('<button id="cmd'+ id+'" type="button" class="btn btn-danger" onclick="updateEmployeeValue(\'' + id + '\')"><span class="glyphicon glyphicon-save"></span> Opslaan</button>')
}
    
function updateEmployeeValue (id) {
    var  Naam = $('#editNaam' + id).val()
        ,Adres = $('#editAdres' + id).val()
        ,Plaats = $('#editPlaats' + id).val()
        ,Postcode = $('#editPostcode' + id).val()
        ,Telefoon = $('#editTelefoon' + id).val()
        ,ContactPersoon = $('#editContactPersoon' + id).val()
        ,Marge = $('#editMarge' + id).val()
        ,TussenPersoonId =  id

    var tussenpersoon = {
        "Naam": Naam,
        "Adres": Adres,
        "Plaats": Plaats,
        "Postcode": Postcode,
        "Telefoon": Telefoon,
        "ContactPersoon": ContactPersoon,
        "Marge": Marge,
        "TussenPersoonId": TussenPersoonId
        
    }
    console.info('tussenpersoon')
    console.info(tussenpersoon)

   $.ajax({
        url: '/Tussenpersonen/UpdateData',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({tussenpersoon:tussenpersoon}),
        success: function (response) {
           console.info(response)
           getTussenPersonenResultaat()
    }})
}    

$('#ToevoegenTussenPersoon').click(function(){
    var theader = ''
    , tbody = ''
    , optionlist = ''
    , table = ''
    , columns = ['Naam','Adres','Plaats','Postcode','Telefoon','ContactPersoon','Marge']
    , header = setHeader(columns)

    ,body = 
    '<tr><td><input size="15" type="text" id="addNaam"  placeholder="Naam"></input></td>' +
    '    <td><input size="15" type="text" id="addAdres"  placeholder="Adres"></input></td>' +
    '    <td><input size="15" type="text" id="addPlaats"  placeholder="Plaats"></input></td>' +
    '    <td><input size="15" type="text" id="addPostcode"  placeholder="Telefoon"></input></td>' +
    '    <td><input size="15" type="text" id="addTelefoon"  placeholder="Naam"></input></td>' +
    '    <td><input size="15" type="text" id="addContactPersoon"  placeholder="ContactPersoon"></input></td>' +
    '    <td><input size="15" type="text" id="addMarge"  placeholder="ContactMarge"></input></td>' 
    
    var table = '<table class="table table-hover">' + header + body + '</table>'
    $('#grid').html('')
    $('#grid').html(table)
    $('#ToevoegenTussenPersoon').replaceWith('<button id="addTussenPersoon" type="button" class="btn btn-danger">Opslaan</button>')

    $('#addTussenPersoon').click(function(){
    var  Naam = $('#addNaam').val()
        ,Adres = $('#addAdres').val()
        ,Plaats = $('#addPlaats').val()
        ,Postcode = $('#addPostcode').val()
        ,Telefoon = $('#addTelefoon').val()
        ,ContactPersoon = $('#addContactPersoon').val()
        ,Marge = $('#addMarge').val()

        console.info('naam par')
        console.info(Naam)

        var tussenpersoon = {
            "Naam": Naam,
            "Adres": Adres,
            "Plaats": Plaats,
            "Postcode": Postcode,
            "Telefoon": Telefoon,
            "ContactPersoon": ContactPersoon,
            "Marge": Marge
            
        }
        console.info('Toevoegentussenpersoon:')
        console.info(tussenpersoon)

        $.ajax({
            url: '/Tussenpersonen/InsertData',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({tussenpersoon:tussenpersoon}),
            success: function (response) {
               console.info(response)
               getTussenPersonenResultaat()
        }})
    })
})

function removeTussenPersoon(id){
    console.info('removeTussenPersoon: ' + id)
    $.ajax({
        url: '/Tussenpersonen/DeleteData',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id:id}),
        success: function (response) {
           console.info(response)
           getTussenPersonenResultaat()
    }})

}








function setHeader(lstColumns) {
    var strHeader = '<theader>'

    var strHeader = '<theader>'

    lstColumns.forEach(function (c) {
        strHeader = strHeader + '<th>' + c + '</th>'
    })

    strHeader = strHeader + '</theader>'

    return strHeader
}