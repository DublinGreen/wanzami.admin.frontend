<template>
  <nav>
    <v-navigation-drawer v-if="toogleDrawer" app>
      <v-list dense active-class="border">
        <v-list-item class="leftNavs">
          <v-list-item-action>
            <i class="fa fa-home fa-4x iconlight"></i>
          </v-list-item-action>
          <v-list-item-content>
            <router-link class="leftNavText" to="/Dashboard">Home</router-link>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="leftNavs" 
          v-show="">
          <v-list-item-action>
            <router-link to="/RegisterVoters">
              <i class="fa fa-user fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/RegisterVoters">
                Register
                <br />Voter
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs" v-show="isLogin">
          <v-list-item-action>
            <router-link to="/ManageVotersCrud">
              <i class="fa fa-users fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/ManageVotersCrud">
                All
                <br />Voters
              </router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs" v-show="isLoginAsVoter">
          <v-list-item-action>
            <router-link to="/Elections">
              <i class="fas fa-box-open fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/Elections">Elections</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs">
          <v-list-item-action>
            <router-link to="/Reports">
              <i class="fas fa-chart-bar fa-4x iconlight"></i>
            </router-link>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="leftNavText">
              <router-link to="/Reports">Reports</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item class="leftNavs" @click="logout">
          <v-list-item-action>
            <i class="fa fa-power-off fa-4x iconlight"></i>
          </v-list-item-action>

          <v-list-item-content>
            <p id="leftNavLogout">Logout</p>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#e05307" dark>
      <v-app-bar-nav-icon @click="toogleLeftDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ appName }} Backend Application</v-toolbar-title>
    </v-app-bar>
  </nav>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { reactive } from 'vue'
  import store from "@/store";
  import gql from 'graphql-tag';
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import { useMutation } from '@vue/apollo-composable';
  import { useRouter } from 'vue-router';
  import {LOGIN_USER} from "@/mutation/LOGIN_USER";
  import {onMounted } from 'vue';

  const router = useRouter();

  // onMounted(async () => {
  //     if(localStorage.getItem('token')){
  //       if(redirect.value){
  //         router.push('Dashboard');
  //       }
  //     }
  // });

  const initialState = {
    password: '',
    email: '',
    leftDrawer: true,
  }

  const appName = store.state.appName;
  const loading = ref(false);
  const toogleDrawer = ref<boolean>(true);
  const isLogin = true;
  const isLoginAsVoter = true;
  const redirect = ref(true); // set true, if page should redirect to Dashboard
  const state = reactive({
    ...initialState,
  })

  const LOGOUT_USER = gql`
  mutation Logout($token: String!) {
      logout(token: $token)
  }`;

  const { mutate: logoutUser } = useMutation(LOGOUT_USER);

  async function logout () {
    if (confirm("Are you sure you want to logout?")) {

      try {
        const response = await logoutUser({
          token: localStorage.getItem("token")
        });
        console.log(response);

      } catch (error) {
        // loginWarning.value = true;
        console.log(error);
      } finally {
        // loading.value = false;
      }

      localStorage.setItem("token", "");
      if(redirect.value){
          router.push('/');
      }
    }
  }

  function toogleLeftDrawer () {
      // alert(toogleDrawer.value);
      toogleDrawer.value = !toogleDrawer.value;
      store.dispatch('toogleLeftDrawer', !state.leftDrawer);
  }

</script>

<style scoped>
nav {
  /* border: 5px solid #ff0000; */
  box-shadow: 3px 0px 3px #333333;
}

.leftNavs {
  background-color: #e05307;
  color: #ffffff;
  margin-bottom: 10px;
}

.leftNavs:hover {
  box-shadow: 5px 5px 5px #333333;
  border: 1px dotted #ffffff;
}

.iconlight {
  color: #ffffff;
}

.iconlight:hover {
  color: #ffff00;
}

.footerBox{
  background-color: #e05307;
}
</style>