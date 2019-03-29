<template>
  <div class="container">
    <!-- notification -->
    <transition mode="out-in" name="fade">
      <div v-if="notification.message" :class="'notification is-' + notification.type">
        <button class="delete" @click="hideNotifications"></button>
        {{notification.message}}
      </div>
    </transition>

    <h2>Database State</h2>
    <div class="box">
      <div class="columns">
        <div class="column">
          <div>
            Settings:
            <span v-if="settings.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoSettings">Add Demo Settings</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Media:
            <span v-if="media.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoLogo">Add Demo Logo</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Nav:
            <span v-if="nav.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoNav">Add Demo Nav</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Content:
            <span v-if="contents.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoContent">Add Demo Content</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>

          <div>
            Fields:
            <span v-if="fields.length === 0" class="has-text-danger">
              Empty
              <button class="button is-info" @click="addDemoFields">Add Demo Field</button>
            </span>
            <span v-else class="has-text-success">Contains data</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/storage";
import { demoData } from "@/../tamiat.config.json";
import notifier from "@/admin/mixins/notifier";
import {
  settingsRef,
  mediaRef,
  navRef,
  contentsRef,
  fieldsRef,
  routesRef
} from "@/admin/firebase_config";
import _ from "lodash";

export default {
  data() {
    return { ...demoData, con: "" };
  },
  firebase: {
    settings: settingsRef,
    media: mediaRef,
    nav: navRef,
    fields: fieldsRef,
    contents: contentsRef,
    routes: routesRef
  },
  mixins: [notifier],
  methods: {
    addDemoContentsData() {
      let storageRef = firebase.storage().ref();
      Object.keys(this.demoContentsData).map(key => {
        let hashKey = _.find(this.contents, { name: key })[".key"];

        this.demoContentsData[key].map(content => {
          let imageName = content.title ? `tamiat-${content.title}.png` : `tamiat-${content.author}.png`;
          let ImageRef = storageRef.child("images/" + imageName);
          let imgDownloadURL = "";

          this.fetchBlob(content.img)
            .then(blob => {
              return ImageRef.put(blob);
            })
            .then(snapshot => {
              return snapshot.ref.getDownloadURL();
            })
            .then(downloadURL => {
              imgDownloadURL = downloadURL;
              content.created = Date.now();
              content.img = imgDownloadURL;

              return this.$firebaseRefs.contents
                .child(hashKey + "/data")
                .push(content);
            })
            .then(() => {
              return this.$firebaseRefs.media.push({
                name: imageName,
                path: ImageRef.fullPath,
                src: imgDownloadURL
              });
            });
        });
      });
    },

// this is the old code
    // addDemoServices() {
    //   let i = this.demoServices.length;
    //   this.demoServices.forEach(service => {
    //     const key = _.find(this.contents, { name: "Services" })[".key"];
    //     service.created = Date.now();
    //     this.$firebaseRefs.contents
    //       .child(key + "/data")
    //       .push(service)
    //       .then(() => {
    //         i--;
    //         if (i === 0) {
    //           this.showNotification(
    //             "success",
    //             "Demo Services added successfully"
    //           );
    //         }
    //       });
    //   });
    // },
    // addDemoWorks() {
    //   let storageRef = firebase.storage().ref();
    //   const key = _.find(this.contents, { name: "Works" })[".key"];

    //   this.demoWorks.forEach(work => {
    //     // let imageName = `work-${work.title}.jpg`
    //     // let workImageRef = storageRef.child('images/' + imageName)
    //     // let imgDownloadURL = ''

    //     this.fetchBlob(work.img)
    //       // .then(blob => {
    //       //   return workImageRef.put(blob)
    //       // })
    //       // .then(snapshot => {
    //       //   return snapshot.ref.getDownloadURL()
    //       // })
    //       .then(downloadURL => {
    //         // imgDownloadURL = downloadURL
    //         // work.created = Date.now()
    //         // work.img = imgDownloadURL

    //         return this.$firebaseRefs.contents.child(key + "/data").push(work);
    //       })
    //       .then(() => {
    //         return this.$firebaseRefs.media.push({
    //           name: imageName,
    //           path: workImageRef.fullPath,
    //           src: imgDownloadURL
    //         });
    //       });
    //   });
    // },
    // addDemoReviews() {
    //   let storageRef = firebase.storage().ref();
    //   const key = _.find(this.contents, { name: "Reviews" })[".key"];

    //   this.demoReviews.forEach(review => {
    //     let imageName = `review-author-${review.author}.png`;
    //     let reviewImageRef = storageRef.child("images/" + imageName);
    //     let imgDownloadURL = "";

    //     this.fetchBlob(review.img)
    //       .then(blob => {
    //         return reviewImageRef.put(blob);
    //       })
    //       .then(snapshot => {
    //         return snapshot.ref.getDownloadURL();
    //       })
    //       .then(downloadURL => {
    //         imgDownloadURL = downloadURL;
    //         review.created = Date.now();
    //         review.img = imgDownloadURL;

    //         return this.$firebaseRefs.contents
    //           .child(key + "/data")
    //           .push(review);
    //       })
    //       .then(() => {
    //         return this.$firebaseRefs.media.push({
    //           name: imageName,
    //           path: reviewImageRef.fullPath,
    //           src: imgDownloadURL
    //         });
    //       });
    //   });
    // },
    // addDemoPost() {
    //   let storageRef = firebase.storage().ref();
    //   let postImageRef = storageRef.child("images/demo-post-img.png");
    //   let imgDownloadURL = "";

    //   this.fetchLogoBlob()
    //     .then(blob => {
    //       return postImageRef.put(blob);
    //     })
    //     .then(snapshot => {
    //       return snapshot.ref.getDownloadURL();
    //     })
    //     .then(downloadURL => {
    //       imgDownloadURL = downloadURL;
    //       let demoPost = { ...this.demoPost };
    //       demoPost.created = Date.now();
    //       demoPost.img = imgDownloadURL;
    //       demoPost.body += `<p><img src="${imgDownloadURL}"></p>`;
    //       const key = _.find(this.contents, { name: "Posts" })[".key"];
    //       return this.$firebaseRefs.contents
    //         .child(key + "/data")
    //         .push(demoPost);
    //     })
    //     .then(() => {
    //       return this.$firebaseRefs.media.push({
    //         name: "demo-post-img.png",
    //         path: postImageRef.fullPath,
    //         src: imgDownloadURL
    //       });
    //     })
    //     .then(() => {
    //       // this.showNotification('success', 'Demo Content added successfully')
    //     });
    // },
    // addDemoNews() {
    //   let storageRef = firebase.storage().ref();
    //   let postImageRef = storageRef.child("images/demo-post-img.png");
    //   let imgDownloadURL = "";
    //   const key = _.find(this.contents, { name: "News" })[".key"];

    //   this.fetchLogoBlob()
    //     .then(blob => {
    //       return postImageRef.put(blob);
    //     })
    //     .then(snapshot => {
    //       return snapshot.ref.getDownloadURL();
    //     })
    //     .then(downloadURL => {
    //       imgDownloadURL = downloadURL;
    //       let demoNews = { ...this.demoNews };
    //       demoNews.created = Date.now();
    //       demoNews.img = imgDownloadURL;
    //       return this.$firebaseRefs.contents
    //         .child(key + "/data")
    //         .push(demoNews);
    //     })
    //     .then(() => {
    //       return this.$firebaseRefs.media.push({
    //         name: "demo-post-img.png",
    //         path: postImageRef.fullPath,
    //         src: imgDownloadURL
    //       });
    //     })
    //     .then(() => {
    //       this.addDemoRoutesForNews();
    //       this.showNotification("success", "Demo Content added successfully");
    //     });
    // },
    addDemoRoutesForNews() {
      let i = this.demoRoutes.length;
      this.demoRoutes.forEach(route => {
        this.$firebaseRefs.routes.push(route).then(() => {
          i--;
          if (i === 0) {
            this.showNotification("success", "Demo Route added successfully");
          }
        });
      });
    },
    addDemoSettings() {
      this.$firebaseRefs.settings.update(this.demoSettings).then(() => {
        this.showNotification("success", "Demo Settings added successfully");
      });
    },
    addDemoNav() {
      let i = this.demoNav.length;
      this.demoNav.forEach(link => {
        this.$firebaseRefs.nav.push(link).then(() => {
          i--;
          if (i === 0) {
            this.showNotification("success", "Demo Nav added successfully");
          }
        });
      });
    },
    addDemoLogo() {
      let storageRef = firebase.storage().ref();
      let logoRef = storageRef.child(`images/tamiatlogo.png`);

      this.fetchLogoBlob().then(blob => {
        logoRef.put(blob).then(snapshot => {
          this.addDemoLogoToDB(snapshot);
        });
      });
    },
    fetchLogoBlob() {
      return this.fetchBlob(this.demoLogoLink);
    },
    fetchBlob(link) {
      return fetch(link).then(res => {
        return res.blob();
      });
    },
    addDemoLogoToDB(snapshot) {
      snapshot.ref
        .getDownloadURL()
        .then(downloadURL => {
          return this.$firebaseRefs.media.push({
            name: "WebsiteLogo",
            path: snapshot.ref.fullPath,
            src: downloadURL
          });
        })
        .then(() => {
          this.showNotification("success", "Demo Logo added successfully");
        });
    },
    addDemoFields() {
      let i = this.demoFields.length;
      this.demoFields.forEach(field => {
        this.$firebaseRefs.fields.push(field).then(() => {
          i--;
          if (i === 0) {
            this.showNotification("success", "Demo fields added successfully");
          }
        });
      });
    },
    addDemoContent() {
      let i = this.demoContent.length;

      this.demoContent.forEach(content => {
        this.$firebaseRefs.contents.push(content).then(c => {
          i--;
          if (i === 0) {
            this.con = c.key;
            //   this.addDemoPost()
            //   this.addDemoNews()
            //   this.addDemoServices()
            //   this.addDemoReviews()
            this.addDemoContentsData();
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.column > div {
  margin-top: 15px;
  &:first-child {
    margin-top: 0px;
  }
}

button {
  vertical-align: middle !important;
  margin-left: 30px;
}
</style>
