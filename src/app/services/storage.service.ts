import { FlickrImage } from 'src/app/models/flickrImage.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  public loadImages() {
    const imagesString = localStorage.getItem('images');
    return imagesString ? JSON.parse(imagesString) : undefined;
  }

  public saveLastSearchResult(images: FlickrImage) {
    localStorage.setItem('images', JSON.stringify(images));
  }

  public loadKeyword() {
    const imagesString: string = localStorage.getItem('keyword') || '';
    return imagesString.replaceAll('"', '');
  }

  public saveLastKeyword(keyword: string) {
    localStorage.setItem('keyword', JSON.stringify(keyword));
  }

  public loadLang() {
    const imagesString: string = localStorage.getItem('lang') || '';
    return imagesString.replaceAll('"', '');
  }

  public saveLang(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }
}
