<template>
  <div>Hello Word</div>
</template>

<script setup lang='ts'>
import { UploadImgAPI } from '@/API/File';
const testAPI = async()=>{
  let data = new FormData();
  await UploadImgAPI(data).then((res) => {
          console.log(res);
      }).catch((err) => {
          console.error('Error fetching articles:', err);
      }).finally(() => {
        //无论响应是否成功都会执行
      })
}


</script>

<style scoped>

</style>