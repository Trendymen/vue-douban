<template>
    <div class="not-found">
        <p class="notice-chinese">没有找到这个东西</p>
        <p>o(╥﹏╥)o</p>
        <v-btn
                class="el-button--success"
                :to="{name:'home'}"
                tag="v-btn "
                color="success"
        >
            点击这里返回首页
        </v-btn>
        <!--<router-link ></router-link>-->
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
        p {
            color: #b2b2b2;
            line-height: 2em;
            font-size: 1.5em;
            &.notice-chinese {
            }
        }
        .el-button {
            &.el-button--success {
                margin-top: 10px;
                background-color: #2aac5e;
                color: white;
                span {
                    color: white;
                }
                &:hover {
                    background-color: #1fc375;
                }
            }
        }
    }
</style>
