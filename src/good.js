  function renderPageWithSetupsAndTeardowns(pageData, isSuite) {
    const isTestPage = pageData.hasAttribute("Test");
    if (isTestPage) {
      const testPage = pageData.getWikiPage();
      let newPageContent = new StringBuffer();
      newPageContent = concat(newPageContent, includeSetupPages(testPage, isSuite);
      newPageContent.append(pageData.getContent());
      includeTeardownPages(testPage, newPageContent, isSuite);
      pageData.setContent(newPageContent.toString());
    }
    return pageData.getHtml();
  }
