<template>
  <v-app>
    <!--  Side Bar  -->
    <template v-if="!$route.path.includes('login')">
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :mini-variant="$vuetify.breakpoint.mdAndUp ? mini : false"
      app
      color="aside"
      dark
      style="font-family: 'PT Sans Caption', sans-serif"
      class="fill-height"
    >
      <v-card flat color="aside" class="pa-2" width="100%">
        <div class="d-flex flex-column">
          <v-avatar class="align-self-center" size="70">
            <v-img
              alt="Logo"
             :src="require('../assets/fikisha-logo.png')"
              transition="scale-transition"
            />
          </v-avatar>
        </div>

        <v-card-subtitle
          v-if="!mini"
          class="overline text-center pa-0 mt-3"
          style="line-height: 1rem"
        >
        </v-card-subtitle>
      </v-card>

      <v-divider></v-divider>

      <v-list>
        <div v-for="(item, i) in Links" :key="i">
          <v-list-group
            v-if="item.sublinks.length > 0"
            v-model="item.active"
            active-class="selectedItem"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item-group>
              <v-list-item
                v-for="(sub, s) in item.sublinks"
                :key="s"
                link
                :to="sub.to"
                active-class="selectedItem"
              >
                <v-list-item-avatar v-if="!mini"> &nbsp; </v-list-item-avatar>
                <v-list-item-icon class="mr-2">
                  <v-icon v-if="!mini">{{ sub.icon }}</v-icon>

                  <v-badge
                    v-else
                    :content="sub.value || ''"
                    :value="sub.value"
                    color="indigo indigo-darken-4"
                    overlap
                    left
                  >
                    <v-icon>{{ sub.icon }}</v-icon>
                  </v-badge>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ sub.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action v-if="sub.value">
                  <v-chip x-small color="success">
                    {{ sub.value }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>

          <v-list-item-group v-else>
            <v-list-item :to="item.to">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </div>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block text @click="logout">
            <v-icon>mdi-logout</v-icon> Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!--  App Bar  -->
    <v-app-bar app elevation="0">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mdAndUp"
        @click="mini = !mini"
      ></v-app-bar-nav-icon>
      <!--      <DashboardBreadcrumb />-->
      <v-spacer class="spacer" sm="0" />

      <!-- <v-menu v-if="actions.length > 1" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" color="warning" outlined v-on="on">
            <v-icon left>mdi-alert</v-icon>
            {{ actions.length }} actions Needs your attention
          </v-btn>
        </template>
        <v-list dense tile>
          <v-list-item v-for="(action, i) in actions" :key="i" :to="action.to">
            <v-list-item-title>
              <v-icon left :color="action.color || 'warning'">{{
                action.icon
              }}</v-icon>
              {{ action.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->

      <v-btn rounded icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            @click="
              $vuetify.breakpoint.mdAndUp
                ? (leftDrawer = !leftDrawer)
                : $router.push({ name: 'Notifications' })
            "
            rounded
            icon
          >
            <v-badge :content="1" :value="1" color="red" overlap dot>
              <v-icon>mdi-newspaper</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Notice Board</span>
      </v-tooltip>
      <!--BEGIN profile-->
      <AccountProfileDropdown :menus="menus" />
      <!--END profile dropdown-->
    </v-app-bar>

    <v-divider />
    </template>

    <v-main class="background">
          <router-view />
      <!-- <v-row class="fill-height" :no-gutters="leftDrawer">
        <v-col :cols="leftDrawer ? '9' : '12'">
          <router-view class="py-5" />
        </v-col>
        <v-col :cols="leftDrawer ? '3' : '0'">
          <v-card v-if="leftDrawer" tile elevation="0" class="fill-height">
            <v-card-title class="overline">
              Notice Board

              <v-spacer />

              <v-btn small icon @click="leftDrawer = !leftDrawer">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-card-title>
            <v-divider />

            <info-section />
          </v-card>
        </v-col>
      </v-row> -->
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

    data: () =>({
    drawer: null,
    leftDrawer: false,
    mini: false,
    selectedItem: 0,
    fav: true,
    menu: false,
    message: false,
    hints: true,
Links: [
 { 
  title: 'Customers',
  icon: 'mdi-account-check',
  to: '/customers',
    sublinks: []
 },
 {
  title: 'Orders',
  icon: 'mdi-account-check',
  to: '/appraisal/dashboard',
  sublinks: [
    {
      title: 'Pending',
      icon: 'mdi-playlist-edit',
      to: '/orders/pending',
      enable: true
    },
    {
      title: 'Loading',
      icon: 'mdi-account-multiple',
      to: '/orders/loading',
      enable: true
    },
    {
      title: 'Dispatched',
      icon: 'mdi-playlist-edit',
      to: '/orders/delivered',
      enable: true
    },
    {
      title: 'Delivered',
      icon: 'mdi-account-multiple',
      to: '/orders/delivered',
      enable: true
    }]
    },
     {
  title: 'Vehicles',
  icon: 'mdi-account-check',
  to: '/vehicles',
  sublinks: [
    {
      title: 'Available',
      icon: 'mdi-playlist-edit',
      to: '/orders/pending',
      enable: true
    },
    {
      title: 'Loading',
      icon: 'mdi-account-multiple',
      to: '/orders/loading',
      enable: true
    },
    {
      title: 'On Transit',
      icon: 'mdi-account-multiple',
      to: '/orders/loading',
      enable: true
    }
    ]}
]
   })
};
</script>
