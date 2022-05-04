import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  API_FAV_FEED,
  API_PHOTO_FEED,
  DEFAULT_LANGUAGE,
} from 'src/app/constants';
import { FlickrImage } from '../models/flickrImage.type';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private fimages: FlickrImage | undefined;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.fimages = this.storageService.loadImages();
  }

  /**
   * Sends a request for the Flickr Feed API and handels the JSONP response.
   * @param keyword The value that will be used to filter the images by a keyword.
   * @param language A value that will be used to filter the images by language.
   * @returns An observable with the result images.
   */
  getImagesByKeywordAndLanguage(
    keyword?: string,
    language?: string
  ): Observable<FlickrImage | undefined> {
    //If the keyword is empty it returns the loaded data from the local storeage.
    if (keyword) {
      //If the language is not set it will use a constant value (en-us)
      language = language ? language : DEFAULT_LANGUAGE;
      const url = `${API_PHOTO_FEED}tags=${keyword.replaceAll(
        ' ',
        ','
      )}&lang=${language}&jsoncallback=JSONP_CALLBACK`;

      //If the request is not successfull it returns the loaded data from the local storeage.
      return this.http.jsonp<FlickrImage>(url, 'JSONP_CALLBACK').pipe(
        catchError((err: HttpErrorResponse) => {
          return of(this.fimages);
        })
      );
    }
    return of(this.fimages);
  }

  /**
   * Sends a request for the Flickr Feed API and handels the JSONP response.
   * @param userid The user whose images we want to get.
   * @returns A set of images for the specified user.
   */
  getImagesByUser(userid: string): Observable<FlickrImage | undefined> {
    const url = `${API_PHOTO_FEED}id=${userid}&jsoncallback=JSONP_CALLBACK`;
    return this.http.jsonp<FlickrImage>(url, 'JSONP_CALLBACK').pipe(
      catchError((err: HttpErrorResponse) => {
        return of(undefined);
      })
    );
  }

  /**
   * Sends a request for the Flickr Feed API and handels the JSONP response.
   * @param userid The user whose favourite images we want to get.
   * @returns The favourite images of the specified user.
   */
  getFavouritImages(userid: string): Observable<FlickrImage | undefined> {
    const url = `${API_FAV_FEED}id=${userid}&jsoncallback=JSONP_CALLBACK`;
    return this.http.jsonp<FlickrImage>(url, 'JSONP_CALLBACK').pipe(
      catchError((err: HttpErrorResponse) => {
        return of(undefined);
      })
    );
  }
}
