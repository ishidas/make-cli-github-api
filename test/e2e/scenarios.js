describe('e2e testing on my homepage', function(){

  beforeEach(function(){
    browser.get('http://127.0.0.1:8080/');

  });

  it('should have a correct title', function(){
    expect(browser.getTitle()).toEqual('Github API')
  });
  it('should')

});
