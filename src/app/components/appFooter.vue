<template>
  <div>
    <footer>
      <div class="container">
        <ul>
          <li>
            <a href="#">
              <img src="@/app/assets/img/social-media/white/twitter-white.png" alt="twitter">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="@/app/assets/img/social-media/white/facebook-white.png" alt="facebook">
            </a>
          </li>
          <li>
            <a href="#">
              <img src="@/app/assets/img/social-media/white/pinterest-white.png" alt="pinterest">
            </a>
          </li>
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
export default {
  name: 'app-footer',
  data () {
    return {
      subscriberEmail: '',
      isSubscribed: false
    }
  },
  methods: {
    subscribeNewsLetter () {
      if (!this.subscriberEmail) {
        this.$refs['input-subscriber-email'].focus()
      } else {
        this.isSubscribed = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/app/styles/index.scss';

/*---------------------
       Contact Section
  ---------------------*/

.contact {
  background-color: $color-orange;
  color: #ffffff;
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
        .alert-subscription {
          padding: 10px;
          color: $color-orange;
          font-weight: bold;
          background-color: $color-gray-light;
        }
      }
    }
    .is-heading {
      color: #ffffff;
    }
    form {
      max-width: 800px;
      width: 80%;
    }
    hr {
      color: #ffffff;
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
    form {
      width: 100%;
      .form-icon-wrapper,
      input {
        width: 100%;
      }
    }
  }
}

/*-------------
       Footer
  -------------*/

footer {
  background-color: $color-orange;
  border-top: 1px solid #ffffff;
  .container {
    display: flex;
    flex-direction: row;
    align-items: left;
    text-align: left;
    color: #fff;
    padding: 40px 0;
    a {
      color: #ffffff;
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
  .contact {
    .content p {
      margin-top: 15px;
    }
  }
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
</style>
