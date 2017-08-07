<template>
  <div>
    <div class="container">

      <div class="content-heading is-flex">
        <h3 class="is-size-3">Posts</h3>
        <router-link to="/admin/posts/new" class="button is-info">Add New</router-link>
      </div>

      <router-view></router-view>

      <div class="columns">
        <div v-for="i in 2" class="column">

          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-64x64">
                  <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                    <br> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
                    egestas. Nullam condimentum luctus turpis.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
  h3 {
    font-size: 1.7em;
    margin: 1em 0em;
  }

</style>
