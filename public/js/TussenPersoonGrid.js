$(function() {

 

    $("#jsGrid").jsGrid({
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
            { name: "Name",    type: "text",  width: 150 },
            { name: "Adres",  type: "text",  width: 150 },
            { name: "Plaats", type: "text",  width: 150 },
            { name: "Postcode", type: "select", items: countries, valueField: "Id", textField: "Name" },
            { name: "Telefoon", type: "checkbox", title: "Is Married", sorting: false },
            { name: "Telefoon", type: "checkbox", title: "Is Married", sorting: false }
            { type: "control" }
        ]
    });  
    
})

   // [ { TussenPersoonId: 1,
    //     Naam: 'Wier',
    //     Adres: 'Wieringaaann',
    //     Plaats: 'Rijswijks',
    //     Postcode: 'postcode',
    //     Telefoon: 'telefoon',
    //     ContactPersoon: 'contactpersoon',
    //     RolContactPersoonId: 3,
    //     Marge: 2,
    //     BijwerkDatum: 2019-12-18T00:00:00.000Z } ]