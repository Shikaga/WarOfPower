goog.require('InteractiveGraphicEntity');

var context;
var offsetLeft,offsetTop;
var width;
var height;
var graphicEntityStack;

var selectedGraphic;
var mouseX, mouseY;
var surface;

function setContext(context)
{   
    this.context = context;
}

function setOffset(left,top)
{
   this.offsetLeft = left;
   this.offsetTop = top;
}

function clear() 
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
}

function repaint()
{
    this.clear();
    for (var i=0; i < this.graphicEntityStack.length; i++)
    {
        square = this.graphicEntityStack[i];
        square.paint(this.context);
    }
}

function addSquare(identifier,x,y,width,height,color)
{
    square = new Card(identifier,x,y);
    this.graphicEntityStack.push(square);
}

function getItemClicked(x,y) 
{
    for (var i=this.graphicEntityStack.length-1; i > -1; i--)
    {
        square = this.graphicEntityStack[i];
        if (square.isClicked(x,y))
        {
            return i;
        }
    }
    return -1;
}

function selectSquare(index)
{
    if (index > -1) 
    {
        square = this.graphicEntityStack[index];
        this.graphicEntityStack.splice(index,1);
        arrayLength = this.graphicEntityStack.push(square);
        this.selectedGraphic = this.graphicEntityStack[arrayLength - 1];
    }   
}

function isItemSelected() 
{
    if (this.selectedGraphic !== null) {
        return true;
    }
    return false;
}

function canvasMouseDown(event)
{
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;
    this.mouseX = x;
    this.mouseY = y;
    squareClicked = this.getItemClicked(x,y);
    this.selectSquare(squareClicked);
    this.repaint();
}

function canvasMouseMove(event)
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
	updatePosition(this.selectedGraphic.uniqueIdentifier,this.selectedGraphic.x,this.selectedGraphic.y)
    }
}

function getGraphicElementByUniqueId(uniqueIdentifier)
{
    for (var i=0; i < this.graphicEntityStack.length; i++)
    {
        if(this.graphicEntityStack[i].uniqueIdentifier == uniqueIdentifier)
            return this.graphicEntityStack[i];
    }
    return null;
}

function setNewGraphicPosition(index, x, y)
{
    
    localSelectedGraphic = this.getGraphicElementByUniqueId(index);
    if (this.selectedGraphic !== null && this.selectedGraphic !== undefined && this.selectedGraphic.uniqueIdentifier == index)
    {
//	log('not moving!');
	return;
    }
    if (localSelectedGraphic !== null) {
	if (localSelectedGraphic.x != x || localSelectedGraphic.y != y) {
	    localSelectedGraphic.setX(x);
	    localSelectedGraphic.setY(y);
	    this.repaint();
	}
    }
}

function setNewGraphicRotation(index,isTapped)
{
    localSelectedGraphic = this.getGraphicElementByUniqueId(index);
    if (this.selectedGraphic !== null && this.selectedGraphic !== undefined && this.selectedGraphic.uniqueIdentifier == index)
    {
//	log('not moving!');
	return;
    }
    if (localSelectedGraphic !== null) {
	if (isTapped == 0)
	    localSelectedGraphic.setRotated(false);
	else
	    localSelectedGraphic.setRotated(true);
	this.repaint();
    }
}

function canvasDoubleClick(event)
{
    x = event.pageX - this.offsetLeft;
    y = event.pageY - this.offsetTop;
    var item = this.getItemClicked(x,y);
    if (item != -1)
    {   
        this.graphicEntityStack[item].toggleTap();
	updateTap(this.graphicEntityStack[item].uniqueIdentifier,this.graphicEntityStack[item].isRotated);
        this.repaint();
    }
}

function canvasMouseUp(event)
{
     this.selectedGraphic = null;
}

function setSurface(surface)
{
    this.surface = surface;
    this.repaint();
}

function CanvasHandler(context, x, y, width, height) 
{
    this.setContext = setContext;
    this.setOffset = setOffset;
    this.addSquare = addSquare;
    this.repaint = repaint;
    
    this.canvasMouseDown = canvasMouseDown;
    this.canvasMouseMove = canvasMouseMove;
    this.canvasMouseUp = canvasMouseUp;
    this.canvasDoubleClick = canvasDoubleClick;
    
    this.clear = clear;
    this.repaint = repaint;
    this.getItemClicked = getItemClicked;
    this.selectSquare = selectSquare;
    this.setSurface = setSurface;
    this.isItemSelected = isItemSelected;
    this.setNewGraphicPosition = setNewGraphicPosition;
    this.getGraphicElementByUniqueId = getGraphicElementByUniqueId;
    this.setNewGraphicRotation = setNewGraphicRotation;
    
    this.setContext(context);
    this.setOffset(x,y);
    this.width = 800;
    this.height = 600;
    this.graphicEntityStack = [];
    this.selectedGraphic = null;
}