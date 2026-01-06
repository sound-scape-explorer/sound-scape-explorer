import {ThemeView} from 'src/renderer/views/theme-view';

export class ThemeController {
  private view: ThemeView;

  public constructor() {
    this.view = new ThemeView();
  }

  public render() {
    const isSystemDarkMode = this.getSystemDarkMode();

    if (isSystemDarkMode) {
      this.view.darken();
      return;
    }

    this.view.lighten();
  }

  private getSystemDarkMode() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    return media.matches;
  }
}
