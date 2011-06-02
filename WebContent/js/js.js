function log() 
{
    var string = "";
    for (var i=0; i < arguments.length; i++)
    {
        string += arguments[i] + " ";
    }
    originalX = document.getElementById('log').innerHTML;
    document.getElementById('log').innerHTML = "<p>" + string + "</p>" + originalX;

}

function getKeys(obj){
    var keys = [];
    for(var key in obj){
        keys.push(key);
    }
   return keys;
};