<template>
  <div class="home">

    <header class="bg-white">
      <h2>
        <a href="#">
          <figure class="websiteLogo" v-if="loadLogo">
            <img :src="loadLogo" alt="image" style="max-height: 50px;">
          </figure>
        {{ loadLogo ? null : 'Website Logo' }}
        </a>
      </h2>

      <div :class="['menu-toggle', isNavOpen ? 'on' : '']" @click="isNavOpen = !isNavOpen">
        <div class="one"></div>
        <div class="two"></div>
        <div class="three"></div>
      </div>

      <nav :class="isNavOpen ? '' : 'hidden'">
        <li v-for="(link, index) in nav" :key="index">
          <a v-if="link.isAbsolute" @click="toggleNav" :href="link.path" target="_blank">{{link.name}} <i v-if="link.children" class="fa"></i></a>
          <router-link v-else @click.native="toggleNav" :to="link.path">{{link.name}} <i v-if="link.children" class="fa"></i></router-link>

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
      <div class="hero-content">
        <h1>
          {{settings.title}}
        </h1>
        <h3>{{settings.description}}</h3>
        <div class="cta">
          <a href="http://tutorialzine.com/2016/06/freebie-landing-page-template-with-flexbox/" class="btn is-large has-icon" target="_blank">
            Download it Here
            <i class="fa fa-arrow-circle-down"></i>
          </a>
        </div>
      </div>
    </section>

    <section class="our-work">
      <div class="container">
        <h3 class="is-heading">Some of our work</h3>
        <p class="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
        <ul class="grid">
          <li class="small" :style="{'background-image': `url(${require('../assets/img/coast.jpg')})`}"></li>
          <li class="large" :style="{'background-image': `url(${require('../assets/img/island.jpg')})`}"></li>
          <li class="large" :style="{'background-image': `url(${require('../assets/img/balloon.jpg')})`}"></li>
          <li class="small" :style="{'background-image': `url(${require('../assets/img/mountain.jpg')})`}"></li>
        </ul>
      </div>
    </section>

    <section class="features bg-blue">
      <div class="container">
        <h3 class="is-heading">Features and services</h3>
        <p class="info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
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
      </div>
    </section>

    <section class="reviews">
      <div class="container">
        <h3 class="is-heading is-orange">What Others Say</h3>

        <ul class="quote-box">
          <li>
            <p class="quote">Mauris sit amet mauris a arcu eleifend ultricies eget ut dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
            <img src="../assets/img/quotes/quotes-1.png" alt="Patrick Farrell">
            <p class="author">Patrick Farrell</p>
          </li>
          <li>
            <p class="quote">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>
            <img src="../assets/img/quotes/quotes-2.png" alt="George Smith">
            <p class="author">George Smith</p>
          </li>
          <li>
            <p class="quote">Donec commodo dolor augue, vitae faucibus tortor tincidunt in. Aliquam vitae leo quis mi pulvinar ornare. Integer eu iaculis metus.</p>
            <img src="../assets/img/quotes/quotes-3.png" alt="Kevin Blake">
            <p class="author">Kevin Blake</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="contact">
      <div class="container">
        <div class="icon-box">
          <img src="../assets/img/footer-icon.png" alt="footer-icon">
        </div>

        <div class="content">
          <h3 class="is-heading">Join our newsletter</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id felis et ipsum bibendum ultrices. Morbi vitae pulvinar velit. Sed aliquam dictum sapien, id sagittis augue malesuada eu.</p>

          <form>
            <div class="form-icon-wrapper is-large m-y-md">
              <input class="form-control is-large" type="email" placeholder="Your e-mail">

              <button>
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <footer>
      <div class="container">
        <ul>
          <li>
            <a href="#">
              <img src="../assets/img/social-media/twitter-white.png" alt="twitter">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="../assets/img/social-media/facebook-white.png" alt="facebook">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="../assets/img/social-media/pinterest-white.png" alt="pinterest">
            </a>
          </li>
          <!-- <li>
            <a href="#">
              <i class="fa fa-github-square"></i>
            </a>
          </li> -->
        </ul>
        <div>
          <p>Made by
            <a href="http://tutorialzine.com/" target="_blank">tutorialzine</a>. images courtesy to
            <a href="http://unsplash.com/" target="_blank">unsplash</a>.
          </p>
          <p>No attribution required. you can remove this footer.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { settingsRef, navRef, mediaRef } from '@/admin/firebase_config'

export default {
  name: 'home',
  firebase: {
    // load settings as object instead of array (default)
    settings: {
      source: settingsRef,
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
  },
  data () {
    return {
      isNavOpen: false
    }
  },
  methods: {
    toggleNav (event) {
      const targetElement = event.target.parentElement.parentElement
      if (targetElement.nodeName === 'LI') {
        targetElement.className = targetElement.className === 'open' ? '' : 'open'
      }

      event.preventDefault()
    }
  }
}

</script>

<style lang="scss" scoped>
// Mixins
@mixin gen-props($prefix, $property) {
  @each $color-name, $color in $colors {
    .#{$prefix}-#{$color-name} {
      #{$property}: $color
    }
  }
}

@mixin border-radius($radius) {
  border-radius: $radius;
  -webkit-border-radius: $radius;
  -moz-border-radius: $radius;
}

@import url('https://fonts.googleapis.com/css?family=Muli:400,700');

// Colors
$color-black: #000000;
$color-black-light: #BEBEBE;

$color-gray: #898989;
$color-gray-light: #E9E7E7;

$color-blue: #4374D8;
$color-blue-light: #9ABBFF;

$color-orange: #FF7443;
$color-orange-light: #FFAA58;

//
$primary-font: 'Muli', sans-serif;
$primary-font-color: #898989;

$heading-font-color: $color-blue;
$subheading-font-color: #898989;

$primary-button-color: $color-blue;

$colors: (
  black: $color-black,
  black-light: $color-black-light,

  gray: $color-gray,
  gray-light: $color-gray-light,

  blue: $color-blue,
  blue-light: $color-blue-light,

  orange: $color-orange,
  orange-light: $color-orange-light
);

@include gen-props('bg', 'background');

// General

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

ul,
nav {
  list-style: none;
}

ul li,
nav li {
  position: relative;
}

.home {
  font-family: $primary-font;
  font-size: 18px;
  font-weight: normal;
  color: $primary-font-color;
  line-height: 26px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1280px;
  margin: 0 auto;
  padding: 75px;
}

ul.grid {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.is-heading {
  color: $heading-font-color;
  font-family: $primary-font;
  font-size: 35px;
  line-height: 51px;
  padding-bottom: 30px;
  &.is-orange {
    color: $color-orange;
  }
}

.is-subheading {
  color: $subheading-font-color;
  font-family: $primary-font;
  font-size: 28px;
  line-height: 41px;
}

// Default button will have primary colors
.btn {
  background-color: $primary-button-color;
  @include border-radius(5px);
  padding: 17px 20px;
  min-width: 225px;
  border: none;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 700;
  &.is-large {
    padding: 21px;
    min-width: 275px;
    font-size: 20px;
  }

  &.is-small {
    padding: 8px 31px;
    min-width: 120px;
    font-size: 12px;
  }

  &:hover:not(:disabled) {
    background-color: #4F82EC;
    box-shadow: 0 0 9px rgba(0, 0, 0, 0.2)
  }

  &:disabled {
    background-color: $color-black-light;
  }

  &.has-icon {
    position: relative;
    text-align: left;
    padding-right: 15px;
    .fa {
      position: absolute;
      right: 15px;
      top: 50%;
      font-size: 32px;
      transform: translate(0, -50%);
    }
    &.is-large .fa {
      right: 17px;
    }
  }
}

a.btn {
  display: inline-block;
}

a {
  color: $color-blue;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
}

p.info {
  max-width: 500px;
  text-align: center;
}

input.form-control {
  color: $color-black-light;
  font-size: 18px;
  background-color: #FFFFFF;
  padding: 15px;
  border: 1px solid $color-black-light;
  outline: 0;
  &.is-large {
    padding: 20px 15px;
  }
  &:active:not(:disabled), &:focus:not(:disabled) {
    color: $primary-font-color;
  }
  &:disabled {
    background: $color-gray-light;
  }
}

.form-icon-wrapper {
  position: relative;
  padding-right: 50px;
  display: inline-block;
  input {
    border-right: none;
  }
  button {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 50px;
    background-color: $color-blue;
    color: #FFFFFF;
    border: none;
  }
  i.fa {
    font-size: 18px;
  }
  &.is-large {
    padding-right: 65px;
    button {
      background-color: $color-orange-light;
      width: 65px;
    }
  }
  input:disabled {
    background-color: $color-gray-light;
    color: $color-black-light;
    & + button {
      background-color: $color-black-light;
    }
  }
}

.pagination {
  display: flex;
  li {
    margin: 0 5px;
    a {
      text-decoration: none;
      &:hover {
        background-color: $color-gray-light;
      }
    }
    &.is-current a {
      background-color: $color-blue-light;
      border: 1px solid $color-blue-light;
      color: #FFFFFF;
    }
    &.navigation {
      a {
        min-width: 70px;
        display: inline-block;
        padding: 10px;
        text-align: center;
        background-color: $color-blue;
        color: #FFFFFF;
        &:hover {
          background-color: $color-blue;
        }
      }
      &.is-disabled a {
        background-color: $color-black-light;
        color: #FFFFFF;
      }
    }
  }
  a {
    border: 1px solid $color-black-light;
    @include border-radius(5px);
    background-color: #FFFFFF;
    color: $primary-font-color;
    min-width: 50px;
    display: inline-block;
    text-align: center;
    padding: 10px;
  }
}

@media(max-width: 1280px) {
  .container {
    width: auto !important;
  }
}

@media(max-width: 600px) {
  a {
    font-size: 16px;
  }
  .container {
    padding: 30px !important;
  }
  .is-heading {
    text-align: center;
    font-size: 30px;
    line-height: 40px;
  }
}

/*-------------
       Header
  -------------*/

header {
  z-index: 10;
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 20px 42px;
  background: white;
  nav {
    display: flex;
    li {
      i.fa {
        display: none;
      }
    }
    .sub-nav {
      display: none;
      position: absolute;
      left: -47px;
      top: 20px;
      padding-top: 36px;
      margin-top: 5px;
      z-index: 10;
      background: #FFFFFF;
      li {
        margin: 0px;
        border-bottom: 1px solid #DFDFDF;
        padding: 5px 10px;
        width: 170px;
        &:first-child {
          box-shadow: inset 0 7px 9px -7px #CCC;
        }
        &:last-child {
          border-bottom: 0;
        }
        a {
          font-size: 16px;
          font-weight: normal;
          color: $primary-font-color;
        }
        &:hover {
          background: $color-orange;
          a {
            color: #FFFFFF;
          }
          .sub-nav, .sub-nav:hover {
            display: block;
          }
        }
      }
    }
    li {
      margin: 0 15px;
      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover .sub-nav, .sub-nav:hover {
        display: block;
      }
    }
    a.router-link-active {
      color: $color-orange;
    }
  }
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

@media (max-width: 600px) {
  header {
    padding: 10px 50px;
    align-items: flex-start;
    min-height: 65px;
    h2 {
      margin-bottom: 0px;
    }
    nav {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 65px;
      left: 0;
      display: flex;
      flex-direction: column;
      background-color: #FFFFFF;
      z-index: 9;
      border-top: 1px solid $color-gray-light;
      &.hidden {
        display: none;
      }
      > li {
        padding: 0;
        margin: 0;
        border-bottom: 1px solid $color-gray-light;
        > a {
          display: block;
          margin: 0 25px;
          padding: 7px 0;
          i.fa {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: x-large;
            display: inline-block;
            z-index: 11;
          }
        }
        &:hover {
          .sub-nav, .sub-nav:hover {
            display: none;
          }
        }
        &.open {
          .sub-nav {
            display: block;
          }
          a {
            i.fa::before {
              content: "\F106";
            }
          }
        }
        a {
          i.fa:before {
            content: "\F107";
          }
        }
        .sub-nav {
          display: none;
          top: 0;
          left: 0;
          position: relative;
          padding-top: 0;
          background-color: #F3F3F3;
          li {
            width: 100%;
            padding: 7px 0;
            padding-left: 55px;
            box-shadow: none !important;
            border-top: 1px solid #FFFFFF;
            border-bottom: none;
            color: $color-gray-light;
          }
        }
      }
    }
    .menu-toggle {
      width: 25px;
      height: 30px;
      position: absolute;
      top: 20px;
      right: 25px;
      cursor: pointer;
      z-index: 10;
      .one,
      .two,
      .three {
        width: 100%;
        height: 4px;
        background-color: $color-blue;
        margin: 5px auto;
        backface-visibility: hidden;
        -moz-transition-duration: 0.3s;
        -o-transition-duration: 0.3s;
        -webkit-transition-duration: 0.3s;
        transition-duration: 0.3s;
      }
      &.on {
        .one {
          -moz-transform: rotate(45deg) translate(3px, 4px);
          -ms-transform: rotate(45deg) translate(3px, 4px);
          -webkit-transform: rotate(45deg) translate(3px, 4px);
          transform: rotate(45deg) translate(3px, 4px);
        }
        .two {
          opacity: 0;
        }
        .three {
          -moz-transform: rotate(-45deg) translate(9px, -10px);
          -ms-transform: rotate(-45deg) translate(9px, -10px);
          -webkit-transform: rotate(-45deg) translate(9px, -10px);
          transform: rotate(-45deg) translate(9px, -10px);
        }
      }
    }
  }
}

/*----------------
       Hero Section
  ----------------*/

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  justify-content: center !important;
  min-height: 100vh;
  color: #fff;
  text-align: center;
  z-index: 0;
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-color: #2196F3;
    z-index: -1;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #414a4f;
      opacity: 0.75;
    }
  }
  .hero-content {
    position: absolute;
    right: 20%;
    text-align: left;
    h1 {
      font-size: 32px;
      margin-bottom: 15px;
    }

    h3 {
      font-size: 25px;
      margin-bottom: 20px;
    }

    .cta {
      padding-top: 15px;
    }
  }
}

@media (max-width: 800px) {
  .hero {
    min-height: 600px;
    h1 {
      font-size: 48px;
    }
    h3 {
      font-size: 24px;
    }
    a.btn {
      padding: 15px 40px;
    }
  }
}

@media (max-width: 600px) {
  .hero .hero-content {
    padding: 0 30px;
    right: auto;
    text-align: center;
  }
}

/*--------------------
       Our Work Section
  ---------------------*/

.our-work {
  background-color: #fff;
  .is-heading {
    color: $color-orange;
  }
  .grid {
    padding: 60px 0 20px 0;
    li {
      padding: 10px;
      height: 350px;
      border-radius: 3px;
      background-clip: content-box;
      background-size: cover;
      background-position: center;
      background-color: #333;
      &.small {
        flex-basis: 40%;
      }
      &.large {
        flex-basis: 60%;
      }
    }
  }
}

@media (max-width: 1000px) {

  .our-work .grid li.small,
  .our-work .grid li.large {
    flex-basis: 100%;
  }
}

@media (max-width: 600px) {
  .our-work {
    .grid {
      padding: 30px 0;
      li.small, li.large {
        padding: 10px 0;
      }
    }
  }
}

/*----------------------
       Features Section
  ----------------------*/

.features {
  color: #FFFFFF;
  .is-heading {
    color: #FFFFFF;
  }
  .grid {
    padding-top: 50px;
    li {
      padding: 0 30px;
      flex-basis: 33%;
      text-align: left;
      i {
        font-size: 64px;
        margin-bottom: 25px;
      }
      h4 {
        font-size: 20px;
        margin-bottom: 25px;
      }
      p {
        margin: 0;
        text-align: left;
      }
    }
  }
}

@media (max-width: 1000px) {
  .features .grid li {
    flex-basis: 70%;
    margin-bottom: 65px;
    &:last-child {
      margin-bottom: 0;
    }
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
  ul.quote-box {
    display: flex;
    li {
      margin: 50px 30px;
      padding: 20px;
      width: 33.33%;
      @include border-radius(5px);
      box-shadow: 0px 0px 9px 0px lightgray;
      p {
        text-align: left;
      }
      p.quote {
        min-height: 180px;
        margin-bottom: 45px;
      }
      .author {
        color: #000000;
        font-weight: 700;
      }
    }
  }
}

@media (max-width: 1000px) {
  .reviews {
    .quote {
      font-size: 20px;
    }
    .author {
      font-size: 16px;
    }
  }
}

@media(max-width: 992px) {
  .reviews {
    ul.quote-box {
      display: block;
      li {
        width: 100%;
        display: block;
        float: none;
        margin: 0 0 30px 0;
        p.quote {
          min-height: auto;
        }
      }
    }
  }
}

@media(max-width: 600px) {
  .reviews ul.quote-box {
    li {
      .quote {
        font-size: 16px;
        line-height: 26px;
      }
    }
  }
}

/*---------------------
       Contact Section
  ---------------------*/

.contact {
  background-color: $color-orange;
  color: #FFFFFF;
  .container {
    padding: 65px 0;
    flex-direction: row;
    > div {
      width: 50%;
      text-align: center;
      &.content {
        text-align: left;
        p {
          padding-bottom: 30px;
          text-align: left;
        }
      }
    }
    .is-heading {
      color: #FFFFFF;
    }
    form {
      max-width: 800px;
      width: 80%;
    }
    hr {
      color: #FFFFFF;
    }
  }
}

@media (max-width: 600px) {
  .contact form input {
    margin: 0;
  }
  .contact .container {
    display: block;
    padding: 30px !important;
    .icon-box {
      display: none;
    }
    > div {
      width: 100%;
      display: block;
      padding-bottom: 20px;
    }
  }
}

/*-------------
       Footer
  -------------*/

footer {
  background-color: $color-orange;
  border-top: 1px solid #FFFFFF;
  .container {
    display: flex;
    flex-direction: row;
    align-items: left;
    text-align: left;
    color: #fff;
    padding: 40px 0;
    a {
      color: #FFFFFF;
    }
    ul {
      width: 50%;
      padding: 0 50px;
      li {
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
}

@media (max-width: 700px) {
  footer {
    padding: 80px 15px;
  }
}

@media (max-width: 600px) {
  footer {
    padding: 0px;
    .container {
      display: block;
      ul {
        width: 100%;
        margin: 20px auto;
        text-align: center;
      }
    }
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

.card__author img {
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
