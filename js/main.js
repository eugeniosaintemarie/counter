const app = Vue.createApp({
  data() {
    return {
      title: 'Counter',
      count: 0
    } 
  },
  methods: {
    discount(limit) {this.count -= limit},
    addCount(limit) {this.count += limit},
    modCount(instruction = 'add', limit = 1)  
    {
      instruction === 'dis' 
        ? this.discount(limit)
        : this.addCount(limit)
    }
  }
})

const mountApp = app.mount('#app')