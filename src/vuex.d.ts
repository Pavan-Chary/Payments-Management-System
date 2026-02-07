///Users/pavankumark/Documents/JavaPractice/JavaScript/payments-management-system/src/vuex.d.ts
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>
  }
}