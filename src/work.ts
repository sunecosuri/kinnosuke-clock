import puppeteer from 'puppeteer';

export default class Work {

  constructor(values?: any) {
    if (values) {
      this.companyID = values.company_ID
      this.userID = values.user_ID
      this.password = values.password
      delete values.user_ID
      delete values.company_ID
      delete values.password
    }
  }

  private companyID = ''
  private userID = ''
  private password = ''
  private domain = 'www.4628.jp'

  private async login(): Promise<{ browser: puppeteer.Browser, page: puppeteer.Page }> {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(`https://${this.domain}`);

      await page.focus('input[name=y_companycd]');
      await page.type('input[name=y_companycd]', this.companyID);

      await page.focus('input[name=y_logincd]');
      await page.type('input[name=y_logincd]', this.userID);

      await page.focus('input[name=password]');
      await page.type('input[name=password]', this.password);
      await page.screenshot({ path: 'sample3.png' });

      return { browser, page }
    } catch (e) {
      console.error(e)
    }
  }

  public async start() {
    // const { browser, page } = await this.login();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://${this.domain}`, { waitUntil: 'networkidle2' });

    await page.focus('input[name=y_companycd]');
    await page.type('input[name=y_companycd]', this.companyID);

    await page.focus('input[name=y_logincd]');
    await page.type('input[name=y_logincd]', this.userID);

    await page.focus('input[name=password]');
    await page.type('input[name=password]', this.password);
    await page.screenshot({ path: 'sample3.png' });

    const inputElement = await page.$('input[name="Submit"]');
    await inputElement.click();
    await page.screenshot({ path: 'sample4.png' });
    await page.waitFor(5000);
    await page.screenshot({ path: 'sample.png' });
    browser.close();
  }
}
