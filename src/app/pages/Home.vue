<template>
  <div id="app">

    <header>
      <h2>
        <a href="#">
          <figure class="websiteLogo" v-if="loadLogo">
            <img :src="loadLogo" alt="image">
          </figure>
        {{ loadLogo ? null : 'Website Logo' }}
        </a>
      </h2>

      <nav>
        <li v-for="(link, index) in nav" :key="index">
          <a v-if="link.isAbsolute" :href="link.path" target="_blank">{{link.name}}</a>
          <router-link v-else :to="link.path">{{link.name}}</router-link>

          <ul v-if="link.children" class="sub-nav">
            <li v-for="(subLink, index) in link.children" :key="index">
              <a v-if="subLink.isAbsolute" :href="subLink.path" target="_blank">{{subLink.name}}</a>
              <router-link v-else :to="subLink.path">{{subLink.name}}</router-link>
            </li>
          </ul>
        </li>
      </nav>
    </header>

    <section class="hero">
      <div class="background-image" :style="{'background-image': `url(${require('../assets/img/hero.jpg')})`}"></div>
      <h1>
        {{settings.title}}
      </h1>
      <h3>{{settings.description}}</h3>
      <div class="cta">
        <a href="http://tutorialzine.com/2016/06/freebie-landing-page-template-with-flexbox/" class="btn">Download it Here</a>
      </div>
    </section>

    <section class="our-work">
      <h3 class="title">Some of our work</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
      <hr>
      <ul class="grid">
        <li class="small" :style="{'background-image': `url(${require('../assets/img/coast.jpg')})`}"></li>
        <li class="large" :style="{'background-image': `url(${require('../assets/img/island.jpg')})`}"></li>
        <li class="large" :style="{'background-image': `url(${require('../assets/img/balloon.jpg')})`}"></li>
        <li class="small" :style="{'background-image': `url(${require('../assets/img/mountain.jpg')})`}"></li>
      </ul>
    </section>

    <section class="features">
      <h3 class="title">Features and services</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
      <hr>
      <ul class="grid">
        <li>
          <i class="fa fa-camera-retro"></i>
          <h4>Photography</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.
          </p>
        </li>
        <li>
          <i class="fa fa-cubes"></i>
          <h4>Web Development</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.
          </p>
        </li>
        <li>
          <i class="fa fa-newspaper-o"></i>
          <h4>Content Editing</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices vitae pulvinar velit.
          </p>
        </li>
      </ul>
    </section>

    <section class="reviews">
      <h3 class="title">What others say:</h3>

      <p class="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
      <p class="author">— Patrick Farrell</p>

      <p class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
      <p class="author">— George Smith</p>

      <p class="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
      <p class="author">— Kevin Blake</p>
    </section>

    <section class="contact">
      <h3 class="title">Join our newsletter</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
      <hr>

      <form>
        <input type="email" placeholder="Email">
        <a href="#" class="btn">Subscribe now</a>
      </form>
    </section>

    <footer>
      <ul>
        <li>
          <a href="#">
            <i class="fa fa-twitter-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-facebook-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-snapchat-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-pinterest-square"></i>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-github-square"></i>
          </a>
        </li>
      </ul>
      <p>Made by
        <a href="http://tutorialzine.com/" target="_blank">tutorialzine</a>. images courtesy to
        <a href="http://unsplash.com/" target="_blank">unsplash</a>.</p>
      <p>No attribution required. you can remove this footer.</p>
    </footer>
  </div>
</template>

<script>
import { settingsRef, postsRef, navRef, mediaRef } from '@/admin/firebase_config'

export default {
  name: 'home',
  firebase: {
    // load settings as object instead of array (default)
    settings: {
      source: settingsRef,
      asObject: true
    },
    posts: {
      source: postsRef,
      asObject: true
    },
    nav: {
      source: navRef
    },
    media: {
      source: mediaRef
    }
  },
  computed: {
    loadLogo () {
      var i = this.media.length
      var url = null
      while (i--) {
        if (this.media[i].name === 'WebsiteLogo') {
          url = this.media[i].src
        }
      }
      return url
    }
  }
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');
@import url('https://fonts.googleapis.com/css?family=Quicksand');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font: normal 16px sans-serif;
  color: #555;
}

ul,
nav {
  list-style: none;
}

ul li,
nav li {
  position: relative;
}

.sub-nav {
  display: none;
  position: absolute;
  left: 0px;
  top: 20px;
  padding-top: 10px;
}

.sub-nav li {
  margin-left: 0px;
}

li:hover .sub-nav, .sub-nav:hover {
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  opacity: 0.9;
}

a:hover {
  opacity: 1;
}

a.btn {
  color: #fff;
  border-radius: 4px;
  text-transform: uppercase;
  background-color: #2196F3;
  font-weight: 800;
  text-align: center;
}

hr {
  width: 150px;
  height: 2px;
  background-color: #2196F3;
  border: 0;
  margin-bottom: 80px;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 125px 100px;
}

@media (max-width: 1000px) {

  section {
    padding: 100px 50px;
  }
}

@media (max-width: 600px) {

  section {
    padding: 80px 30px;
  }
}

section h3.title {
  color: #414a4f;
  text-transform: capitalize;
  font: bold 32px 'Open Sans', sans-serif;
  margin-bottom: 35px;
  text-align: center;
}

section p {
  max-width: 800px;
  text-align: center;
  margin-bottom: 35px;
  padding: 0 20px;
  line-height: 2;
}

ul.grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

/*-------------
       Header
  -------------*/

header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 30px 100px 0;
}

header h2 {
  font-family: 'Quicksand', sans-serif;
}

header nav {
  display: flex;
}

header a,
header a:hover {
  color: white;
}

header nav li {
  margin: 0 15px;
}

header nav li:first-child {
  margin-left: 0;
}

header nav li:last-child {
  margin-right: 0;
}

@media (max-width: 1000px) {
  header {
    padding: 20px 50px;
  }
}

@media (max-width: 700px) {
  header {
    flex-direction: column;
  }

  header h2 {
    margin-bottom: 15px;
  }
}

/*----------------
       Hero Section
  ----------------*/

.hero {
  position: relative;
  justify-content: center !important;
  min-height: 100vh;
  color: #fff;
  text-align: center;
  z-index: 0;
}

.hero .background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-color: #2196F3;
  z-index: -1;
}

.hero .background-image:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #414a4f;
  opacity: 0.75;
}

.hero h1 {
  font: bold 60px 'Open Sans', sans-serif;
  margin-bottom: 15px;
}

.hero h3 {
  font: normal 28px 'Open Sans', sans-serif;
  margin-bottom: 40px;
}

.cta {
  padding-top: 15px;
}

.hero a.btn {
  padding: 20px 48px;
}

@media (max-width: 800px) {

  .hero {
    min-height: 600px;
  }

  .hero h1 {
    font-size: 48px;
  }

  .hero h3 {
    font-size: 24px;
  }

  .hero a.btn {
    padding: 15px 40px;
  }
}

/*--------------------
       Our Work Section
  ---------------------*/

.оur-work {
  background-color: #fff;
}

.our-work .grid li {
  padding: 20px;
  height: 350px;
  border-radius: 3px;

  background-clip: content-box;
  background-size: cover;
  background-position: center;
  background-color: #333;
}

.our-work .grid li.small {
  flex-basis: 40%;
}

.our-work .grid li.large {
  flex-basis: 60%;
}

@media (max-width: 1000px) {

  .our-work .grid li.small,
  .our-work .grid li.large {
    flex-basis: 100%;
  }
}

/*----------------------
       Features Section
  ----------------------*/

.features {
  background-color: #f7f7f7;
}

.features .grid li {
  padding: 0 30px;
  flex-basis: 33%;
  text-align: center;
}

.features .grid li i {
  font-size: 50px;
  color: #2196F3;
  margin-bottom: 25px;
}

.features .grid li h4 {
  color: #555;
  font-size: 20px;
  margin-bottom: 25px;
}

.features .grid li p {
  margin: 0;
}

@media (max-width: 1000px) {

  .features .grid li {
    flex-basis: 70%;
    margin-bottom: 65px;
  }

  .features .grid li:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 600px) {

  .features .grid li {
    flex-basis: 100%;
  }
}

/*--------------------
       Reviews Section
  --------------------*/

.reviews {
  background-color: #fff;
}

.reviews .quote {
  text-align: center;
  width: 80%;
  font-size: 22px;
  font-weight: 300;
  line-height: 1.5;
  margin-bottom: 20px;
  padding: 0;
}

.reviews .author {
  font-size: 18px;
  margin-bottom: 50px;
}

.reviews .author:last-child {
  margin-bottom: 0;
}

@media (max-width: 1000px) {

  .reviews .quote {
    font-size: 20px;
  }

  .reviews .author {
    font-size: 16px;
  }
}

/**
 * https://codepen.io/mithicher/pen/azQKNN
 *
 * Card Styles
 */
 .wrapper {
   text-align: center;
 }

.card {
  background-color: #fff;
  margin-bottom: 1.6rem;
  width: 300px;
  display: inline-block;
  margin: 30px;
  box-shadow: 0px 10px 7px 3px lightgray;
}

.card__padding {
  padding: 1rem;
}

.card__image {
  min-height: 100px;
  background-color: #eee;
}
  .card__image img {
    width: 100%;
    max-width: 100%;
    display: block;
  }

.card__content {
  position: relative;
}

/* card meta */
.card__meta time {
  font-size: 1.5rem;
  color: #bbb;
  margin-left: 0.8rem;
}

/* card article */
.card__article p {
  height: 100px;
  overflow: hidden;
  margin-bottom: 0px;
}
.card__article a {
  text-decoration: none;
  color: #444;
  transition: all 0.5s ease;
}
  .card__article a:hover {
    color: #2980b9;
  }

/* card action */
.card__action {
  overflow: hidden;
  padding-right: 1.6rem;
  padding-left: 1.6rem;
  padding-bottom: 1.6rem;
}

.card__author img,
.card__author-content {
  display: inline-block;
  vertical-align: middle;
}

.card__author img{
  border-radius: 50%;
  margin-right: 0.6em;
}

.card__share {
  float: right;
  position: relative;
  margin-top: -42px;
}

.card__social {
  position: absolute;
  top: 0;
  right: 0;
  visibility: hidden;
  width: 160px;
  transform: translateZ(0);
    transform: translateX(0px);
    transition: transform 0.35s ease;
}
  .card__social--active {
    visibility: visible;
    /*z-index: 3;*/
    transform: translateZ(0);
     transform: translateX(-48px);
      transition: transform 0.35s ease;
  }

/*---------------------
       Contact Section
  ---------------------*/

.contact {
  background-color: #f7f7f7;
}

.contact form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 800px;
  width: 80%;
}

.contact form input {
  padding: 15px;
  flex: 1;
  margin-right: 30px;
  font-size: 18px;
  color: #555;
}

.contact form .btn {
  padding: 18px 42px;
}

@media (max-width: 800px) {

  .contact form input {
    flex-basis: 100%;
    margin: 0 0 20px 0;
  }
}

/*-------------
       Footer
  -------------*/

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  background-color: #414a4f;
  padding: 60px 0;
}

footer ul {
  display: flex;
  margin-bottom: 25px;
  font-size: 32px;
}

footer ul li {
  margin: 0 8px;
}

footer ul li:first-child {
  margin-left: 0;
}

footer ul li:last-child {
  margin-right: 0;
}

footer p {
  text-transform: uppercase;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
}

footer p a {
  color: #fff;
}

@media (max-width: 700px) {

  footer {
    padding: 80px 15px;
  }
}

/* -- Demo ads -- */

@media (max-width: 1200px) {
  #bsaHolder {
    display: none;
  }
}

.websiteLogo {
  max-height: 128px;
  max-width: 128px;
}
</style>
