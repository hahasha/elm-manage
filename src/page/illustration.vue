<template>
    <div class="fillcontain">
        <Header></Header>
        <div class="illustration-wrap">
            <p>elm后台管理项目</p>
            <p>登录即自动注册为管理员</p>
        </div>
    </div>
</template>

<script>
import Header from '@/components/header'
export default {
    components: {
        Header
    }
}
</script>

<style lang="less" scoped>
.illustration-wrap{
    padding: 20px;
    color: #666;
    p {
        font-size: 16px;
        text-align: center;
        line-height: 40px;
    }
}
</style>