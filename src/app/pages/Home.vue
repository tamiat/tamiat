<template>
  <div class="home">

    <app-header></app-header>

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

    <app-footer></app-footer>
  </div>
</template>

<script>
import { settingsRef, mediaRef } from '@/admin/firebase_config'
import appHeader from '../components/appHeader'
import appFooter from '../components/appFooter'

export default {
  name: 'home',
  components: {
    appHeader,
    appFooter
  },
  firebase: {
    // load settings as object instead of array (default)
    settings: {
      source: settingsRef,
      asObject: true
    },
    media: {
      source: mediaRef
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../styles/index.scss';

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
