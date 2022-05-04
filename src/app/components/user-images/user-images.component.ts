import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from './../../models/image.type';
import { StorageService } from 'src/app/services/storage.service';
import { FlickrImage } from 'src/app/models/flickrImage.type';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-user-images',
  templateUrl: './user-images.component.html',
  styleUrls: ['./user-images.component.scss'],
})
export class UserImagesComponent implements OnInit {
  constructor(
    private imageService: ImageService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getImgInfo();
      }
    });
  }

  ngOnInit(): void {
    this.getImgInfo();
  }
  images: Image[] = [];
  uid: string = '';
  username: string = '';
  imgOrFav: string = 'Images';

  getImgInfo() {
    this.uid = this.route.snapshot.params['id'].split(';')[0];
    this.username = this.route.snapshot.params['id'].split(';')[1];
    this.getImages();
  }

  getImages() {
    this.imageService.getImagesByUser(this.uid).subscribe((images) => {
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
        this.imgOrFav = 'Images';
      }
    });
  }

  getFavImages() {
    this.imageService.getFavouritImages(this.uid).subscribe((images) => {
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
      }
    });
    this.imgOrFav = 'Favourites';
  }
}
