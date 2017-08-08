<template>
  <div class="box">

    <h3>Write a new post</h3>
    <div class="columns">

      <div class="column">

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

        <button type="submit" class="button is-info">Add</button>
        <router-link to="/admin/posts" class="button is-danger">Cancel</router-link>
      </div>
    </div>
  </div>
</template>
