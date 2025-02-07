<template>
  <section id="page">
  <v-row justify="center">
    <section class="dt-login--container" style="background-color: #FAF9F6; border-radius: 10px; padding: 1%; opacity: 0.8; width: 500px;">
      <section class="dt-login__content-wrapper">
        <section class="dt-login__bg-section">
          <section class="dt-login__bg-content">
            <img style="margin: auto; margin-top: 2%;" class="h-auto max-w-lg rounded-lg" src="../../assets/logo_small.png" alt="{{appName}}" /><br>
            <p class="f-16 text-center text-gray-500">Login with a {{appName}} Admin account.</p><br>
          </section>

          <section class="dt-login__logo"></section>
        </section>

        <section class="dt-login__content">
          <section class="dt-login__content-inner">
            <form>
              <v-text-field
                class="f-16 text-gray-900"
                v-model="state.email"
                :error-messages="v$.email.$errors.map(e => e.$message)"
                label="E-mail"
                required
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
              ></v-text-field>

              <v-text-field
                class="f-16 text-gray-900"
                v-model="state.password"
                :error-messages="v$.password.$errors.map(e => e.$message)"
                label="Password"
                required
                @blur="v$.password.$touch"
                @input="v$.password.$touch"
              ></v-text-field>

              <br>
              <v-btn @click="clear"
                class="me-4 float-right"
              >
                clear
              </v-btn>
              s
              <v-btn
                class="me-4 mainButton float-right"
                @click="v$.$validate"
              >
                submit
              </v-btn>
            </form>
          </section>

          <section class="breadCrumbsBox">
            <v-breadcrumbs :items="breadCrumbsData" large></v-breadcrumbs>
          </section>
        </section>
      </section>
    </section>
  </v-row>
  </section>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

  const initialState = {
    password: '',
    email: '',
    select: null,
    checkbox: null,
  }

  const state = reactive({
    ...initialState,
  })

  const rules = {
    password: { required },
    email: { required, email },
  }

  const v$ = useVuelidate(rules, state)

  function clear () {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value
    }
  }
</script>

<style scoped>

.mainButton{
  background-color: #e05307;
}

#page{
  background-color: hsl(134, 61%, 41%) !important;
  background-image: url(../../assets/images/background.jpg) !important;
  background-repeat: no-repeat;
  height: 100%;
  background-position: center;
  background-size: cover;
  display: block;
  height: 100%;
  width: 100%;
  padding-top: 20%;
}

.dt-login--container {
  margin-top: -9%;
}

.dt-login__bg-section {
  /* background-image: url(../../assets/images/login-background.jpg) !important; */
  /* background-color: #28a745 !important; */
}

.dt-login__bg-section:before {
  background-image: url(../../assets/images/login-background.jpg) !important;
  background-color: #28a745 !important;
}
</style>

