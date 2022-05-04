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

  @HostListener('window:resize')
  calculateRows() {
    this.rows = Math.floor(
      (this.img?.nativeElement.offsetHeight * 1.05) /
        (this.rowHeight + this.gutterSize)
    );
  }

  tagClicked(target: string): void {
    console.log('cliked#1');
    this.tagClickedEvent.next(target);
  }
}
