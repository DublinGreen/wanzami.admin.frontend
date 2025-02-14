<template>
  <section>
    <NavMain />
    <v-content style="clear: both;padding: 2%;margin:0;width: 100%">
      <hr><br>

      <v-dialog
        v-model="dialog"
        width="full"
      >
        <!-- Add User Form -->
        <v-card class="pa-4 mb-4">
          <v-form @submit.prevent="addNewUser">
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field v-model="newUser.username" label="Username" required />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="newUser.email" label="Email" required />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="newUser.password" label="Password" required />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field v-model="newUser.telephone" label="Telephone" required />
              </v-col>
              <v-col cols="12" md="3">
                <v-select
                  v-model="newUser.role"
                  :items="['Admin', 'Normal']"
                  label="Role"
                  required
                />
              </v-col>
            </v-row>
            <v-btn type="submit" color="primary" :loading="loadingAdd">Add User</v-btn>
          </v-form>
        </v-card>
      </v-dialog>

      <div>
        <v-text-field v-model="search" label="Search items" class="mb-3" />

        <v-btn @click="dialog = true">
          Add User
        </v-btn>
        <!-- result.findAllUsers -->
        <!-- filteredItems -->
        <v-data-table
          :items="filteredItems"
          :items-per-page="50"
          :headers="[
            { title: 'ID', key: 'id', sortable: true },
            { title: 'Status', key: 'status', sortable: true },
            { title: 'Username', key: 'username', sortable: true },
            { title: 'Email', key: 'email', sortable: true },
            { title: 'Telephone', key: 'telephone', sortable: true },
            { title: 'Role', key: 'role', sortable: true },
          ]"
          item-value="id"
          :loading="loading"
          @click:row="(event, { item }) => toggleSort(item.key)"
        >
          <template v-slot:loading>
            <v-progress-linear indeterminate />
          </template>
          <template v-slot:no-data>
            <p v-if="error">Error: {{ error.message }}</p>
            <p v-else>No items found.</p>
          </template>
        </v-data-table>
      </div>
    </v-content>
    <Footer />
  </section>
</template>

<script setup lang="ts">
  import NavMain from "../components/Navs/NavMain.vue";
  import Footer from "../components/Footers/Footer.vue";
  import { appMixin } from "../mixins/appMixin.js";
  import { reactive } from 'vue';
  import { ref, computed } from 'vue';
  import store from "@/store";
  import gql from 'graphql-tag';
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'
  import { useMutation } from '@vue/apollo-composable';
  import { useRouter } from 'vue-router';
  import {ADD_USER} from "@/mutation/mutations";
  import {onMounted } from 'vue';
  import { useQuery } from '@vue/apollo-composable';
  import {GET_ALL_USERS} from "@/query/queries";

  const router = useRouter();

  const initialState = {
    password: '',
    email: '',
    leftDrawer: true,
  }

  const appName = store.state.appName;
  const isLogin = true;
  const leftDrawer = true;
  const isLoginAsVoter = true;
  const redirect = ref(true); // set true, if page should redirect to Dashboard
  const state = reactive({
    ...initialState,
  })

  const rules = {
    password: { required },
    email: { required, email },
  }

  const v$ = useVuelidate(rules, state)
  
  const { result, loading, error } = useQuery(GET_ALL_USERS);

  // Reactive variables
  const search   = ref('');
  const sortBy   = ref('id');
  const sortDesc = ref(false);
  const dialog   = ref(false);
 

  // Computed: Filter users based on search
  const filteredItems = computed(() => {
    const users = result?.value?.findAllUsers || [];

    // Search filter (matches any field)
    return users.filter((user) =>
      Object.values(user)
        .join(" ")
        .toLowerCase()
        .includes(search.value.toLowerCase())
    );
  });

  // Handle column sorting
  const toggleSort = (column) => {
    if (sortBy.value === column) {
      sortDesc.value = !sortDesc.value; // Toggle direction
    } else {
      sortBy.value = column;
      sortDesc.value = false;
    }
  };

// Add user mutation
const { mutate: addUser, loading: loadingAdd } = useMutation(ADD_USER);

// Reactive state for new user
const newUser = ref({
  username: "",
  email: "",
  password: "",
  telephone: "",
  role: "Normal",
});

// Add user function
const addNewUser = async () => {
  try {
    await addUser({ variables: newUser.value });
    newUser.value = { username: "", email: "", password: "", telephone: "", role: "User" };
    await refetch(); // Refresh table data
  } catch (err) {
    console.error("Error adding user:", err);
  }
};
</script>

<style scoped>
  .webBox{
    width: 100%;
  }

  .v-text-field {
    max-width: 300px;
  }
</style>
