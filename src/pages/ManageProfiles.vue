<template>
  <section>
    <NavMain />
    <v-content style="clear: both;padding: 2%;margin:0;width: 100%">
      <hr><br>

      <div>
        <v-text-field v-model="search" label="Search Profiles" class="mb-3" />

        <h1 class="text-center">Profile Module</h1>
        <br><br>
        <!-- filteredItems -->
        <v-data-table
          :items="filteredItems"
          :items-per-page="50"
          :headers="[
            { title: 'ID', key: 'id', sortable: true },
            { title: 'Status', key: 'status', sortable: true },
            { title: 'Name', key: 'name', sortable: true },
            { title: 'Avatar', key: 'avatar', sortable: true },
            { title: 'User', key: 'user.username', sortable: true },
            { title: 'User ID', key: 'user.id', sortable: true },
            { title: 'Actions', key: 'actions', sortable: false }
          ]"
          item-value="id"
          :loading="loading"
          @click:row="(event: any, { item }: any) => toggleSort(item.key)"
        >
          <template v-slot:loading>
            <v-progress-linear indeterminate />
          </template>
          <template v-slot:no-data>
            <p v-if="error">Error: {{ error.message }}</p>
            <p v-else>No items found.</p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn style="margin-right: 20px;" v-show="item.status == 1" color="warning" @click="deactivateRequest(item.id)">Deactivate</v-btn>
            <v-btn style="margin-right: 20px;" v-show="item.status == 0" color="info" @click="activateRequest(item.id)">Activate</v-btn>
          </template>
        </v-data-table>
      </div>
    </v-content>
    <Footer />
  </section>
</template>

<script setup lang="ts">
  import NavMain from "@/components/Navs/NavMain.vue";
  import Footer from "@/components/Footers/Footer.vue";
  import { ref, computed } from 'vue';
  // @ts-ignore
  import { useMutation } from '@vue/apollo-composable';
  import {SOFT_DELETE_PROFILE_BY_ID, SOFT_ACTIVATE_PROFILE_BY_ID} from "@/mutation/mutations";
  import { useQuery } from '@vue/apollo-composable';
  import {GET_ALL_PROFILES} from "@/query/queries";

  const { result, loading, error } = useQuery(GET_ALL_PROFILES, {
    clientId: "default", // Ensure you're using the correct client
  });

  // Reactive variables
  const search   = ref('');
  const sortBy   = ref('id');
  const sortDesc = ref(false);
  const id       = ref('');
 
  // Computed: Filter users based on search
  const filteredItems = computed(() => {
    const profiles = result?.value?.findAllProfiles || [];

    // Search filter (matches any field)
    return profiles.filter((profiles: { [s: string]: unknown; } | ArrayLike<unknown>) =>
      Object.values(profiles)
        .join(" ")
        .toLowerCase()
        .includes(search.value.toLowerCase())
    );
  });

  // Handle column sorting
  const toggleSort = (column: string) => {
    if (sortBy.value === column) {
      sortDesc.value = !sortDesc.value; // Toggle direction
    } else {
      sortBy.value = column;
      sortDesc.value = false;
    }
  };

// Activate mutation
const { mutate: activateRequestCall} = useMutation(SOFT_ACTIVATE_PROFILE_BY_ID, {
  clientId: "default", 
});

// Deactivate mutation
const { mutate: deactivateRequestCall} = useMutation(SOFT_DELETE_PROFILE_BY_ID, {
  clientId: "default", 
});

// deactivate function
const deactivateRequest = async (userId: any) => {
  if (!userId) {
    console.error("Error: userId is null or undefined");
    return;
  }else{
    userId = parseInt(userId);
  }

  if (confirm("Are you sure you want to perform this action?")) {
    try {
      const response = await deactivateRequestCall({
          id: userId, // Ensure it's an integer
      });

      console.log("User soft deactivate:", response);
      location.reload();
    } catch (error) {
      console.error("Error deactivate country:", error);
    }
  }
};

// activate function
const activateRequest = async (userId: any) => {
  if (!userId) {
    console.error("Error: userId is null or undefined");
    return;
  }else{
    userId = parseInt(userId);
  }

  if (confirm("Are you sure you want to perform this action?")) {
    try {
      const response = await activateRequestCall({
          id: userId, // Ensure it's an integer
      });
      
      console.log("User soft activate:", response);
      location.reload();
    } catch (error) {
      console.error("Error activate country:", error);
    }
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
