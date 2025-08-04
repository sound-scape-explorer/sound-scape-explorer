import {Check, createIcons, TriangleAlert} from 'lucide';
export class IconsController {
  public render() {
    createIcons({
      icons: {
        Check,
        TriangleAlert,
      },
      attrs: {
        width: 16,
        height: 16,
      },
    });
  }
}
