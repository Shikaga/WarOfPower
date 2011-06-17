function log() 
{
    var string = "";
    var i;
    for (i=0; i < arguments.length; i++)
    {
        string += arguments[i] + " ";
    }
    originalX = document.getElementById('log').innerHTML;
    document.getElementById('log').innerHTML = "<p>" + string + "</p>" + originalX;

}

function getKeys(obj){
    var keys = [];
    var key;
        for(key in obj){
           if (obj.hasOwnProperty(key)) {
               keys.push(key);
           }
    }
    
   return keys;
}