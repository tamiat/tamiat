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

    <section-work></section-work>

    <section-service></section-service>

    <section-review></section-review>

    <app-footer></app-footer>
  </div>
</template>

<script>
import { settingsRef, mediaRef, contentsRef } from '@/admin/firebase_config'
import appHeader from '../components/appHeader'
import appFooter from '../components/appFooter'
import sectionWork from '../components/sectionWork'
import sectionService from '../components/sectionService'
import sectionReview from '../components/sectionReview'
import contentFetch from '@/admin/mixins/contentFetch'

export default {
  name: 'home',
  mixins: [contentFetch],
  components: {
    appHeader,
    sectionWork,
    sectionService,
    sectionReview,
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
    },
    contents: contentsRef
  },
  computed: {
    services () {
      return this.getContentsByType('Services')
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
