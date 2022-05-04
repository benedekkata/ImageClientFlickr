import { FlickrImage } from 'src/app/models/flickrImage.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Loads a set of images and datas from the local storeage if there is any.
   * @returns A FlickImage object, if the local storage contains value for key: images. Other cases it would return undefined.
   */
  public loadImages(): FlickrImage | undefined {
    const imagesString = localStorage.getItem('images');
    return imagesString ? JSON.parse(imagesString) : undefined;
  }

  /**
   * Saves the recieved image object to the local storeage under key: images
   * @param images The set of images and datas wrapped in a Flickr image obbject.
   */
  public saveLastSearchResult(images: FlickrImage) {
    localStorage.setItem('images', JSON.stringify(images));
  }

  /**
   * Loads a sting value from the local storeage from the key: keyword
   * @returns The loaded value for this keyword. Or an empty string, if it is not there.
   */
  public loadKeyword() {
    const imagesString: string = localStorage.getItem('keyword') || '';
    return imagesString.replaceAll('"', '');
  }

  /**
   * Saves a sting value to the local storeage with the key: keyword
   * @param keyword The value that has to be saved.
   */
  public saveLastKeyword(keyword: string) {
    localStorage.setItem('keyword', JSON.stringify(keyword));
  }

  /**
   * Loads a sting value from the local storeage from the key: lang
   * @returns The loaded value for a possible language. Or an empty string, if it is not there.
   */
  public loadLang() {
    const imagesString: string = localStorage.getItem('lang') || '';
    return imagesString.replaceAll('"', '');
  }

  /**
   * Saves a sting value to the local storeage with the key: lang
   * @param lang The value that has to be saved.
   */
  public saveLang(lang: string) {
    localStorage.setItem('lang', JSON.stringify(lang));
  }
}
