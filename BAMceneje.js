// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

/**
 * @fileoverview An example WebDriver script.
 *
 * Before running this script, ensure that Mozilla's geckodriver is present on
 * your system PATH: <https://github.com/mozilla/geckodriver/releases>
 *
 * Usage:
 *   // Default behavior
 *   node selenium-webdriver/example/google_search.js
 *
 *   // Target Chrome locally; the chromedriver must be on your PATH
 *   SELENIUM_BROWSER=chrome node selenium-webdriver/example/google_search.js
 *
 *   // Use a local copy of the standalone Selenium server
 *   SELENIUM_SERVER_JAR=/path/to/selenium-server-standalone.jar \
 *     node selenium-webdriver/example/google_search.js
 *
 *   // Target a remote Selenium server
 *   SELENIUM_REMOTE_URL=http://www.example.com:4444/wd/hub \
 *     node selenium-webdriver/example/google_search.js
 */
// class content:h3 - name of device
// class content:p:b - price


const {Builder, By, until} = require('..');

var driver = new Builder()
    .forBrowser('chrome')
    .build();
var firstPage = 'https://www.ceneje.si/L3/229/hlajenje-in-gretje/ugodna-bivalna-klima/klimatske-naprave'
    var arrayOfAllProducts = [];
    var lastPage;
// funkcija nam vrne število vseh strani, ki jih želimo prebrskati
var giveMeNumberOfAllPages = async function(driver, firstPage) {
  driver.get(firstPage)
  var numberOfPages = await driver.findElements(By.css('.openSearchByUrl'))
  var arrayNumberOfPages= [];
  for (var i = 0; i < numberOfPages.length; i++) {
    arrayNumberOfPages[i] = await numberOfPages[i].getText()
  }
  return Number(arrayNumberOfPages[5]);
};


driver.get(firstPage)
    // dobim produkte iz ene strani
    .then(async function(_) {
      // najde vse elemenete s class-om .productBoxGrid in jih stavi v array
      var allElements = await driver.findElements(By.css('.content'))
      var productName;
      var price;
      for (var i = 0; i < allElements.length; i++) {
        var productObj = {};
        productName = await allElements[i].findElement(By.tagName('h3')).getText()
        price = await allElements[i].findElement(By.tagName('b')).getText()
        productObj.Price = price
        productObj.Name = productName
        arrayOfAllProducts.push(productObj);
      }
      //console.log(arrayOfAllProducts);

      // zapre stran
      //driver.quit()
    })
    //dobim link od naslednje strani
    .then(async function(_){
      try {
        var nextPage = await driver.findElement(By.css('.last')).getAttribute('href')
      } catch (error) {
        console.log('KONČANO' + error);
      }
      driver.get(nextPage)
    })

async function narediNo() {
  var lastPage = await giveMeNumberOfAllPages(driver, firstPage)
  console.log(lastPage);
}

narediNo();
