describe('Protractor Demo App', function() {
  
    beforeEach(function() {
      browser.get('https://www.google.com/');
    });
  
    it('should have a title', function() {
      expect(browser.getTitle()).toEqual('Google');
    });
});