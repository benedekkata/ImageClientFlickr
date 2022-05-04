import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { Image } from '../../../models/image.type';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-grid-item',
  templateUrl: './image-grid-item.component.html',
  styleUrls: ['./image-grid-item.component.scss'],
})
export class ImageGridItemComponent {
  @Input() image: Image | undefined;
  @Input() rowHeight: number = 1;
  @Input() gutterSize: number = 1;
  @ViewChild('img') img: ElementRef | undefined;
  @Output() tagClickedEvent = new EventEmitter<string>();

  public rows: number = 0;

  /**
   * Calculates the row height for the responsiveness
   */
  @HostListener('window:resize')
  calculateRows() {
    this.rows = Math.floor(
      (this.img?.nativeElement.offsetHeight * 1.05) /
        (this.rowHeight + this.gutterSize)
    );
  }

  /**
   * Notifys the parent component of the click event.
   * @param target the value of the tag
   */
  tagClicked(target: string): void {
    this.tagClickedEvent.next(target);
  }
}
