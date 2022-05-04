import { Image } from './../models/image.type';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
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

  getImagesByKeywordAndLanguage(
    keyword?: string,
    language?: string
  ): Observable<Object | undefined> {
    if (keyword) {
      language = language ? language : DEFAULT_LANGUAGE;
      const url = `${API_PHOTO_FEED}tags=${keyword.replaceAll(
        ' ',
        ','
      )}&lang=${language}&jsoncallback=JSONP_CALLBACK`;
      this.http.jsonp(url, 'callback').pipe(
        catchError(async (e) => console.log(e)) // then handle the error
      );
      return this.http.jsonp(url, 'JSONP_CALLBACK');
    }
    return of(this.fimages).pipe(delay(200));
  }

  getImagesByUser(userid: string): Observable<Object | undefined> {
    const url = `${API_PHOTO_FEED}id=${userid}&jsoncallback=JSONP_CALLBACK`;
    this.http.jsonp(url, 'callback').pipe(
      catchError(async (e) => console.log(e)) // then handle the error
    );
    return this.http.jsonp(url, 'JSONP_CALLBACK');
  }

  getFavouritImages(userid: string): Observable<Object | undefined> {
    const url = `${API_FAV_FEED}id=${userid}&jsoncallback=JSONP_CALLBACK`;
    this.http.jsonp(url, 'callback').pipe(
      catchError(async (e) => console.log(e)) // then handle the error
    );
    return this.http.jsonp(url, 'JSONP_CALLBACK');
  }
}
