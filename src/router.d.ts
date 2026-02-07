import 'vue-router'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: import('vue-router').Router
    $route: import('vue-router').RouteLocationNormalizedLoaded
  }
}