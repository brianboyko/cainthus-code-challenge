import * as React from "react";
import ImageGroup from "./index";
import Enzyme from "../../../loadEnzyme";

const snapshot = `<div class="image-group"><a target="_blank" class="image-group__anchor" href="https://www.flickr.com/photos/148406255@N08/45568411774"><img class="image-group__image" src="https://farm5.staticflickr.com/4892/45568411774_62a03f95dd_z.jpg"/></a><div class="image-group__data"><div class="title"><a target="_blank" class="title__link" href="https://www.flickr.com/photos/148406255@N08/45568411774">1809zoo-5757</a></div><div class="names-and-date"><div class="taken-at">Taken Fri, September 21st, 2018, at 12:30 PM</div><div class="names"><span class="username"><a target="_blank" class="names__link" href="https://www.flickr.com/people/148406255@N08">AO&#x27;Brien</a></span><span> - </span><a target="_blank" class="names__link" href="https://www.flickr.com/people/148406255@N08">Alice O&#x27;Brien</a></div></div><div class="tags"><a class="tag__link" href="https://www.flickr.com/photos/tags/snake"><div class="tag">snake</div></a><a class="tag__link" href="https://www.flickr.com/photos/tags/reptile"><div class="tag">reptile</div></a><a class="tag__link" href="https://www.flickr.com/photos/tags/zoo"><div class="tag">zoo</div></a><a class="tag__link" href="https://www.flickr.com/photos/tags/dublin"><div class="tag">dublin</div></a></div></div></div>`

const fakeImage = {
  id: "45568411774",
  owner: "148406255@N08",
  secret: "62a03f95dd",
  server: "4892",
  farm: 5,
  title: "1809zoo-5757",
  ispublic: 1,
  isfriend: 0,
  isfamily: 0,
  taken: "2018-09-21 12:30:33",
  description: "Snoozing Snake - Dublin Zoo",
  tags: ["snake", "reptile", "zoo", "dublin"],
  username: "AO'Brien",
  realname: "Alice O'Brien"
};

const { shallow } = Enzyme;

describe("ImageGroup", () => {
  it("renders", async () => {
    expect( shallow(<ImageGroup image={fakeImage} />).html()).toBe(snapshot);
  });
});
