import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Image } from './../../models/image.type';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: [],
})
export class ImageGridComponent implements OnInit, OnDestroy {
  @Input() images: Image[] = [];
  @Input() cols: number = 4;
  @Input('cols.xs') cols_xs: string = '1';
  @Input('cols.sm') cols_sm: string = '2';
  @Input('cols.md') cols_md: string = '3';
  @Input('cols.lg') cols_lg: string = '4';
  @Input('cols.xl') cols_xl: string = '6';
  @Input() rowHeight: number = 4;
  @Input() gutterSize: number = 1;
  @Output() keywordChangeEvent = new EventEmitter<string>();

  mediaWatcher: Subscription = new Subscription();

  constructor(private media: MediaObserver) {}

  callParentKeywordChange(newVal: string): void {
    this.keywordChangeEvent.next(newVal);
  }

  ngOnInit() {
    this.mediaWatcher = this.media.asObservable().subscribe((change) => {
      change.forEach((item) => {
        switch (item.mqAlias) {
          case 'xs':
            this.cols = parseInt(this.cols_xs);
            break;
          case 'sm':
            this.cols = parseInt(this.cols_sm);
            break;
          case 'md':
            this.cols = parseInt(this.cols_md);
            break;
          case 'lg':
            this.cols = parseInt(this.cols_lg);
            break;
          case 'xl':
            this.cols = parseInt(this.cols_xl);
            break;
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.mediaWatcher.unsubscribe();
  }
}
