<template>
  <div class="box">
    <loading color="#3b9169" :active.sync="isLoading" :can-cancel="false" :is-full-page="fullPage"></loading>

    <div class="columns">
      <div class="column is-two-thirds">
        <!-- Textbox fields -->
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'textbox'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <input
              type="text"
              class="input"
              maxlength="25"
              required
              :placeholder="field.name"
              v-model="newContent[field.name]"
            >
          </div>
        </div>

        <!-- Textarea fields -->
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'textarea'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <textarea
              class="input"
              v-model="newContent[field.name]"
              :placeholder="field.name"
              v-text="newContent[field.name]"
            ></textarea>
          </div>
        </div>

        <!-- Rich text fields - vue-quill-editor plugin -->
        <div v-for="(field, index) in fields" :key="index" v-if="field.type === 'richtextbox'">
          <quill-editor v-model="newContent[field.name]" :options="editorOptions"></quill-editor>
          <input type="file" id="getImage" style="display: none;" @change="uploadImage">
        </div>

        <!-- Category (select) fields -->
        <br>
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'select'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column">
              <div class="select margin-select">
                <select>
                  <option
                    v-for="(selectOption, selectIndex) in newContent[field.name]"
                    :key="selectIndex"
                  >{{ selectOption }}</option>
                </select>
              </div>
            </div>
            <div class="column">
              <!--area to delete options-->
              <div v-for="(option, optionKey) in newContent[field.name]" :key="optionKey">
                <span @click="removeTag(optionKey, field.name)" class="tag is-info pointer">
                  {{option}}
                  <button class="delete is-small"></button>
                </span>
              </div>
            </div>
          </div>
          <!--area to enter options-->
          <div class="control">
            <input
              type="text"
              class="input"
              :placeholder="field.name"
              @blur="styleOptions(field.name)"
              @keyup.enter="styleOptions(field.name)"
              v-model="selectOptionsRow"
              maxlength="25"
            >
          </div>
          <p>Separate options with commas</p>
        </div>

        <!-- Integer fields -->
        <br>
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'integer'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column is-one-third">
              <input type="number" :placeholder="field.name" class="input">
              <!--v-model="newContent[field.name]"?-->
            </div>
          </div>
        </div>

        <!-- Boolean fields -->
        <br>
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'boolean'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column is-one-third">
              <span>Name</span>
              <input
                :placeholder="field.name + ' name'"
                class="input"
                v-model="booleanName"
                @blur="createNewBoolContent(field.name)"
                @keyup.enter="createNewBoolContent(field.name)"
              >
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <label class="checkbox">
                <input type="checkbox">
                {{ booleanName }}
              </label>
            </div>
          </div>
        </div>

        <!-- Url fields -->
        <br>
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'url'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="columns">
            <div class="column is-two-fifths">
              <span>Name</span>
              <input
                :placeholder="field.name + ' name'"
                class="input"
                v-model="urlContentData.name"
                @blur="createUrlnewContent(field.name)"
                @keyup.enter="createUrlnewContent(field.name)"
              >
            </div>
            <div class="column is-two-fifths">
              <span>Link</span>
              <input
                :placeholder="field.name + ' link'"
                class="input"
                v-model="urlContentData.link"
                @blur="createUrlnewContent(field.name)"
                @keyup.enter="createUrlnewContent(field.name)"
              >
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <span>Preview:</span>
              <a :href="urlContentData.link">{{ urlContentData.name }}</a>
            </div>
          </div>
        </div>
        <!---->
      </div>

      <!-- Right sidebar -->
      <div class="column is-one-third">
        <!-- Tag fields -->
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'tags'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <div class="tags tagscontainer">
              <span
                @click="removeTag(tagKey, field.name)"
                v-for="(tag, tagKey) in newContent[field.name]"
                :key="tagKey"
                class="tag is-info pointer"
              >
                {{tag}}
                <button class="delete is-small"></button>
              </span>
              <input
                :placeholder="field.name"
                @blur="styleTags(field.name)"
                @keyup.enter="styleTags(field.name)"
                type="text"
                class="input"
                maxlength="25"
                v-model="inputData"
              >
            </div>
            <p>Separate tags with commas</p>
          </div>
        </div>

        <!-- Image fields -->
        <div
          class="field"
          v-for="(field, index) in fields"
          :key="index"
          v-if="field.type === 'image'"
        >
          <label class="label">{{ field.name }}</label>
          <div class="control">
            <img v-if="imagePreview" :src="imagePreview">
            <div class="file">
              <label class="file-label">
                <input
                  @change="uploadFeaturedImage($event, field.name)"
                  class="file-input"
                  type="file"
                  name="resume"
                >
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fa fa-upload"></i>
                  </span>
                  <span class="file-label">Choose a file…</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- notification -->
    <div v-if="notification.message" :class="'notification is-' + notification.type">
      <button class="delete" @click="hideNotifications"></button>
      {{notification.message}}
    </div>

    <!-- the form buttons -->
    <button type="submit" class="button is-success" @click="add('published')">Publish</button>
    <button type="submit" class="button is-info" @click="add('saved')">Save Draft</button>
    <router-link :to="'/admin/content/' + $route.params.key" class="button is-danger">Cancel</router-link>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import { mediaRef } from "@/admin/firebase_config";
import editorOptions from "@/admin/utils/editor-options";
import imageLoader from "@/admin/mixins/image-loader";
import notifier from "@/admin/mixins/notifier";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "content-new",
  components: {
    Loading
  },
  firebase: {
    media: mediaRef
  },
  props: ["add-content", "fields"],
  mixins: [imageLoader, notifier],
  data() {
    return {
      imagePreview: null,
      newContent: {
        tags: []
      },
      inputData: "",
      booleanName: "",
      editorOptions,
      selectOptionsRow: "",
      urlContentData: {
        name: "",
        link: ""
      },
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    add(state) {
      this.newContent.created = Date.now();
      this.newContent.selected = false;
      this.newContent.state = state;

      this.addContent(this.newContent);
      this.$router.push({ path: "/admin/content/" + this.$route.params.key });
    },
    uploadFeaturedImage(e, fieldName) {
      this.isLoading = true;
      let file = e.target.files[0];
      let storageRef = firebase.storage().ref("images/" + file.name);

      storageRef.put(file).then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(downloadURL => {
            this.$set(this, "imagePreview", URL.createObjectURL(file));
            this.newContent[fieldName] = "";
            this.newContent[fieldName] = downloadURL;
            if (
              Object.values(this.media).find(
                e => e.path === snapshot.ref.fullPath
              )
            )
              return; // this prevents duplicate entries in the media object
            this.$firebaseRefs.media.push({
              src: downloadURL,
              path: snapshot.ref.fullPath,
              name: snapshot.metadata.name
            });
          })
          .then(() => {
            this.isLoading = false;
          });
      });
    },
    createUrlnewContent(fieldName) {
      if (this.urlContentData.name !== "") {
        if (!this.newContent[fieldName]) {
          this.newContent[fieldName] = { name: "", link: "" };
        }
        this.newContent[fieldName].name = this.urlContentData.name;
        this.newContent[fieldName].link = this.urlContentData.link;
      }
    },
    createNewBoolContent(fieldName) {
      if (this.booleanName !== "") {
        if (!this.newContent[fieldName]) {
          this.newContent[fieldName] = "";
        }
        this.newContent[fieldName] = this.booleanName;
      }
    },
    styleTags(fieldName) {
      if (this.inputData !== "") {
        if (!this.newContent[fieldName]) {
          this.newContent[fieldName] = [];
        }
        this.inputData.split(",").forEach(tag => {
          this.newContent[fieldName].push(`${tag.trim()}`);
        });
        this.inputData = "";
      }
    },
    removeTag(index, fieldName) {
      // function to remove tags and options
      // cloning object (to make Vue reactive)
      let currentContent = Object.assign({}, this.newContent);
      // delete element from arr
      currentContent[fieldName].splice(index, 1);
      // return cloned object Back
      this.newContent = Object.assign({}, currentContent);
    },
    // function to create Select Options from input area
    styleOptions(fieldName) {
      if (this.selectOptionsRow !== "") {
        if (!this.newContent[fieldName]) {
          this.newContent[fieldName] = [];
        }
        this.selectOptionsRow.split(",").forEach(tag => {
          this.newContent[fieldName].push(`${tag.trim()}`);
        });
        this.selectOptionsRow = "";
      }
    }
  }
};
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
.ql-container {
  min-height: 200px;
}
.margin-select {
  margin-bottom: 25px;
}
</style>
