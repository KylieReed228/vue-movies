<template>
  <form @submit.prevent="submit" class="note-form">
    <v-text-field
      class="mr-10"
      v-model="searchQuery"
      type="search"
      label="What are you looking for?"
    ></v-text-field>
    <v-btn color="accent" type="submit" :loading="isLoading">
      submit
    </v-btn>
  </form>
</template>

<script>
export default {
  data () {
    return {
      searchQuery: '',
      isLoading: false
    }
  },
  methods: {
    submit () {
      if (this.searchQuery) {
        this.$emit('select-query', this.searchQuery)
      }
    }
  }
}
</script>

<style>
.note-form {
  width: 400px;
  display: flex;
  align-items: center;
}
</style>
