/*
 * Loads the htmlfile activeX control for streaming data using same method as type 5 but
 * here the data is streamed into the activex html control rather than directly into the iframe
 * this prevents IE from showing the working indicator
 */
/** @private */
SL4B_StreamingType6HTMLFile = new function() 
{
	var _transferDoc = null;
	this.m_bDomainSet = false;
	
	this.onunload = function()
	{
		_transferDoc = null;
    	CollectGarbage();
	} 
	
	this.loaded = function() 
	{
		this.setDomain();

		var l_bIsSetResponseHttpRequest = false;
		
		if(!window.parent.SL4B_WindowRegistrar)
		{
			l_bIsSetResponseHttpRequest = true;
		}else if (window.parent.SL4B_WindowRegistrar && window.parent.SL4B_WindowRegistrar.isMaster())
		{
			l_bIsSetResponseHttpRequest = true;
		}
			
		if (l_bIsSetResponseHttpRequest) 
		{
			try 
			{
				var sParameter = this.getParameter("uniqueid");
				window.parent.SL4B_ConnectionProxy.getInstance().setResponseHttpRequest(null, sParameter);
			} 
			catch (e) 
			{
				this.handleResponseHttpRequestError(e, sParameter);
			}
			
			// see http://cometdaily.com/2007/11/18/ie-activexhtmlfile-transport-part-ii/ for information on htmlfile xml for streaming
			
			_transferDoc = new ActiveXObject("htmlfile");
			_transferDoc.open();
			_transferDoc.write("<html><scr" + "ipt>" +
			"document.domain='" +
			document.domain +
			"';" +
			"</scr" +
			"ipt></html>");
			_transferDoc.close();
			var ifrDiv = _transferDoc.createElement("div");
			_transferDoc.body.appendChild(ifrDiv);
			
			_transferDoc.a = parent.a;
			_transferDoc.z = parent.z;
			
			ifrDiv.innerHTML = "<iframe src='" + "/RTTP-TYPE5?X-RTTP-Type5-Pad-Length=" + this.getParameter("X-RTTP-Type5-Pad-Length") + "&domain=" + document.domain + "&connectiontype=6'></iframe>";
			
			window.onunload = this.onunload;
		}
	};
	
	this.stop = function()
	{
		if (_transferDoc !== null) 
		{
			try
			{
				this._getIFrameFromTransferDoc().contentWindow.stop();
			}
			catch (e)
			{
				// ignore this, there is nothing we can do 
			}
		}
	};
	
	this._getIFrameFromTransferDoc = function()
	{
		return _transferDoc.body.firstChild.firstChild;
	};
	
	this.getParameter = function(l_sName) 
	{
		var l_oMatch = window.location.search.match(new RegExp("[?&]" + l_sName + "=([^&]*)"));
		return ((l_oMatch == null)?null:l_oMatch[1]);
	};
	
	this.setDomain = function () 
	{
		if (!this.m_bDomainSet)
		{
			var l_sCommonDomain = this.getParameter("domain");
			if (l_sCommonDomain != null)
			{
				this.m_bDomainSet = true;
				document.domain = l_sCommonDomain;
			}
		}
	};
	
	this.handleResponseHttpRequestError = function(e, sParameter)
	{
		var bParentClosed = window.parent ? window.parent.closed : "window.parent undefined";
		var bSL4BCP = window.parent ? window.parent.SL4B_ConnectionProxy : false;
		var bSL4BCPI = bSL4BCP ? window.parent.SL4B_ConnectionProxy.getInstance() : false;

		alert("failed to set setResponseHttpRequest \n" + e.toString() + "\n document.domain " + document.domain + "\n window.parent " + window.parent
				+ "\n parent window closed " + bParentClosed + "\n SL4B Connection Proxy " + bSL4BCP + "\n SL4B Connection Proxy Instance " + bSL4BCPI
				+ "\n Parameter " + sParameter);
	};

};

/** @private */
function stop()
{
	SL4B_StreamingType6HTMLFile.stop();
}

// the script file has now fully loaded, invoke the loaded method
SL4B_StreamingType6HTMLFile.loaded();
