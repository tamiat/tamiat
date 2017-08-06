<template>
  <div>
    <div class="container">

      <h3>Write a new post</h3>

      <div class="columns">

        <div class="column is-10 is-offset-1">
          <div class="box">

            <div class="field">
              <label class="label">Post's title</label>
              <div class="control">
                <input type="text" class="input">
              </div>
            </div>

            <div class="field">
              <label class="label">Post's body</label>
              <div class="control">
                <textarea type="text" class="textarea"></textarea>
              </div>
            </div>
            <button type="submit" class="button is-primary">Publish</button>

          </div>
        </div>
      </div>

      <h3>Old Posts</h3>

      <div class="columns">
        <div class="column is-10 is-offset-1">


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
