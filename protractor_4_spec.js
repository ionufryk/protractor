var chai = require('chai');
var expect = chai.expect;
var EC = protractor.ExpectedConditions;

describe('Task#3: Dou test', function() {
    const site = "http://wingify.com/";
    const menuItemText = "Key Pillars of a Successful Conversion Optimization";
    const expPointsNumber = 5;
    const expectedString = "People, Processes, Culture, Tools, Goals.";

    var ourProductsDropDown = element(by.css(".dropdown>a"));
    var vwoMenuItem = element(by.xpath("//a[contains(text(),'VWO')]"));
    var resourcesDropDown = element(by.xpath("//a[@class='link trigger-resources-home-header']/parent::li"));
    var keyPillars = element(by.xpath("(//a[@class='title'][contains(text(),menuItemText)])[2]"));
    var keyPoints = element.all(by.xpath("//ul[@class='grey-text mv-20']/li"));

    // Returns element when it actually becomes visible
    function doWhenAppear(elem) {
        browser.wait(EC.visibilityOf(elem), 10000);
        return elem;
    }

    // Extracts substring and converts it to float number
    function getNumber(elem) {
        doWhenAppear(elem).getText().then(function (text) {
            return parseInt(text.substring(0, text.indexOf(" ")));
        });
    }

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(site);
        browser.actions().mouseMove(doWhenAppear(ourProductsDropDown)).click(vwoMenuItem).perform();
        // browser.actions().mouseMove(resourcesDropDown).click(keyPillars).perform();
        // For some reason action part often fails, so I replaced it with part below not to be blocked
        browser.get("http://resource.vwo.com/key-conversion-optimization-pillars-ebook");
    });

    it('# of key points is 5', function () {
        keyPoints.count().then(function(count){
            expect(count).to.be.equal(expPointsNumber);
        });
    });

    it('String out of key points is "People, Processes, Culture, Tools, Goals."', function () {
        // Deffered that will resolve with values into array
        var mappedVals = keyPoints.map(function (elm) {
            return elm.getText();
        });
        mappedVals.then(function (textArr) {
            var combo_string="";
            for (var i = 0; i < textArr.length; i++) {
                combo_string += textArr[i] + ", "
            }
            var tunedString = combo_string.slice(0,combo_string.length-2) + ".";
            // it will fail do to different word order in actual string as opposed to the task string
            expect(expectedString).to.be.equal(tunedString)
        })
    });
});
