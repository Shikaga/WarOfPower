var isFaceUp;
var isTapped;
var frontImg, backImg;
var frontGraphic;

var frontGraphic;
var name, description;


Card = function(identifier, x, y, name, description) 
{
	InteractiveGraphicEntity.call(this,identifier,x,y,80,120,'#666');
	
	this.isTapped = false;
	this.isFaceUp = false;
	
	this.frontImg = new Image();
	this.frontImg.src = "./img/Card.png";
	this.backImg = new Image();
	this.backImg.src = "./img/Card.png";
	this.setImage(this.backImg);
	
	this.name = name;
	this.description = description;
	
	this.frontGraphic = new InteractiveGraphicEntity(8888888,x,y,80,120,'#666');
	this.frontGraphic.addSubGraphic(new InteractiveGraphicEntity(8888888,5,60,70,55,'#eee'));
	
	this.addSubGraphic(new InteractiveGraphicEntity(999999,this.width-20,0,20,20,'#f00'));
};

Card.prototype = new InteractiveGraphicEntity();
Card.prototype.parent = InteractiveGraphicEntity.prototype;
Card.prototype.constructor=Card;

Card.prototype.paint = function(context) {
	if (this.isFaceUp) {
		this.frontGraphic.setX(this.x);
		this.frontGraphic.setY(this.y);
		this.frontGraphic.setRotated(this.rotated);
		this.frontGraphic.paint(context);
	} else {
		this.parent.paint.call(this,context);
	}
};

Card.prototype.toggleTap = function()
{
	this.isFaceUp = !this.isFaceUp;
    //this.isTapped = !this.isTapped;
    //this.setRotated(this.isTapped);
};