var chai = require('chai');
var expect = chai.expect;
var EC = protractor.ExpectedConditions;

describe('Task#2: Stackexchange test', function() {
    var siteIcon = element.all(by.css(".site-icon"));
    var askUbuntu = element(by.xpath("//h2[text()='Ask Ubuntu']"));
    var visitSite = element(by.xpath("//a[text()='Visit Site'][@href='http://askubuntu.com']"));
    var searchInput = element(by.css("#search>input"));
    var postTag = element(by.xpath("(//a[text()='14.04'][@class='post-tag'])[1]"));
    var tagSpan = element(by.xpath("//span[@class='tm-sub-info']"));
    var topUsers = element(by.xpath("//a[text()='top users']"));
    var sevenDaysCount = element(by.xpath("(//td[@class='top-count'])[1]"));
    const limit = 60;
    const stringExpected = "131 followers, 21.3k questions";
    const site = "http://stackexchange.com/sites#";
    const searchString = "installed Ubuntu 14.04 not able to boot windows7";

    // Returns element when it actually becomes visible
    function doWhenAppear(elem){
        browser.wait(EC.visibilityOf(elem), 10000);
        return elem;
    }

    // Extracts substring and converts it to float number
    function getPercentage(text){
        return parseFloat(text.substring(0, 4));
        };

    beforeEach(function() {
        browser.ignoreSynchronization = true;
        browser.get(site);
        // Select all elements and filter required one
        element.all(by.css(".gv-item-collapsed-wrapper>h2")).filter(function(elem,index){
            return elem.getText().then(function(text){
                return text === "Ask Ubuntu";
            });
        }).first().click();

        doWhenAppear(visitSite).click();
        // Search for String from the task as long as it is not present in the initial list
        doWhenAppear(searchInput).sendKeys(searchString);
        // Hover the tag
        browser.actions().mouseMove(doWhenAppear(postTag)).perform();
    });

    it('tip header has text 131 followers, 21.3k questions', function() {
        doWhenAppear(tagSpan).getText().then(function(text){
            expect(text).to.equal(stringExpected);
        });
    });

    it('for the last 7 days the count of unanswered question is more than 60%', function() {
        // Click on top users
        doWhenAppear(topUsers).click();
        doWhenAppear(sevenDaysCount).getText().then(function(text){
            expect(getPercentage(text)).to.be.above(limit);
        });
    });
});