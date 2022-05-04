import { FlickrImage } from 'src/app/models/flickrImage.type';
import { Image } from './../../models/image.type';
import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { BANNED_USER, POSSIBLE_LANGUAGES } from 'src/app/constants';
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

  /**
   * Calls the imageService.getImagesByKeywordAndLanguage function to get the images for the current user.
   * If the request is successfull it calls saving functions of the service.
   */
  getImages() {
    this.imageService
      .getImagesByKeywordAndLanguage(this.keyword, this.selected)
      .subscribe((fimages) => {
        if (fimages) {
          this.images = fimages.items;
          this.processImages();
          this.removeBannedUser();

          //The request was successful, saving the resonse to the local storeage
          this.storageService.saveLastSearchResult(fimages);
          this.storageService.saveLastKeyword(this.keyword);
          this.storageService.saveLang(this.selected);
        }
      });
  }

  /**
   * Sets the value for the keyword, then reloads the images.
   * @param newValue the new value for the keyword
   */
  changeKeyword(newValue: string) {
    this.keyword = newValue;
    this.getImages();
  }

  /**
   * Processes the data to be suitable for rendering.
   */
  private processImages() {
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
  }

  /**
   * Removes BANNED_USER's images (18+ without any flag)
   */
  private removeBannedUser() {
    this.images = this.images.filter(
      (image) => image.author_id !== BANNED_USER
    );
  }
}
