import {CLASSES} from 'src/renderer/constants';

export abstract class AbstractStatusView {
  private readonly node: HTMLSpanElement;

  protected constructor(node: HTMLSpanElement) {
    this.node = node;
  }

  protected renderWarning() {
    this.node.classList.remove(CLASSES.SUCCESS);
    this.node.classList.remove(CLASSES.DANGER);
    this.node.classList.add(CLASSES.WARNING);
  }

  protected renderError() {
    this.node.classList.remove(CLASSES.SUCCESS);
    this.node.classList.remove(CLASSES.WARNING);
    this.node.classList.add(CLASSES.DANGER);
  }

  protected renderSuccess() {
    this.node.classList.remove(CLASSES.DANGER);
    this.node.classList.remove(CLASSES.WARNING);
    this.node.classList.add(CLASSES.SUCCESS);
  }
}
