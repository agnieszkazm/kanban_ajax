var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
    'X-Client-Id': '1653',
    'X-Auth-Token': 'a9284de307a0644c34193f62aabe63b9'
};

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});
//tworzenie kulumny
function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name); //pobieranie id przez serwer nie losujemy juz id przez js
        board.createColumn(col);
    });
}
//tworzenie kart w kolumnie - iterujemy po wszytskich kartach i tworzymy i dodajemy je do,odpowiedniej kolumny
function setupColumns(columns) {
    columns.forEach(function (column) {
  		var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}
