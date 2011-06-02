var oConfiguration = SL4B_Accessor.getConfiguration();

oConfiguration.setAttribute("user", "demouser");
oConfiguration.setAttribute("password", "demopass");

/* We usually want the flash library to be loaded */
oConfiguration.setAttribute("enableflash", "true");

/* If we were serving these files from a webserver that was not also the liberator, we'd
 * also need to configure the liberator url here. */
oConfiguration.setAttribute("serverurl", "http://localvm.caplin.com:8080");

/* Allow all examples to share an SL4B connection */
oConfiguration.setAttribute("registrationwindowname", "test");
