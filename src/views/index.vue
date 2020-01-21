<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data="tabbarData"/>
    </div>
</template>

<script>
    // indev.vue 是首页
    // index页面上包括了 Home Order Me
    import TabBar from "../components/TaBar";
    export default {
        name: "index",
        data() {
            return {
                tabbarData: [
                    { title: "首页", icon: "home", path: "/home" },
                    { title: "订单", icon: "file-text-o", path: "/order" },
                    { title: "我的", icon: "user", path: "/me" }
                ]
            };
        },
        // 注册子组件
        components: {
            TabBar
        }
    };
</script>

<style scoped>
    .index {
        width: 100%;
        height: calc(100% - 45px);
    }
</style>
