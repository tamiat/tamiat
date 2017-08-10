<template>
  <div class="container">

    <h3>General settings</h3>
    <div class="box">
      <div class="columns">

        <div class="column is-multiline">

          <div v-for="field in fields" class="field columns">
            <div class="column is-one-third">
              <label class="label is-capitalized">{{field.label}}</label>
            </div>

            <div class="control column is-two-thirds">
              <input :type="field.type" class="input" :name="field.label">
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // this array contains settings fields
        fields: [
          {
            label: 'site title',
            type: 'text'
          },
          {
            label: 'site description',
            type: 'text'
          }
        ]
      }
    }
  }

</script>

<style lang="scss">
  h3 {
    font-size: 1.7em;
    margin: 1em 0em;
  }

</style>
