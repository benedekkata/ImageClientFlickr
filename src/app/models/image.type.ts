export interface Image {
  description: string; //last paragraph tag
  title: string;
  tags: string;
  author: string;
  author_id: string;
  media: {
    m: string; //The image url
  };
  link: string; //Open in flickr
}
