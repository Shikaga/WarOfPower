CardTest = TestCase("CardTest");

CardTest.prototype.setup = function() {
	//runs before each test
};

CardTest.prototype.teardown = function() {
	//runs after each test to clean up
};

CardTest.prototype.testCreateCardWithNameAndDescription = function() {
	var card = new Card(1,0,0,"Card Name","This is an Example Card");
	assertEquals("Card Name", card.name);
};