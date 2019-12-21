$('#menuRol').click(function(){
    console.info('menuRol')
    getRolResultaat()
})

function getRolResultaat (){
    $.get( "/Rol/LoadData", function( data ) {
        console.info(data)
        var table = '<table class="table table-hover">' + data.header + data.body + '</table>'
        $('#gridRol').html('')
        $('#gridRol').html(table)
    })
}

function updateRolFields(id, RolNaam, RolMinTarief, RolMaxTarief){

    $('#RolNaam' + id).html('<input size="15" type="text" id="editRolNaam"' + id +'" placeholder="'+ RolNaam +'" ></input>')
    $('#RolMinTarief' + id).html('<input size="15" type="text" id="editRolMinTarief' + id +'" placeholder="'+ RolMinTarief +' "></input>')
    $('#RolMaxTarief' + id).html('<input size="10" type="text" id="editRolMaxTarief"' + id +'" placeholder="'+ RolMaxTarief +' "></input>')

    $('#edit' + id).html('')
    $('#edit' + id).append('<button id="cmd'+ id+'" type="button" class="btn btn-danger" onclick="updateRol(\'' + id + '\')"><span class="glyphicon glyphicon-save"></span> Opslaan</button>')
}
    
function updateRol (id) {
    var  RolNaam = $('#editRolNaam' + id).val()
        ,RolMinTarief = $('#editRolMinTarief' + id).val()
        ,RolMaxTarief = $('#editRolMaxTarief' + id).val()
        ,RolId =  id

    var rol = {
        "RolNaam": RolNaam,
        "RolMinTarief": RolMinTarief,
        "RolMaxTarief": RolMaxTarief,
        "RolId": RolId
    }
    console.info('rol')
    console.info(rol)

   $.ajax({
        url: '/Rol/UpdateData',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({rol:rol}),
        success: function (response) {
           console.info(response)
           getRolResultaat()
    }})
}    

$('#ToevoegenRol').click(function(){
    var 
      table = ''
    , columns = ['RolNaam','RolMinTarief','RolMaxTarief']
    , header = setHeader(columns)

    ,body = 
    '<tr><td><input size="15" type="text" id="addRolNaam"  placeholder="RolNaam"></input></td>' +
    '    <td><input size="15" type="text" id="addRolMinTarief"  placeholder="RolMinTarief"></input></td>' +
    '    <td><input size="15" type="text" id="addRolMaxTarief"  placeholder="RolMaxTarief"></input></td>' 
   
    var table = '<table class="table table-hover">' + header + body + '</table>'
    $('#gridRol').html('')
    $('#gridRol').html(table)
    $('#ToevoegenRol').replaceWith('<button id="addRol" type="button" class="btn btn-danger">Opslaan</button>')

    $('#addRol').click(function(){
    var  RolNaam = $('#addRolNaam').val()
        ,RolMinTarief = $('#addRolMinTarief').val()
        ,RolMaxTarief = $('#addRolMaxTarief').val()
        console.info('naam par')
        console.info(RolNaam)

        var rol = {
            "RolNaam": RolNaam,
            "RolMinTarief": RolMinTarief,
            "RolMaxTarief": RolMaxTarief,            
        }
        console.info('ToevoegenRol:')
        console.info(rol)

        $.ajax({
            url: '/Rol/InsertData',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({rol:rol}),
            success: function (response) {
               console.info(response)
               getRolResultaat()
        }})
    })
})

function removeRol(id){
    console.info('removeRol: ' + id)
    $.ajax({
        url: '/Rol/DeleteData',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({id:id}),
        success: function (response) {
           console.info(response)
           getRolResultaat()
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