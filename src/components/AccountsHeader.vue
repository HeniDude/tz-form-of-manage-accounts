<script setup lang="ts">
const emit = defineEmits<{
  add: []
}>()
</script>

<template>
  <div class="accounts__header">
    <h1 class="accounts__title">Учетные записи</h1>
    <el-button class="accounts__add" circle @click="emit('add')">+</el-button>
  </div>
</template>

<style scoped>
.accounts__header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accounts__title {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.accounts__add {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 18px;
  line-height: 1;
}
</style>
