var uniqueIdentifier;
var x,y;
var width,height;
var color;
var front, back;
var isRotated;
var image;
var subGraphics;

function InteractiveGraphicEntity(uniqueIdentifier,x,y,width,height,color)
{
	this.uniqueIdentifier = uniqueIdentifier;
	this.x = x;
	this.y = y;
	this.isRotated = false;
	this.width = width;
	this.height = height;
	this.color = color;
	   
	this.subGraphics = [];
}

InteractiveGraphicEntity.prototype.paintAllGraphics = function(context)
{
	if (this.image !== undefined) {
		context.drawImage(this.image,0,0,this.width,this.height);
	} else {
		context.fillStyle = this.color;
		context.fillRect(0,0,this.width,this.height);
	}    
	var i;
	for (i=0; i < this.subGraphics.length; i++)
	{
		this.subGraphics[i].paint(context);   
	}
};

InteractiveGraphicEntity.prototype.superPaint = function(context)
{
    context.translate(this.x, this.y);
    if (this.isRotated) {
        context.translate(this.height,0);
        context.rotate(90 * Math.PI / 180);
        this.paintAllGraphics(context);
        context.rotate(-90 * Math.PI / 180);
        context.translate(-this.height,0);
    } else {
        this.paintAllGraphics(context);
    }
    context.translate(-this.x,-this.y);
};

InteractiveGraphicEntity.prototype.paint = function(context)
{
	this.superPaint(context);
};

InteractiveGraphicEntity.prototype.isClicked = function(x,y)
{
    if (!this.isRotated) 
    {
        if (x > this.x && x < (this.x + this.width) &&
            y > this.y && y < (this.y + this.height))
        {
            return true;
        }
        return false;
    } else {
         if (x > this.x && x < (this.x + this.height) &&
            y > this.y && y < (this.y + this.width))
        {
            return true;
        }
        return false;
    }
};

InteractiveGraphicEntity.prototype.moveX = function(x)
{
    this.x += x;
};

InteractiveGraphicEntity.prototype.moveY = function(y)
{
    this.y += y;
};

InteractiveGraphicEntity.prototype.setX = function(x)
{
    this.x = parseInt(x,10);
};

InteractiveGraphicEntity.prototype.setY = function(y)
{
    this.y = parseInt(y,10);
};

InteractiveGraphicEntity.prototype.setRotated = function(rotated)
{
    this.isRotated = rotated;   
};

InteractiveGraphicEntity.prototype.setImage = function(image)
{
    this.image = image;   
};

InteractiveGraphicEntity.prototype.addSubGraphic = function(graphic)
{
    this.subGraphics.push(graphic);
};

  