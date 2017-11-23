gemini.suite('sidebar', (suite) => {
  suite.setUrl('/')
    .setCaptureElements('.sidebar')
    .before(function(actions, find) {
      this.button = find('.sidebar-toggle');
    })
    .capture('plain', function(actions, find) {
      actions.click(this.button);
      actions.waitForElementToShow('.sidebar', 2000);
    });
});

gemini.suite('sidebar toggle', (suite) => {
  suite.setUrl('/')
    // specifies CSS selectors of the elements that will be used to determine a region
    // of a web page to capture
    .setCaptureElements('.sidebar-toggle')
    .before(function(actions, find) {
      this.button = find('.sidebar-toggle');
    })
    // capture screenshot right after the page is loaded
    .capture('plain')
    .capture('pressed', function(actions, find) {
      actions.mouseDown(this.button);
    });
});
