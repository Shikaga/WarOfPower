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
	
	this.isClicked = isClicked;
	this.moveX = moveX;
	this.moveY = moveY;
	this.setX = setX;
	this.setY = setY;      
	this.setRotated = setRotated;
	this.setImage = setImage;
	this.subGraphics = [];
}

InteractiveGraphicEntity.prototype.paintAllGraphics = function(context)
{
    context.drawImage(this.image,0,0,this.width,this.height);
    for (var i=0; i < this.subGraphics.length; i++)
    {
        this.subGraphics[i].paint(context);   
    }
};

InteractiveGraphicEntity.prototype.superPaint = function(context)
{
    if (this.image !== undefined) {
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
    } else {
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y,this.width,this.height);
    }    
};

InteractiveGraphicEntity.prototype.paint = function(context)
{
	log('s');
    this.superPaint(context);
};

function isClicked(x,y)
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
}

function moveX(x)
{
    this.x += x;
}

function moveY(y)
{
    this.y += y;
}

function setX(x)
{
    this.x = parseInt(x);
}

function setY(y)
{
    this.y = parseInt(y);
}

function setRotated(rotated)
{
    this.isRotated = rotated;   
}

function setImage(image)
{
    this.image = image;   
}

InteractiveGraphicEntity.prototype.addSubGraphic = function(graphic)
{
    this.subGraphics.push(graphic);
};

  