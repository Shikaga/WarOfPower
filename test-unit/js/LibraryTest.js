LibraryTest = TestCase("LibraryTest");

LibraryTest.prototype.setup = function() {
	//runs before each test
};

LibraryTest.prototype.teardown = function() {
	//runs after each test to clean up
};

LibraryTest.prototype.testCardsAddedToTopOfLibrary = function() {
	var library = new Library();
	assertEquals(0,library.numberOfCardsInLibrary());
	var firstCard = new Card(1,0,0,"Name","Description");
	library.placeOnTop(firstCard);
	assertEquals(1,library.numberOfCardsInLibrary());
	var topCard = library.lookAtCardOnTop();
	assertTrue(topCard === firstCard);
};