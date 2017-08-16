<template>
  <div class="admin">
    <!-- The admin page layout -->
    <navbar></navbar>
    <sidebar></sidebar>

    <!-- The admin page content -->
    <div class="wrapper">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import Navbar from './components/layout/Navbar';
  import Sidebar from './components/layout/Sidebar';
  import firebase from 'firebase';

  export default {
    components: {
      'navbar': Navbar,
      'sidebar': Sidebar
    },
    // prevent unauthenticated users from accessing the admin area
    // and direct them to the login page
    beforeRouteEnter(to, from, next) {
      // get the current logged in user
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref('users/' + user.uid).once('value')
            // check if the current user is an admin
            .then((snapshot) => {
              let user = snapshot.val();
              if (user.role === 'admin') {
                // continue to /admin
                next();
              } else {
                // redirect to /login if the logged in user is not an admin
                next('/login');
              }
            })
        } else {
          // redirect to /login if no user is logged in
          next('/login');
        }
      })
    }
  };

</script>

<style lang="scss">
  html,
  body,
  #app,
  .admin {
    background-color: #F1F1F1;

    .wrapper {
      width: calc(100% - 200px);
      position: absolute;
      top: 52px;
      left: 190px;
      background-color: #F1F1F1;

      .content-heading {
        justify-content: baseline;
        align-content: center;
        align-items: center;
        h3 {
          margin: 1em 1em 1em 0em;
        }
      }
    }

    .actions {
      display: none;
      span {
        cursor: pointer;
      }
    }

    tr:hover .actions {
      display: block;
    }
  }

</style>
