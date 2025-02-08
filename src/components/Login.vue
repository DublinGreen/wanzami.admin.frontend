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
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
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
                  @click="submit"
                >
                  submit
                </v-btn>

                <section 
                  v-if="loading" 
                  class="f-16 text-center text-gray-500 me-4 float-right">
                  <img style="width: 40px;" src="../../assets/orange_circles.gif" alt="loading">
                </section>
                <!-- 
                <div v-else-if="error">{{ error.message }}</div>
                <div v-else>{{ result?.greeting }}</div> -->
              </form>
            </section>
          </section>
        </section>
      </section>
    </v-row>  
  </section>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import { useQuery } from '@vue/apollo-composable';
  import { useMutation } from '@vue/apollo-composable';
  import gql from 'graphql-tag';

  const GET_USERS = gql`
    query FindAllUsers {
    findAllUsers {
        id
        status
        username
        email
        telephone
        password
        role
    }
}`;

  useQuery(GET_USERS);

  const initialState = {
    password: '',
    email: '',
  }

  const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
}`;

const { mutate: loginUser } = useMutation(LOGIN_USER);


  const appName = ref('Wanzami');
  const showPassword = ref(false);
  const loading = ref(false);


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
    loading.value = false;
  }

  async function submit () {
    loading.value = true;
  try {
    // const response = await loginUser();

    const response = await loginUser({
      email: state.email,
      password: state.password,
    });
    console.log('Login Success:', response);
  } catch (error) {
    console.error('Login Failed:', error);
  } finally {
    loading.value = false;
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

