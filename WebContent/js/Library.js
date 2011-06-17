var x,y;
var canvasHandler;

Library = function(identifier,x,y,canvasHandler) {
	Card.call(this,identifier,x,y,80,120,'#666');
	this.isFaceUp = true;
	this.canvasHandler = canvasHandler;
};


Library.prototype = new Card();
Library.prototype.libraryParent = Card.prototype;
Library.prototype.constructor = Library;

Library.prototype.drawCard = function() {
	this.canvasHandler.fabricateCardInPlay();
};

Library.prototype.toggleTap = function() {
	this.drawCard();	
};

Library.prototype.placeOnTop = function(card) {
	return false;
};

Library.prototype.lookAtCardOnTop = function() {
	return false;
};