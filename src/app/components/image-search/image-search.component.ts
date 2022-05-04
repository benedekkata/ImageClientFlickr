import { FlickrImage } from 'src/app/models/flickrImage.type';
import { Image } from './../../models/image.type';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { FormControl } from '@angular/forms';
import { POSSIBLE_LANGUAGES } from 'src/app/constants';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-image-search',
  templateUrl: './image-search.component.html',
  styleUrls: ['./image-search.component.scss'],
})
export class ImageSearchComponent implements OnInit {
  constructor(
    private imageService: ImageService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getImages();
    this.keyword = this.storageService.loadKeyword();
    this.selected = this.storageService.loadLang();
    this.languages = POSSIBLE_LANGUAGES;
  }

  images: Image[] = [];
  keyword: string = '';
  selected: string = '';
  languages: string[] = [];

  getImages() {
    this.imageService
      .getImagesByKeywordAndLanguage(this.keyword, this.selected)
      .subscribe((images) => {
        if (images) {
          const fimages = images as FlickrImage;
          this.images = fimages.items;
          this.images.forEach((img: Image) => {
            //cut and save the last paragraph only
            const paragraph = /<p>(.*?)<\/p>/gi;
            const matches = [...img.description.matchAll(paragraph)];
            if (matches.length !== 0) {
              img.description = matches[2] ? matches[2][1] : '';
            }
            const usernameRegex = /\"(.*?)\"/gi;
            const usernameMatches = img.author.match(usernameRegex);

            img.author = usernameMatches ? usernameMatches[0] : '';
          });
          this.images = this.images.filter(
            (image) => image.author_id !== '193744073@N04'
          );
          this.storageService.saveLastSearchResult(fimages);
          this.storageService.saveLastKeyword(this.keyword);
          this.storageService.saveLang(this.selected);
        }
      });
  }

  changeKeyword(newValue: string) {
    this.keyword = newValue;
    this.getImages();
  }
}
