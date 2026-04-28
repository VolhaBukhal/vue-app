<script setup>
const props = defineProps({
  done: Boolean,
  text: String,
})

const emit = defineEmits(['update:done'])
</script>

<template>
  <div class="list-item-left">
    <input type="checkbox" :checked="done" @change="(e) => emit('update:done', e.target.checked)" />
    <span :class="{ done: done }">{{ text }}</span>
  </div>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
