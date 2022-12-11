"use strict";

require("chromedriver");
const webdriver = require("selenium-webdriver");
const { By, Key, until } = require("selenium-webdriver");
const chai = require("chai");
const { assert, expect } = require("chai");
const { defaults } = require("modules");

describe("Cura test", () => {
  let driver;
  before(() => {
    driver = new webdriver.Builder().forBrowser("chrome").build();
  });
  after(async () => {
    // await driver.sleep(5000);
    await driver.quit();
  });
  it("Open CURA site", async () => {
    await driver.get("https://katalon-demo-cura.herokuapp.com/");
    const pageTitle = await driver.getTitle();
    assert.equal(pageTitle, "CURA Healthcare Service");
  });
  it('Click "Make Appointment" button', async () => {
    expect(await driver.getTitle()).to.contain("CURA Healthcare Service");
    const MakeAppointmentBtn = await driver.findElement(
      By.id("btn-make-appointment")
    );
    MakeAppointmentBtn.click();
    await driver.wait(
      until.elementLocated(By.xpath(`//*[@id="login"]/div/div/div[1]/p`))
    );
    const titleH2 = await driver
      .findElement(By.xpath(`//*[@id="login"]/div/div/div[1]/p`))
      .getText();
    assert.equal(titleH2, "Please login to make appointment.");
  });
  it('Enter "Username"', async () => {
    expect(
      await driver
        .findElement(By.xpath(`//*[@id="login"]/div/div/div[1]/p`))
        .getText()
    ).to.contain("Please");
    const usernameFeald = await driver.findElement(By.id("txt-username"));
    //usernameFeald.click();
    usernameFeald.sendKeys("John Doe");
    const passwordFeald = await driver.findElement(By.id("txt-password"));
    //passwordFeald.click();
    passwordFeald.sendKeys("ThisIsNotAPassword", Key.ENTER);
    await driver.wait(
      until.elementLocated(By.xpath(`//*[@id="appointment"]/div/div/div/h2`))
    );
    const titleH2 = await driver
      .findElement(By.xpath(`//*[@id="appointment"]/div/div/div/h2`))
      .getText();
    assert.equal(titleH2, "Make Appointment");
  });
  it("Make appointment", async () => {
    expect(
      await driver
        .findElement(By.xpath(`//*[@id="appointment"]/div/div/div/h2`))
        .getText()
    ).to.contain("Make Appointment");
    const facility = await driver.findElement(By.id("combo_facility"));
    facility.click();
    const hongkongFacility = await driver.findElement(
      By.xpath(`//*[@id="combo_facility"]/option[2]`)
    );
    hongkongFacility.click();
    const medicaidBtn = await driver.findElement(
      By.id("radio_program_medicaid")
    );
    medicaidBtn.click();
    const dateInput = await driver.findElement(By.id("txt_visit_date"));
    dateInput.click();
    dateInput.sendKeys("05/02/2022");
    const comentInput = await driver.findElement(By.id("txt_comment"));
    comentInput.click();
    comentInput.sendKeys("I NEEEEEEED HEEEEEEELP");
    const bookAppointmentBtn = await driver.findElement(
      By.id("btn-book-appointment")
    );
    bookAppointmentBtn.click();
    await driver.wait(
      until.elementLocated(By.xpath(`//*[@id="summary"]/div/div/div[1]/h2`))
    );
    const appoitmentH2 = await driver
      .findElement(By.xpath(`//*[@id="summary"]/div/div/div[1]/h2`))
      .getText();
    const appoitmentP = await driver
      .findElement(By.className("lead"))
      .getText();
    const facilityP = await driver.findElement(By.id("facility")).getText();
    const dateP = await driver.findElement(By.id("visit_date")).getText();
    assert.equal(appoitmentH2, "Appointment Confirmation");
    assert.equal(
      appoitmentP,
      "Please be informed that your appointment has been booked as following:"
    );
    assert.equal(facilityP, "Hongkong CURA Healthcare Center");
    assert.equal(dateP, "05/02/2022");
  });
  it("Go to Homepage", async () => {
    expect(
      await driver
        .findElement(By.xpath(`//*[@id="summary"]/div/div/div[7]/p/a`))
        .getText()
    ).to.contain("Go to Homepage");
    const homePageBtn = await driver.findElement(
      By.xpath(`//*[@id="summary"]/div/div/div[7]/p/a`)
    );
    homePageBtn.click();
    await driver.wait(until.elementLocated(By.xpath(`//*[@id="top"]/div/h3`)));
    const homepageH3 = await driver
      .findElement(By.xpath(`//*[@id="top"]/div/h3`))
      .getText();
    assert.equal(homepageH3, "We Care About Your Health");
  });
});
