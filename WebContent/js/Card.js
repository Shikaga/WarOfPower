var isFaceUp;
var isTapped;
var front, back;

var frontGraphic;


Card = function(identifier,x,y) 
{
	InteractiveGraphicEntity.call(this,identifier,x,y,80,120,'#666');
	
	//this.paint = paint;
	this.paintFlip = paintFlip;
	
	//this.toggleTap = toggleTap;
	
	this.isTapped = false;
	this.isFaceUp = false;
	
	this.front = new Image();
	this.front.src = "./img/Card.png";
	this.back = new Image();
	this.back.src = "./img/Card.png";
	this.setImage(this.back);
	
	this.addSubGraphic(new InteractiveGraphicEntity(999999,this.width-20,0,20,20,'#f00'));
};

Card.prototype = new InteractiveGraphicEntity();
Card.prototype.parent = InteractiveGraphicEntity.prototype;
Card.prototype.constructor=Card;

Card.prototype.paint = function(context) {
	this.parent.paint.call(this,context);
};



function paintFlip(context)
{
    //context.fillStyle = '#000';
    //context.fillRect(this.x+this.width-20,this.y,20,20);
}

Card.prototype.toggleTap = function()
{
    this.isTapped = !this.isTapped;
    this.setRotated(this.isTapped);
};