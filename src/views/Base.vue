<template>
  <v-app>
    <v-card>
      <v-navigation-drawer
        app
        permanent
        expand-on-hover
        :style="{ 'z-index': 300 }"
      >
        <template v-slot:append>
          <v-img class="ma-2" src="@/assets/logo2.png" />
          <v-list-item-icon>
            <v-icon @click="linkToGitHub">mdi-github</v-icon>
          </v-list-item-icon>
        </template>
        <v-divider />
        <v-list>
          <v-list-item
            v-for="item in DrawerItems"
            :key="item.title"
            :to="item.to"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>

    <v-main>
      <v-container fluid class="mx-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Base",

  data: () => ({
    DrawerItems: [
      { title: "Home", icon: "mdi-home", to: { name: "Home" } },
      { title: "Single", icon: "mdi-account", to: "Single" },
      { title: "VS CPU", icon: "mdi-head-snowflake", to: "Computer" }
    ]
  }),
  methods: {
    linkToGitHub() {
      window.open("https://github.com/cornercrap/master-mind", "_blank");
    }
  }
};
</script>
