import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { Image } from './../../models/image.type';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BANNED_USER } from 'src/app/constants';

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
    //After the route changed (someone cliked a username from the userpage) loads the new id
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getImgInfo();
        this.getImages();
      }
    });
  }

  ngOnInit(): void {
    this.getImgInfo();
    this.getImages();
  }

  images: Image[] = [];
  uid: string = '';
  username: string = '';
  imgOrFav: string = 'Images';

  /**
   * Loads the userId and the Username from the URL.
   */
  getImgInfo() {
    this.uid = this.route.snapshot.params['id'].split(';')[0];
    this.username = this.route.snapshot.params['id'].split(';')[1];
  }

  /**
   * Calls the imageService.getImagesByUser function to get the images for the current user.
   */
  getImages() {
    this.imageService.getImagesByUser(this.uid).subscribe((images) => {
      if (images) {
        this.images = images.items;
        this.processImages();
        this.removeBannedUser();
      }
    });
    this.imgOrFav = 'Images';
  }

  /**
   * Calls the imageService.getFavouritImages function to get the favourite images for the current user.
   */
  getFavImages() {
    this.imageService.getFavouritImages(this.uid).subscribe((images) => {
      if (images) {
        this.images = images.items;
        this.processImages();
        this.removeBannedUser();
      }
    });
    this.imgOrFav = 'Favourites';
  }

  /**
   * Processes the data to be suitable for rendering.
   */
  private processImages() {
    this.images.forEach((img: Image) => {
      //cut and save the last paragraph of the description field only
      const paragraph = /<p>(.*?)<\/p>/gi;
      const matches = [...img.description.matchAll(paragraph)];
      if (matches.length !== 0) {
        img.description = matches[2] ? matches[2][1] : '';
      }

      //cut and save the only the username part of the data (email is not needed)
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
