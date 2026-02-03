<template>
  <div class="info">
    <i class="info__icon">!</i>
    <p class="info__text">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
    </p>
  </div>
</template>

<style scoped>
.info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background-color: #f2f6fc;
  border-radius: 6px;
}

.info__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #000;
  font-style: normal;
  font-size: 12px;
  font-weight: 600;
  color: #000;
  flex-shrink: 0;
}

.info__text {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: #000;
}
</style>
