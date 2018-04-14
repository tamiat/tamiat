<template>
  <div class="box">

  </div>
</template>

<script>
import firebase from 'firebase'

import { mediaRef } from '@/admin/firebase_config'
import editorOptions from '@/admin/utils/editor-options'
import imageLoader from '@/admin/mixins/image-loader'
import notifier from '@/admin/mixins/notifier'

export default {
  name: 'content-edit',
  data () {
    return {
      /* Here we are filtering out the post containing the provided key in the router params
       * we are using Object.assign to copy the post by value not by reference
       * to prevent updating the poste when typing */
      inputData: '',
      con: Object.assign(
        {},
        (this.content.filter((c) => {
          return (c['.key'] === this.$route.params.contentKey)
        }))[0]
      ),
      editorOptions
    }
  },
  firebase: {
    media: mediaRef
  },
  props: ['content', 'update-content'],
  mixins: [imageLoader, notifier],
  methods: {
    // call the updatePost method passed through props
    update (publish) {
      if (this.post.title) {
        if (publish) {
          this.post.state = 'published'
        }
        this.updatePost(this.post)
      } else {
        this.showNotification('warning', 'The title field can not be empty')
      }
    },
    uploadFeaturedImage (e) {
      let file = e.target.files[0]
      let storageRef = firebase.storage().ref('images/' + file.name)

      storageRef.put(file).then((snapshot) => {
        this.post.img = snapshot.downloadURL
        if (Object.values(this.media).find(e => e.path === snapshot.ref.fullPath)) return // this prevents duplicate entries in the media object
        this.$firebaseRefs.media.push({
          src: snapshot.downloadURL,
          path: snapshot.ref.fullPath,
          name: snapshot.metadata.name
        })
      })
    },
    styleTags () {
      if (this.inputData !== '') {
        this.tagString.push(`${this.inputData.trim()}`)
        this.inputData = ''
      }
    },
    removeTag (index) {
      this.tagString.splice(index, 1)
    }
  },
  computed: {
    tagString: {
      get: function () {
        return this.post.tags // if no tags present join is undefined
      },
      set: function (newValue) {
        this.post.tags = newValue
      }
    }
  }
}

</script>
<style>
.tagscontainer {
  border: 2px solid #f2f2f2;
  border-radius: 5px;
  padding: 5px;
}
.pointer {
  cursor: pointer;
}

</style>
