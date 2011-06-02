var canvasHandler;
var CHAT_DIR = "/Examples/Contribution";

// The global chat object, starts null.
var g_oChatObj = null;

function ContribSubscriber() {
    this.initialise();
}
	
// Chat is a subclass of SL4B_AbstractSubscriber
ContribSubscriber.prototype = new SL4B_AbstractSubscriber();

/**
 * Ready is called after the SL4B library has finished initialising.
 * At this point we can create and request liberator objects.
 */
ContribSubscriber.prototype.ready = function() {
    // Subscribe ourselves to it so we are informed of changes.
    SL4B_Accessor.getRttpProvider().getObject(this, CHAT_DIR + "/" + this.sChatRoom, "User,Msg");
};

/**
 * Sends a message to the liberator by contributing an object with username and message.
 * @param {String} sMessage The message that you wish to send.
 */
ContribSubscriber.prototype.sendMessage = function(sMessage) {
    if (typeof(sMessage) !== "string") {
	throw new Error("The message to send must be a string.");
    }
    
    // create a new contribution field data object
    var l_oContributionData = new SL4B_ContributionFieldData();
    l_oContributionData.addField("User", this.sName);
    l_oContributionData.addField("Msg", sMessage);
    SL4B_Accessor.getRttpProvider().contribObject(this, CHAT_DIR + "/" + this.sChatRoom, l_oContributionData);
};

/**
 * contribOk is invoked by SL4B if a contribution was successful
 * @param {String} l_sObjectName The name of the object contributed.
 */
ContribSubscriber.prototype.contribOk = function(l_sObjectName) {
    // It worked, so that's good.
};

/** 
 * contribFailed is invoked by SL4B if a contribution failed.
 * @param {String} l_sObjectName The name of the object that you tried to contribute.
 * @param {String} l_sReason The reason that contribution failed.
 */
ContribSubscriber.prototype.contribFailed = function(l_sObjectName, l_sReason) {
    alert("Unable to send message\nReason: " + l_sReason);
};

ContribSubscriber.prototype.objectNotFound = function(l_sObjectName, l_sReason){
    alert("Requested object not found: " + l_sObjectName);
};

/**
 * recordMultiUpdated is called by SL4B when it receives changes from Liberator.
 * @param {String} sObjectName The name of the object that updated
 * @param {SL4B_RecordFieldData} oFieldData The fields and values that have updated.
 */
ContribSubscriber.prototype.recordMultiUpdated = function(sObjectName, oFieldData) {
    // SL4B delivers the messages as a list of numbered fields.
    //  This is a simple way to turn it into javascript slots on an object.
    //log(getKeys(sObjectName));
    var oMsg = { Usr:"", Msg: "" };
    var iFieldDataSize = oFieldData.size();
    for (var i = 0; i < iFieldDataSize; i = i + 1) {
	oMsg[oFieldData.getFieldName(i)] = oFieldData.getFieldValue(i);
    }
    var sMsgText = oMsg.Msg;
    var arguments = sMsgText.split(" ");
    if (arguments.length == 3) {
	canvasHandler.setNewGraphicPosition(arguments[0],arguments[1],arguments[2]);
    } else if (arguments.length == 2) {
	canvasHandler.setNewGraphicRotation(arguments[0],arguments[1]);
    }
};
function initCommunicationHandler() {
    g_oChatObj = new ContribSubscriber();
}

function updatePosition(index,x,y) {
    g_oChatObj.sendMessage(index+' '+x+' '+y);
}

function updateTap(index, isTapped)
{
    var tapped = 0;
    if (isTapped) tapped = 1;
    g_oChatObj.sendMessage(index+' '+tapped);
}

initCommunicationHandler();
