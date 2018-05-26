import puppeteer from 'puppeteer';

export default class Work {
  constructor(values?: any) {
    if (values && values.dataValues) {
      values = values.dataValues
      values.projectID = values.id
      values.projectCreatedAt = values.createdAt
      delete values.id
      delete values.createdAt
      delete values.updatedAt
    }
  }

  private companyID = 'paperboy'
  private userID = '0460'
  private password = 'Gii3oso3'

  private async login(): Promise<{ browser: puppeteer.Browser, page: puppeteer.Page }> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const domain = 'www.4628.jp'
    await page.goto(`https://${domain}`);

    await page.focus('input[name=y_companycd]');
    await page.type('input[name=y_companycd]', this.companyID);

    await page.focus('input[name=y_logincd]');
    await page.type('input[name=y_logincd]', this.userID);

    await page.focus('input[name=password]');
    await page.type('input[name=password]', this.password);

    const inputElement = await page.$('input[type=submit]');
    await inputElement.click();
    await page.waitFor(2000);

    return { browser, page }
  }

  public async start() {
    const { browser, page } = await this.login();
    await page.screenshot({ path: 'sample.png' });
    browser.close();
  }
}
