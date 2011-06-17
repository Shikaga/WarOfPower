goog.require('InteractiveGraphicEntity');

var context;
var offsetLeft,offsetTop;
var width;
var height;
var graphicEntityStack;

var selectedGraphic;
var mouseX, mouseY;
var surface;

function CanvasHandler(context, x, y, width, height) 
{

    
    this.setContext(context);
    this.setOffset(x,y);
    this.width = 800;
    this.height = 600;
    this.graphicEntityStack = [];
    this.selectedGraphic = null;
}

CanvasHandler.prototype.setContext = function(context)
{   
    this.context = context;
};

CanvasHandler.prototype.setOffset = function(left,top)
{
   this.offsetLeft = left;
   this.offsetTop = top;
};

CanvasHandler.prototype.clear = function()
{
    if (surface !== undefined) 
  {
        this.context.drawImage(this.surface, 0,0,800,600);
    }
    else 
    {
        this.context.fillStyle = '#000';
        this.context.fillRect(0,0,this.width,this.height);
    }
};

CanvasHandler.prototype.repaint = function()
{
    this.clear();
    var i;
    for (i=0; i < this.graphicEntityStack.length; i++)
    {
        square = this.graphicEntityStack[i];
        square.paint(this.context);
    }
};

CanvasHandler.prototype.addSquare = function(identifier,x,y)
{
    square = new Card(identifier,x,y);
    this.graphicEntityStack.push(square);
};

CanvasHandler.prototype.addLibrary = function(identifier,x,y)
{
	library = new Library(identifier,x,y,this);
	this.graphicEntityStack.push(library);
};

CanvasHandler.prototype.fabricateCardInPlay = function() {
	this.addSquare(500, this.mouseX, this.mouseY);
	//this.selectSquare(this.graphicEntityStack.length);
};

CanvasHandler.prototype.getItemClicked = function(x,y) 
{
	var i;
    for (i=this.graphicEntityStack.length-1; i > -1; i--)
    {
        square = this.graphicEntityStack[i];
        if (square.isClicked(x,y))
        {
            return i;
        }
    }
    return -1;
};

CanvasHandler.prototype.selectSquare = function(index)
{
    if (index > -1) 
    {
        square = this.graphicEntityStack[index];
        this.graphicEntityStack.splice(index,1);
        arrayLength = this.graphicEntityStack.push(square);
        this.selectedGraphic = this.graphicEntityStack[arrayLength - 1];
    }   
};

CanvasHandler.prototype.isItemSelected = function() 
{
    if (this.selectedGraphic !== null) {
        return true;
    }
    return false;
};

CanvasHandler.prototype.canvasMouseDown = function(event)
{
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;
    this.mouseX = x;
    this.mouseY = y;
    squareClicked = this.getItemClicked(x,y);
    this.selectSquare(squareClicked);
    this.repaint();
};

CanvasHandler.prototype.canvasMouseMove = function(event)
{
    if (this.isItemSelected())
    {
        currentX = event.pageX - this.offsetLeft;
        currentY = event.pageY - this.offsetTop;
        dX = currentX - this.mouseX;
        dY = currentY - this.mouseY;
        this.mouseX = currentX;
        this.mouseY = currentY;
        this.selectedGraphic.moveX(dX);
        this.selectedGraphic.moveY(dY);
        this.repaint();
	//log("Sent : ",this.selectedGraphic.x,this.selectedGraphic.y);
	updatePosition(this.selectedGraphic.uniqueIdentifier,this.selectedGraphic.x,this.selectedGraphic.y);
    }
};

CanvasHandler.prototype.getGraphicElementByUniqueId = function(uniqueIdentifier)
{
    var i;
    for (i=0; i < this.graphicEntityStack.length; i++)
    {
        if(this.graphicEntityStack[i].uniqueIdentifier === uniqueIdentifier) {
            return this.graphicEntityStack[i];
        }
    }
    return null;
};

CanvasHandler.prototype.setNewGraphicPosition = function(index, x, y)
{
    
    localSelectedGraphic = this.getGraphicElementByUniqueId(index);
    if (this.selectedGraphic !== null && this.selectedGraphic !== undefined && this.selectedGraphic.uniqueIdentifier === index)
    {
//	log('not moving!');
	return;
    }
    if (localSelectedGraphic !== null) {
	if (localSelectedGraphic.x !== x || localSelectedGraphic.y !== y) {
	    localSelectedGraphic.setX(x);
	    localSelectedGraphic.setY(y);
	    this.repaint();
	}
    }
};

CanvasHandler.prototype.setNewGraphicRotation = function(index,isTapped)
{
    localSelectedGraphic = this.getGraphicElementByUniqueId(index);
    if (this.selectedGraphic !== null && this.selectedGraphic !== undefined && this.selectedGraphic.uniqueIdentifier === index)
    {
//	log('not moving!');
	return;
    }
    if (localSelectedGraphic !== null) {
	if (isTapped === 0) {
	    localSelectedGraphic.setRotated(false);
	} else {
	    localSelectedGraphic.setRotated(true);
	}
	this.repaint();
    }
};

CanvasHandler.prototype.canvasDoubleClick = function(event)
{
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;
    var item = this.getItemClicked(x,y);
    if (item !== -1)
    {   
        this.graphicEntityStack[item].toggleTap();
	updateTap(this.graphicEntityStack[item].uniqueIdentifier,this.graphicEntityStack[item].isRotated);
        this.repaint();
    }
};

CanvasHandler.prototype.canvasMouseUp = function(event)
{
     this.selectedGraphic = null;
};

CanvasHandler.prototype.setSurface = function(surface)
{
    this.surface = surface;
    this.repaint();
};

