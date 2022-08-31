<template>
  <v-text-field
    :value="value"
    @input="debounceQuery"
    type="search"
    label="What are you looking for?"
  ></v-text-field>
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  props: {
    value: {
      type: String, Number,
      default: '',
      required: false
    }
  },
  data () {
    return {
      searchInput: ''
    }
  },
  methods: {
    debounceQuery: debounce(function (e) {
      this.$emit('input', e)
    }, 500)
  },
  watch: {
    query: function (val) {
      this.searchInput = val
    }
  }
}
</script>

<style></style>
