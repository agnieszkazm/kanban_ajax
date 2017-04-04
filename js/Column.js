function Column(id, name) {
	var self = this;
	this.id = id;
	this.name = name || 'Nie podano nazwy';
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>');
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
		var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');
		
		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});
		

		columnAddCard.click(function(event) {
			var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
			$.ajax({
				url: baseUrl +'/card',
				method: 'POST',
				data: {
					name: cardName,
					bootcamp_kanban_column_id: self.id
				},
				success: function(response) { //po poprawnym zapytaniu i utworzeniu nowej kolumny wykonuje sie:
					var card = new Card(response.id, cardName);//tworzymy nowa karte
					self.createCard(card);//dodajemy karte do kolumny
			}
		});
			
			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},

//metoda delate zapytanie do serwera
		deleteColumn: function() {
			var self = this;
			$.ajax ({
				url: baseUrl + '/column/' + self.id, //$.ajax gubi kontekst
				method: 'DELETE',
				success: function(response){
					self.element.remove();
				}
			});
		}

};