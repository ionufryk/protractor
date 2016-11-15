var chai = require('chai');
var expect = chai.expect;
var EC = protractor.ExpectedConditions;

describe('Task#3: Dou test', function() {
    var repeaterLinks = element.all(by.xpath("//div[@class='num']/preceding::a[1]"));
    var vacancyNumberLabel = element(by.css(".b-inner-page-header>h1"));
    var vacancyNumberLinks = element.all(by.css(".vt"));
    const site = "https://jobs.dou.ua/";
    const attrToFind = "https://jobs.dou.ua/companies/cogniance/vacancies/?from=jobs-logo";

    // Returns element when it actually becomes visible
    function doWhenAppear(elem) {
        browser.wait(EC.visibilityOf(elem), 10000);
        return elem;
    }

    // Extracts substring before space and converts it to int number
    function getNumber(elem) {
        return doWhenAppear(elem).getText().then(function (text) {
            return parseInt(text.substring(0, text.indexOf(" ")));
        });
    }

    beforeEach(function () {
        browser.ignoreSynchronization = true;
        browser.get(site);
        // Select all elements and filter required one
        repeaterLinks.filter(function (elem, index) {
            return elem.getAttribute("href").then(function (attrValue) {
                return attrValue === attrToFind;
            });
        }).first().click();
    });

    it('# of links is equal to the # of vacancies in the label', function () {
        vacancyNumberLinks.count().then(function(count) {
            getNumber(vacancyNumberLabel).then(function(number){
                expect(number).to.be.equal(count)
            });
        });
    });
});