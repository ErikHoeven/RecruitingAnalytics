
$(function() {

       $("#TussenPersoonGrid").jsGrid({
        height: "70%",
        width: "100%",
        filtering: true,
        inserting: true,
        editing: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
        pageButtonCount: 5,
        deleteConfirm: "Do you really want to delete client?",
        controller: {
            loadData: function(filter) {
                
                return $.ajax({
                    type: "GET",
                    url: "/Tussenpersonen/LoadData",
                    data: filter
                });
                console.info(filter)
            },
            insertItem: function(item) {
                return $.ajax({
                    type: "POST",
                    url: "/Tussenpersonen/InsertData",
                    data: item
                });
            },
            updateItem: function(item) {
                return $.ajax({
                    type: "PUT",
                    url: "/Tussenpersonen/UpdateData",
                    data: item
                });
            },
            deleteItem: function(item) {
                return $.ajax({
                    type: "DELETE",
                    url: "/Tussenpersonen/DeleteData",
                    data: item
                });
            }
        },
        fields: [
            { name: "Naam",                type: "text",  width: 25 },
            { name: "Adres",               type: "text",  width: 25 },
            { name: "Plaats",              type: "text",  width: 25 },
            { name: "Postcode",            type: "text",  width: 25 },
            { name: "ContactPersoon",      type: "text",  width: 25 },
            { name: "RolContactPersoonId", type: "text",  width: 25 },
            { name: "Marge",               type: "text",  width: 25 },
            { type: "control" }
        ]
    });  
    
})

   
   