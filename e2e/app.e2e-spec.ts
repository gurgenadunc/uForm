import { UformPage } from './app.po';

describe('uform App', () => {
  let page: UformPage;

  beforeEach(() => {
    page = new UformPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
