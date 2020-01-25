<template>
    <!-- hideView是点击自己的时候才触发这个事件 -->
    <div :class="{'open':isSort || isScreen}" @click.self="hideView">
        <!-- 导航 -->
        <div v-if="filterData" class="filter_wrap">
            <aside class="filter">
                <div
                        class="filter-nav"
                        v-for="(item, index) in filterData.navTab"
                        :key="index"
                        :class="{'filter-bold':currentFilter==index}"
                        @click="filterSort(index)"
                >
                    <span>{{item.name}}</span>
                    <i v-if="item.icon" :class="'fa fa-'+item.icon"></i>
                </div>
            </aside>
        </div>
        <!-- 排序 -->
        <section class="filter-extend" v-if="isSort">
            <ul>
                <li v-for="(item,index) in filterData.sortBy" :key="index" @click="selectSort(item,index)">
                    <span :class="{'selectName':currentSort == index}">{{item.name}}</span>
                    <i v-show="currentSort == index" class="fa fa-check"></i>
                </li>
            </ul>
        </section>
        <!-- 筛选 -->
        <section class="filter-extend" v-if="isScreen">
            <div class="filter-sort">
                <div v-for="(screen,index) in filterData.screenBy" :key="index" class="morefilter">
                    <p class="title">{{screen.title}}</p>
                    <ul>
                        <li
                                v-for="(item,i) in screen.data"
                                :key="i"
                                :class="{'selected':item.select}"
                                @click="selectScreen(item,screen)"
                        >
                            <img v-if="item.icon" :src="item.icon" alt>
                            <span>{{item.name}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="morefilter-btn">
                <!-- edit是一个计算属性 -->
                <span @click="clearFilter" :class="{'edit':edit}" class="morefilter-clear">清空</span>
                <span @click="filterOk" class="morefilter-ok">确定</span>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "FilterView",
        data() {
            return {
                // currentFilter 代表点击 综合排序、距离最近、品质联盟的字体加粗
                currentFilter: 0,
                // isSort 代表点击综合排序出现的一个模板
                isSort: false,
                // currentSort 代表综合排序模板里面的字体颜色和√是否为蓝
                currentSort: 0,
                // isScreen 代表是否显示 筛选 的模板
                isScreen: false
            };
        },
        computed: {
            // 判断商家服务、优惠活动、人均消费，有没有一个被选中
            // 如果其中有一个按钮被选中，那么清空按钮的样式要改变。
            edit() {
                let edit = false;
                this.filterData.screenBy.forEach(screen => {
                    screen.data.forEach(item => {
                        if (item.select) {
                            edit = true;
                        }
                    });
                });
                return edit;
            }
        },
        props: {
            filterData: Object
        },
        methods: {
            // filterSort是让点击哪个下标时候字体加粗
            filterSort(index) {
                this.currentFilter = index;
                switch (index) {
                    case 0:
                        this.isSort = true;
                        // searchFixed在Home.Vue组件触发，，点击综合排序的时候将搜索框固定在最上面
                        this.$emit("searchFixed", true);
                        break;
                    case 1:
                        this.$emit("update", {
                            // 根据距离排序
                            condition: this.filterData.navTab[1].condition
                        });
                        this.hideView();
                        break;
                    case 2:
                        this.$emit("update", {
                            // 根据品质联盟排序
                            condition: this.filterData.navTab[2].condition
                        });
                        this.hideView();
                        break;
                    case 3:
                        this.isScreen = true;
                        this.isSort = false;
                        // 传true过去让模板页显示出来
                        this.$emit("searchFixed", true);
                        break;
                    default:
                        this.hideView();
                        break;
                }
            },
            // hideView 隐藏综合排序的模板
            hideView() {
                this.isSort = false;
                this.isScreen = false;
                // 传false过去让模板页隐藏
                this.$emit("searchFixed", false);
            },
            // selectSort 代表选择综合排序里面的排序方式，改变
            selectSort(item, index) {
                this.currentSort = index;
                this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
                this.hideView();

                // 根据选择的排序方式
                // 在Home.Vue里面更新数据
                this.$emit("update", { condition: item.code });
            },
            // 筛选里面的 只有商家服务可以多选
            selectScreen(item, screen) {
                if (screen.id !== "MPI") {
                    // 单选
                    screen.data.forEach(ele => {
                        ele.select = false;
                    });
                }
                item.select = !item.select;
            },
            // 点击清空按钮，清空所有选中的按钮。
            clearFilter() {
                this.filterData.screenBy.forEach(screen => {
                    screen.data.forEach(item => {
                        item.select = false;
                    });
                });
            },
            /*
            当在筛选中，选择某个标签后，点击确定后触发的事件
            这里只做了蜂鸟转送的筛选，其他都是一样的。
             */
            filterOk() {
                let screenData = {
                    MPI: "",
                    offer: "",
                    per: ""
                };
                let mpiStr = "";
                this.filterData.screenBy.forEach(screen => {
                    screen.data.forEach((item, index) => {
                        if (item.select) {
                            // 两种情况 1.多选 2.单选
                            if (screen.id !== "MPI") {
                                // 单选
                                screenData[screen.id] = item.code;
                            } else {
                                // 多选 fengniao,pinpai
                                mpiStr += item.code + ",";
                                screenData[screen.id] = mpiStr;
                            }
                        }
                    });
                });
                // console.log(mpiStr);
                // 让Home.vue触发update事件，然后更新首页筛选出来的数据
                this.$emit("update", { condition: screenData });
                this.hideView();
            }
        }
    };
</script>

<style scoped>
    .filter_wrap {
        background: #fff;
        position: sticky;
        top: 54px;
        z-index: 10;
    }
    .filter {
        position: relative;
        border-bottom: 1px solid #ddd;
        line-height: 10.4vw;
        z-index: 101;
        height: 10.666667vw;
        display: flex;
        justify-content: space-around;
    }
    .filter-nav {
        flex: 1;
        text-align: center;
        color: #666;
        font-size: 0.8333rem;
    }
    .filter-nav i {
        width: 1.6vw;
        height: 0.8vw;
        margin-left: 1.333333vw;
        margin-bottom: 0.533333vw;
        fill: #333;
        will-change: transform;
    }

    .filter-bold {
        font-weight: 600;
        color: #333;
    }

    .open {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease-in-out;
        z-index: 3;
    }

    .filter-extend {
        background-color: #fff;
        color: #333;
        padding-top: 2.133333vw;
        position: absolute;
        width: 100%;
        z-index: 4;
        left: 0;
        top: 24.533333vw;
    }
    .filter-extend li {
        position: relative;
        padding-left: 5.333333vw;
        line-height: 10.666667vw;
        overflow: hidden;
    }
    .fa-check {
        float: right;
        color: #009eef;
        margin-right: 3.733333vw;
        line-height: 10.666667vw;
    }

    .selectName {
        color: #009eef;
    }
    /* 筛选 */
    .filter-sort {
        background: #fff;
        padding: 0 2.666667vw;
        line-height: normal;
    }
    .morefilter {
        margin: 2.666667vw 0;
        overflow: hidden;
    }
    .morefilter .title {
        margin-bottom: 2vw;
        color: #666;
        font-size: 0.5rem;
    }
    .morefilter ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        font-size: 0.8rem;
    }
    .morefilter li {
        box-sizing: border-box;
        width: 30%;
        height: 9.333333vw;
        line-height: 9.333333vw;
        margin: 0.8vw 1%;
        background: #fafafa;
    }
    .morefilter li img {
        width: 3.466667vw;
        height: 3.466667vw;
        vertical-align: middle;
        margin-right: 0.8vw;
    }
    .morefilter li span {
        margin-left: 2%;
        vertical-align: middle;
    }

    .morefilter-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fafafa;
        box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
        line-height: 11.466667vw;
        box-sizing: border-box;
    }
    .morefilter-btn span {
        font-size: 0.826667rem;
        text-align: center;
        text-decoration: none;
        flex: 1;
    }
    .morefilter-clear {
        color: #ddd;
        background: #fff;
    }
    .morefilter-ok {
        color: #fff;
        background: #00d762;
        border: 0.133333vw solid #00d762;
    }

    .selected {
        color: #3190e8 !important;
        background-color: #edf5ff !important;
    }

    .edit {
        color: #333 !important;
    }
</style>
