$('#menuTussenPersonen').click(function(){
    $.get( "/Tussenpersonen/LoadData", function( data ) {
        console.info(data)
    })
})
    
    
    
