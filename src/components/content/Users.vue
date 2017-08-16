<template>
  <div class="container">

    <!-- users page title -->
    <div class="content-heading is-flex">
      <h3 class="is-size-3">Users</h3>
      <router-link to="/admin/users/new" class="button is-info">Add New</router-link>
    </div>

    <!-- the new user form loaded via vue loader -->
    <router-view></router-view>

    <h4>Guests' requests</h4>
    <!-- guests' requests table -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in guests">
            <td>
              {{user.username}}
              <div class="actions">
                <span @click="approve(user)" class="approve has-text-success">Approve</span>
              </div>
            </td>
            <td>{{user.email}}</td>
            <td>{{user.role}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4>Administrators</h4>
    <!-- the administrators table -->
    <div class="box">
      <table class="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>username</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in admins" :class="{'logged-in' : currentUser.uid === user['.key']}">
            <td>
              {{user.username}}
              <div class="actions">
                <!-- display a delete button below the current logged in user -->
                <span v-if="currentUser.uid === user['.key']" @click="deleteCurrentUser" class=" has-text-danger">Delete</span>
                <span v-else @click="ban(user)" class="ban has-text-danger">Ban</span>
              </div>
            </td>
            <td>{{user.email}}</td>
            <td>{{user.role}}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
  import firebase from 'firebase';
  import { usersRef } from '../../config';

  export default {
    data() {
      return {
        currentUser: firebase.auth().currentUser
      }
    },
    firebase() {
      return {
        users: usersRef
      }
    },
    methods: {
      // approve a new user method
      approve(user) {
        this.$firebaseRefs.users.child(user['.key']).set({
          username: user.username,
          email: user.email,
          role: 'admin'
        })
      },
      // ban an existing admin
      ban(user) {
        this.$firebaseRefs.users.child(user['.key']).set({
          username: user.username,
          email: user.email,
          role: 'guest'
        })
      },
      // delete the current user
      deleteCurrentUser() {
        let vm = this;
        // delete the current user from the firebase auth
        this.currentUser.delete()
          .then(function () {
            // delete the current user from the real time database
            vm.$firebaseRefs.users.child(vm.currentUser.uid).remove();
            console.log('user deleted successfuly');
          })
          .catch(function (error) {
            console.log(error.message);
          });

      }
    },
    computed: {
      admins() {
        return this.users.filter((user) => {
          return user.role === 'admin';
        })
      },
      guests() {
        return this.users.filter((user) => {
          return user.role === 'guest';
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .content-heading {
    justify-content: baseline;
    align-content: center;
    align-items: center;
    h3 {
      margin: 1em 1em 1em 0em;
    }
  }

  .logged-in {
    background-color: #C1FFD7 !important;
  }

</style>
