const constant = require('../util/constant');
var protractor = require('protractor');
var browser = protractor.browser;
var by = protractor.by;
var until = protractor.ExpectedConditions;
var element = protractor.element;
var constantValues = new constant();

class Browser {
    waitUntilPresenceOf(elmt) {
        browser.wait(until.presenceOf(element(elmt)), 15000, `${elmt} - Element taking too long to appear in the DOM structure.`);
    }

    waitUntilElementIsClickable(elmt) {
        browser.wait(until.elementToBeClickable(element(elmt)), 15000, `${elmt} - Element taking too long to be ready to be clicked.`);
    }

    waitForVisibility(elmt) {
        browser.wait(until.visibilityOf(element(elmt)), 15000, `${elmt} - Element taking too long to be visible.`);
    }

    waitForInVisibility(elmt) {
        browser.wait(until.invisibilityOf(element(elmt)), 15000, `${elmt} - Element taking too long to load.`);
    }

    waitForInVisibilityOfIndexedElement(elmt, index) {
        return element.all(elmt).then(function (items) {
            return browser.wait(until.invisibilityOf(items[index]), 15000, `${elmt} - Index Element taking too long to load.`);
        });
    }
    waitForInVisibilityOfLastElement(elmt) {
        return browser.wait(until.invisibilityOf(this.getLastElement(elmt)), 15000, `${elmt} - Last Element taking too long to load.`);
    }

    waitForInVisibilityOfFirstElement(elmt) {
        return browser.wait(until.invisibilityOf(this.getFirstElement(elmt)), 15000, `${elmt} - First Element taking too long to load.`);
    }

    waitForVisibilityOfLastElement(elmt) {
        return browser.wait(until.visibilityOf(this.getLastElement(elmt)), 15000, `${elmt} - Last Element taking too long to be visible.`);
    }

    waitForVisibilityOfFirstElement(elmt) {
        return browser.wait(until.visibilityOf(this.getFirstElement(elmt)), 15000, `${elmt} - First Element taking too long to be visible.`);
    }

    waitForAngular() {
        browser.waitForAngular();
    }

    waitForTextToBePresentInElementValue(elmt, text) {
        return browser.wait(until.textToBePresentInElementValue($(elmt), text), 15000);
    }

    waitUntilCountChanges(elmt, count) {
        var e = element.all(elmt);
        var result =  e.count().then(function (elementCount) {
            return elementCount == count;
        });
        return browser.wait(result);
    }

    verifyTextOfAllElements(elmt, textToContain) {
        var result = [];
        element.all(elmt).each(function (element) {
            element.getText().then(function (text) {
                result.push(text);
                expect(result).toContain(textToContain);
            });
        });
    }

    getMapOfAllElements(elmt, expectedValue) {
        let items = element.all(elmt).map(function(elm, index) {
            return {
              index: index,
              text: elm.getText()
            };
          });
        expect(items).toEqual(expectedValue);
    }

    getAllElement(elmt) {
        return element.all(elmt);
    }

    getSizeOfAllElements(elmt) {
        return element.all(elmt).then(function(items) {
            return items.length;
          });
    }
    
    getFirstElement(elmt) {
        return this.getAllElement(elmt).first();
    }

    getLastElement(elmt) {
        return this.getAllElement(elmt).last();
    }

    performActionOnIndexElement(elmt, property, index = 0) {
        let result;
        var items = element.all(elmt);
        switch (property) {
            case constantValues.actionWithElements.CLICK:
                items.get(index).click();
                break;
            case constantValues.actionWithElements.GET_TEXT:
                result = items.get(index).getText();
                break;
            case constantValues.actionWithElements.IS_DISPLAYED:
                result = items.get(index).isDisplayed();
                break;
            case constantValues.actionWithElements.COUNT:
                result = items.length;
                break;
            default:
                throw new Error('Please provide property correctly.');
        }
        return result;
    }

    getLink(text) { return by.linkText(`${text}`); }

    clickElement(elmt) {
        this.waitForVisibility(elmt);
        this.waitUntilElementIsClickable(elmt);
        this.highlightElement(element(elmt));
        element(elmt).click();
    }

    verifyIfElementIsDisplayed(elmt) {
        this.waitUntilPresenceOf(elmt);
        return expect(element(elmt).isDisplayed()).toBe(true) ? true : false;
    }

    verifyIfElementIsNotDisplayed(elmt) {
        return expect(element(elmt).isDisplayed()).toBe(false) ? true : false;
    }

    verifyIfElementIsPresent(elmt) {
        return expect(element(elmt).isPresent()).toBe(true) ? true : false;
    }

    verifyIfElementIsNotPresent(elmt) {
        return expect(element(elmt).isPresent()).toBe(false) ? true : false;
    }

    verifyIfTextIsDisplayed(text, elmt = by.xpath('//body')) {
        this.waitUntilPresenceOf(elmt);
        return expect(element(elmt).getText()).toContain(text) ? true : false;
    }

    enterText(elmt, text) {
        this.waitForVisibility(elmt);
        element(elmt).sendKeys(text);
    }

    clearFieldAndEnterText(elmt, text) {
        this.waitForVisibility(elmt);
        element(elmt).clear().then(() => {
            element(elmt).sendKeys(text);
        });
    }

    verifyIfTextMatches(elmt, text) {
        this.waitForVisibility(elmt);
        return expect(element(elmt).getText()).toEqual(text) ? true : false;
    }

    verifyIfTextContains(elmt, text) {
        this.waitForVisibility(elmt);
        return expect(element(elmt).getText()).toContain(text) ? true : false;
    }

    selectLinkFromDropDown(dropdown, textToSelect) {
        var linkToSelect = this.getLink(textToSelect);
        this.clickElement(dropdown);
        this.waitUntilPresenceOf(linkToSelect);
        this.clickElement(linkToSelect);
    }

    pauseFor(miliseconds) {
        browser.sleep(miliseconds);
    }

    scrollTo(position) {
        browser.executeScript(`window.scrollTo(0,${position});`);
    }

    moveMouseToElement(elmt) {
        browser.actions().mouseMove(element(elmt)).perform();
    }

    moveMouseToLastElement(elmt) {
        browser.actions().mouseMove(element.all(elmt).last()).perform();
    }

    moveMouseToIndexElement(elmt, index) {
        browser.actions().mouseMove(element.all(elmt).get(index)).perform();
    }

    moveMouseToElementAndClick(elmt) {
        this.waitUntilPresenceOf(elmt);
        this.waitUntilElementIsClickable(elmt);
        let elementToBeClicked = element(elmt);
        browser.actions().mouseMove(elementToBeClicked).click().perform();
    }

    getCurrentURL() {
        return browser.getCurrentUrl();
    }

    getTextLocator(tag, text) {
        return by.xpath(`//${tag}[text()="${text}"]`);
    }

    highlightElement(elmt) {
        return browser.driver.executeScript('arguments[0].setAttribute(\'style\', arguments[1]);', elmt.getWebElement(), 'border: 1.5px dotted red;').
            then(() => {
                this.pauseFor(200);
                return elmt;
            }, (err) => {
                throw new Error('Error occurred while highlighting element', err);
            });
    }

    selectAll(elmt) {
        element.all(elmt).then(function (items) {
            items.forEach(element => {
                element.click();
            });
        });
    }
    acceptAlert() {
        browser.switchTo().alert().accept();
    }
    dismissAlert() {
        browser.switchTo().alert().dismiss();
    }
    getAlertText() {
        return browser.switchTo().alert().getText();
    }

    dragMouseFromOneElementToAnother(fromElement, toElement) {
        browser.actions().
            dragAndDrop(element(fromElement), element(toElement)).
            perform();
    }

    verifyAttributeValue(elmt, attribute, valueToMatch) {
        var webElement = element(elmt);
        return expect(webElement.getAttribute(attribute)).toContain(valueToMatch);
    }

    verifyTextOfItemsInList(dropdownElement, dropdownMenuElement, listToMatch) {
        var dataToMatch = Array.from(listToMatch);
        this.clickElement(dropdownElement);
        var filterMenu = this.getAllElement(dropdownMenuElement);
        for (var i = 0; i < filterMenu.length; i++) {
            expect(filterMenu.get(i).getText()).toEqual(dataToMatch[i]);
        }
    }

    getText(elmt) {
        this.waitForVisibility(elmt);
        return element(elmt).getText().then(function(name) {
            return name;
          });
    }

    verifyIfElementIsEnabled(elmt) {
        let result;
        element(elmt).isEnabled() ? result = true : result = false;
        return result;
    }

    async waitUntilAttributeValueHas(elmt, attrName, attrVal) {
        var webElement = element(elmt);
        const hasAttr = async () => {
          const actualText = await webElement.getAttribute(attrName);
          return actualText.indexOf(attrVal) !== -1;
        };
    
        return await browser.wait(until.presenceOf(webElement), await hasAttr());
    }

    getAllTexts(elmt) {
        return element.all(elmt).map(function(item){
           return item.getText();
        });
    }

    async getTextValuesInArray(elmt) {
        var values = [];
        return element.all(elmt).each(async (element) => {
            return element.getText().then(async (text) => {
                if (text != '') {
                    await values.push(text);
                }
            });
        }).then(() => {
            return values;
        });
    }

    async getColumnValuesInArray(page, data) {
        var values = [];
        return element.all(page.columnCell(data.index + 1)).each(async (element) => {
            return element.getText().then(async (text) => {
                if (text != '') {
                    switch (data.name) {
                        case (constantValues.getValueOf.FLOOR).toLowerCase():
                            text = Number((text.split('-')[0]).split(' ')[1]);
                            break;
                    
                        default:
                            throw new Error(`${data.name} is not a proper case.`);
                    }
                    await values.push(text);
                }
            });
        }).then(() => {
            return values;
        });
    }

    switchToFrame(elmt) {
        browser.switchTo().frame(element(elmt).getWebElement());
    }

    refresh() {
        browser.refresh();
    }

    verifyIfElementIsDisabled(elmt) {
        return expect(element(elmt).isEnabled()).toBe(false);
    }

    getValueOfElement(elmt) {
        this.waitUntilPresenceOf(elmt);
        return element(elmt).getAttribute('value');
    }

    getAttributeValueOfLastElement(elmt, valueToFetch) {
        this.waitUntilPresenceOf(elmt);
        return element.all(elmt).last().getAttribute(valueToFetch);
    }

    performClickOnAllElements(elmt) {
        element.all(elmt).each(function (element) {
            element.click();
        });
    }

    async getHeightOfLongestAlertsBar(elmt) {
        const totalBarCount = await this.getAllElement(elmt).count();
        if (totalBarCount > 0) {
          var allBarsIngraph = this.getAllElement(elmt);
          var heights = [];
          for (let index = 0; index < totalBarCount; index++) {
            await allBarsIngraph.get(index).getAttribute(constant.attributes.HEIGHT).then((barHeight) => {
              heights.push(barHeight);
            });
          }
          const tallestBarInGraph = Math.max(...heights);
          return tallestBarInGraph;
        } else {
          throw new Error('No bars shown in graph to verify.');
        }
      }
}
module.exports = Browser;
