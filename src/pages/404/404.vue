<template>
    <div class="not-found">
        <p class="notice-chinese">没有找到这个东西</p>
        <p>o(╥﹏╥)o</p>
        <router-link :to="{name:'home'}" tag="el-button" class="el-button--success">点击这里返回首页</router-link>
    </div>
</template>

<script>
export default {
  name: 'not-found'
}
</script>

<style lang="scss" scoped>
    .not-found {
        margin-top: 150px;
        text-align: center;
        width: 100%;
        color: #b2b2b2;
        p {
            line-height: 2em;
            font-size: 1.5em;
            &.notice-chinese {
            }
        }
        .el-button.el-button--success {
            margin-top: 10px;
            color: white;
            background-color: #2aac5e;
            &:hover {
                background-color: #1fc375;
            }
        }
    }
</style>
