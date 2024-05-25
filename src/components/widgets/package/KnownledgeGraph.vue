<template>
    <div ref="chart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import * as echarts from 'echarts';
import { forceDirectedLayout } from '@/functions/forceDirectedLayout';
import { stringGenerateColor } from '@/functions/stringGenerateColor';

export default {
    name: 'KnowledgeGraph',
    props: {
        nodes: {
            type: Array,
            required: true
        },
        links: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            isStudent: false
        }
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            const myChart = echarts.init(this.$refs.chart);

            // 显示加载动画
            myChart.showLoading();

            // 模拟异步获取数据
            setTimeout(() => {
                // 隐藏加载动画
                myChart.hideLoading();

                // 假设的图数据
                const graph = this.getGraphData();

                // 对节点的处理，例如基于symbolSize设置label显示

                // 配置项设置
                const option = {
                    title: {
                        text: this.isStudent ? '学习图谱' : '知识图谱',
                        subtext: 'Default layout',
                        top: 'bottom',
                        left: 'right'
                    },
                    tooltip: {},
                    legend: [
                        {
                            data: graph.categories.map(function (a) {
                                return a.name;
                            })
                        }
                    ],
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            name: this.isStudent ? '学习图谱' : '知识图谱',
                            type: 'graph',
                            layout: 'none',
                            data: graph.nodes,
                            links: graph.links,
                            categories: graph.categories,
                            roam: true,
                            lineStyle: {
                                color: 'source',
                                curveness: 0.3
                            },
                            emphasis: {
                                focus: 'adjacency',
                                lineStyle: {
                                    width: 10
                                }
                            }
                        }
                    ]
                };

                // 应用配置项
                myChart.setOption(option);
            }, 1000);
        },
        calculateWeightProportion(items, item) {
            const sameLayoutItems = items.filter(it => it.layout === item.layout);
            const totalWeight = sameLayoutItems.reduce((sum, it) => sum + it.weight, 0);
            
            if (totalWeight > 0) {
                return item.weight / totalWeight;
            } else {
                return 0; // 如果总和为0，返回0
            }
        },
        calculateLayout(item) {
            const parts = item.layout.split('-');
            return Math.pow(5, -parts.length);
        },
        countSourceAndTarget() {
            const countMap = new Map();

            // 辅助函数，用于增加Map中对应键的计数
            function incrementCount(key) {
                if (countMap.has(key)) {
                    countMap.set(key, countMap.get(key) + 1);
                } else {
                    countMap.set(key, 1);
                }
            }

            // 遍历每个项目，对source和target进行计数
            this.links.forEach(item => {
                incrementCount(item.source);
                incrementCount(item.target);
            });
            return countMap;
        },
        mergeCountsIntoObjects(objects) {
            return objects.map(obj => {
                // 从countsMap中获取对应Id的计数值
                return {
                    ...obj,
                    symbolSize: this.calculateWeightProportion(objects, obj) * 1000 * this.calculateLayout(obj) // 基准大小：100
                };
            });
        },
        mergeStyleIntoObject(objects) {
            const textStyleObjects = objects.map(obj => {
                return {
                    ...obj,
                    label: { "show": true, position: 'bottom' },
                };
            });
            if (this.isStudent) {
                // 根据学习进度设置覆层
                // const coverObjects = 

                return textStyleObjects.map(obj => {
                    return {
                        ...obj,
                        itemStyle: {borderColor: "black", borderWidth: 1, color: "white"}
                    }
                })
            } else {
                return textStyleObjects;
            }
        },
        calculateCategories() {
            let categoryList = new Set([]);
            this.nodes.forEach((value, index) => {
                categoryList.add(value.category)
            })
            // { label: '类别1', value: 'category1' },
            let categoryOptionList = [];
            let categoryArray = [...categoryList];
            for(let i = 0; i < categoryArray.length; i++) {
                const categoryName = categoryArray[i]
                const categoryOption = {
                    name: categoryName,
                    itemStyle: { color: stringGenerateColor(categoryName) }
                }
                categoryOptionList.push(categoryOption)
            }
            return categoryOptionList;
        },
        getGraphData() {
            const nodesWithPosition = forceDirectedLayout(this.nodes,10000,1000000,1000,100)
            const nodesWithSize = this.mergeCountsIntoObjects(nodesWithPosition);
            const nodesWithStyle = this.mergeStyleIntoObject(nodesWithSize);
            return {
                nodes: nodesWithStyle,
                links: this.links,
                categories: this.calculateCategories()
            };
        }
    }
};

// [
//                     // 总节点
//                     {"id": "A", "name": "听力基础 Basic Listening", "symbolSize": 70, "x": 300, "y": 150, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"}},
//                     {"id": "B", "name": "听力技巧 Listening Techniques", "symbolSize": 50, "x": 500, "y": 150, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "C", "name": "听力实践 Listening Practice", "symbolSize": 60, "x": 400, "y": 300, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "D", "name": "文化意识 Cultural Awareness", "symbolSize": 40, "x": 150, "y": 250, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "E", "name": "语言环境 Language Context", "symbolSize": 40, "x": 650, "y": 250, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "A1", "name": "语音识别 Phonetic Recognition", "symbolSize": 30, "x": 300, "y": 50, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "A2", "name": "词汇理解 Vocabulary Comprehension", "symbolSize": 30, "x": 300, "y": 100, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "A3", "name": "语法结构 Grammatical Structures", "symbolSize": 30, "x": 300, "y": 200, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "B1", "name": "注意力集中 Concentration", "symbolSize": 20, "x": 500, "y": 50, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "B2", "name": "预测内容 Anticipation", "symbolSize": 20, "x": 500, "y": 100, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "B3", "name": "关键词捕捉 Key Word Identification", "symbolSize": 20, "x": 500, "y": 200, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "B4", "name": "信息整合 Information Integration", "symbolSize": 20, "x": 500, "y": 250, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "C1", "name": "日常对话听力 Daily Conversation Listening", "symbolSize": 20, "x": 400, "y": 350, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "C2", "name": "学术听力 Academic Listening", "symbolSize": 20, "x": 400, "y": 400, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "C3", "name": "新闻听力 News Listening", "symbolSize": 20, "x": 400, "y": 450, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "C4", "name": "娱乐媒体听力 Entertainment Media Listening", "symbolSize": 20, "x": 400, "y": 500, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "D1", "name": "习俗与礼仪 Customs and Etiquette", "symbolSize": 20, "x": 150, "y": 300, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "D2", "name": "节日与庆典 Festivals and Celebrations", "symbolSize": 20, "x": 150, "y": 400, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "D3", "name": "历史与地理 History and Geography", "symbolSize": 20, "x": 150, "y": 350, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "E1", "name": "正式与非正式场合 Formal and Informal Contexts", "symbolSize": 20, "x": 650, "y": 300, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "E2", "name": "专业术语 Professional Terminology", "symbolSize": 20, "x": 650, "y": 350, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "E3", "name": "口音差异 Accent Variations", "symbolSize": 20, "x": 650, "y": 400, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     {"id": "E4", "name": "语速变化 Speech Rate Variations", "symbolSize": 20, "x": 650, "y": 450, "label": { "show": true, position: 'bottom' }, itemStyle: {borderColor: "black", borderWidth: 1, color: "white"} },
//                     // 学生进度节点
//                     {"id": "C-A", "name": "", "symbolSize": 20, "x": 300, "y": 150, "label": { "show": true, position: 'bottom' }, "category": 0  },
//                     {"id": "C-B", "name": "", "symbolSize": 10, "x": 500, "y": 150, "label": { "show": true, position: 'bottom' }, "category": 1  },
//                     {"id": "C-C", "name": "", "symbolSize": 50, "x": 400, "y": 300, "label": { "show": true, position: 'bottom' }, "category": 2  },
//                     {"id": "C-D", "name": "", "symbolSize": 20, "x": 150, "y": 250, "label": { "show": true, position: 'bottom' }, "category": 3  },
//                     {"id": "C-E", "name": "", "symbolSize": 20, "x": 650, "y": 250, "label": { "show": true, position: 'bottom' }, "category": 4  },
//                     {"id": "C-A1", "name": "", "symbolSize": 10, "x": 300, "y": 50, "label": { "show": true, position: 'bottom' }, "category": 0  },
//                     {"id": "C-A2", "name": "", "symbolSize": 20, "x": 300, "y": 100, "label": { "show": true, position: 'bottom' }, "category": 0  },
//                     {"id": "C-A3", "name": "", "symbolSize": 30, "x": 300, "y": 200, "label": { "show": true, position: 'bottom' }, "category": 0  },
//                     {"id": "C-B1", "name": "", "symbolSize": 20, "x": 500, "y": 50, "label": { "show": true, position: 'bottom' }, "category": 1  },
//                     {"id": "C-B2", "name": "", "symbolSize": 10, "x": 500, "y": 100, "label": { "show": true, position: 'bottom' }, "category": 1  },
//                     {"id": "C-B3", "name": "", "symbolSize": 20, "x": 500, "y": 200, "label": { "show": true, position: 'bottom' }, "category": 1  },
//                     {"id": "C-B4", "name": "", "symbolSize": 20, "x": 500, "y": 250, "label": { "show": true, position: 'bottom' }, "category": 1  },
//                     {"id": "C-C1", "name": "", "symbolSize": 20, "x": 400, "y": 350, "label": { "show": true, position: 'bottom' }, "category": 2  },
//                     {"id": "C-C2", "name": "", "symbolSize": 10, "x": 400, "y": 400, "label": { "show": true, position: 'bottom' }, "category": 2  },
//                     {"id": "C-C3", "name": "", "symbolSize": 10, "x": 400, "y": 450, "label": { "show": true, position: 'bottom' }, "category": 2  },
//                     {"id": "C-C4", "name": "", "symbolSize": 20, "x": 400, "y": 500, "label": { "show": true, position: 'bottom' }, "category": 2  },
//                     {"id": "C-D1", "name": "", "symbolSize": 0, "x": 150, "y": 300, "label": { "show": true, position: 'bottom' }, "category": 3  },
//                     {"id": "C-D2", "name": "", "symbolSize": 0, "x": 150, "y": 400, "label": { "show": true, position: 'bottom' }, "category": 3  },
//                     {"id": "C-D3", "name": "", "symbolSize": 0, "x": 150, "y": 350, "label": { "show": true, position: 'bottom' }, "category": 3  },
//                     {"id": "C-E1", "name": "", "symbolSize": 20, "x": 650, "y": 300, "label": { "show": true, position: 'bottom' }, "category": 4  },
//                     {"id": "C-E2", "name": "", "symbolSize": 20, "x": 650, "y": 350, "label": { "show": true, position: 'bottom' }, "category": 4  },
//                     {"id": "C-E3", "name": "", "symbolSize": 10, "x": 650, "y": 400, "label": { "show": true, position: 'bottom' }, "category": 4  },
//                     {"id": "C-E4", "name": "", "symbolSize": 10, "x": 650, "y": 450, "label": { "show": true, position: 'bottom' }, "category": 4  },
//                 ]

// [
//                     {"id": "A", "name": "听力基础 Basic Listening", "symbolSize": 70, "x": 300, "y": 150, "label": { "show": true, position: 'bottom' }, "category": 0 },
//                     {"id": "B", "name": "听力技巧 Listening Techniques", "symbolSize": 50, "x": 500, "y": 150, "label": { "show": true, position: 'bottom' }, "category": 1 },
//                     {"id": "C", "name": "听力实践 Listening Practice", "symbolSize": 60, "x": 400, "y": 300, "label": { "show": true, position: 'bottom' }, "category": 2 },
//                     {"id": "D", "name": "文化意识 Cultural Awareness", "symbolSize": 40, "x": 150, "y": 250, "label": { "show": true, position: 'bottom' }, "category": 3 },
//                     {"id": "E", "name": "语言环境 Language Context", "symbolSize": 40, "x": 650, "y": 250, "label": { "show": true, position: 'bottom' }, "category": 4 },
//                     {"id": "A1", "name": "语音识别 Phonetic Recognition", "symbolSize": 30, "x": 300, "y": 50, "label": { "show": true, position: 'bottom' }, "category": 0 },
//                     {"id": "A2", "name": "词汇理解 Vocabulary Comprehension", "symbolSize": 30, "x": 300, "y": 100, "label": { "show": true, position: 'bottom' }, "category": 0 },
//                     {"id": "A3", "name": "语法结构 Grammatical Structures", "symbolSize": 30, "x": 300, "y": 200, "label": { "show": true, position: 'bottom' }, "category": 0 },
//                     {"id": "B1", "name": "注意力集中 Concentration", "symbolSize": 20, "x": 500, "y": 50, "label": { "show": true, position: 'bottom' }, "category": 1 },
//                     {"id": "B2", "name": "预测内容 Anticipation", "symbolSize": 20, "x": 500, "y": 100, "label": { "show": true, position: 'bottom' }, "category": 1 },
//                     {"id": "B3", "name": "关键词捕捉 Key Word Identification", "symbolSize": 20, "x": 500, "y": 200, "label": { "show": true, position: 'bottom' }, "category": 1 },
//                     {"id": "B4", "name": "信息整合 Information Integration", "symbolSize": 20, "x": 500, "y": 250, "label": { "show": true, position: 'bottom' }, "category": 1 },
//                     {"id": "C1", "name": "日常对话听力 Daily Conversation Listening", "symbolSize": 20, "x": 400, "y": 350, "label": { "show": true, position: 'bottom' }, "category": 2 },
//                     {"id": "C2", "name": "学术听力 Academic Listening", "symbolSize": 20, "x": 400, "y": 400, "label": { "show": true, position: 'bottom' }, "category": 2 },
//                     {"id": "C3", "name": "新闻听力 News Listening", "symbolSize": 20, "x": 400, "y": 450, "label": { "show": true, position: 'bottom' }, "category": 2 },
//                     {"id": "C4", "name": "娱乐媒体听力 Entertainment Media Listening", "symbolSize": 20, "x": 400, "y": 500, "label": { "show": true, position: 'bottom' }, "category": 2 },
//                     {"id": "D1", "name": "习俗与礼仪 Customs and Etiquette", "symbolSize": 20, "x": 150, "y": 300, "label": { "show": true, position: 'bottom' }, "category": 3 },
//                     {"id": "D2", "name": "节日与庆典 Festivals and Celebrations", "symbolSize": 20, "x": 150, "y": 400, "label": { "show": true, position: 'bottom' }, "category": 3 },
//                     {"id": "D3", "name": "历史与地理 History and Geography", "symbolSize": 20, "x": 150, "y": 350, "label": { "show": true, position: 'bottom' }, "category": 3 },
//                     {"id": "E1", "name": "正式与非正式场合 Formal and Informal Contexts", "symbolSize": 20, "x": 650, "y": 300, "label": { "show": true, position: 'bottom' }, "category": 4 },
//                     {"id": "E2", "name": "专业术语 Professional Terminology", "symbolSize": 20, "x": 650, "y": 350, "label": { "show": true, position: 'bottom' }, "category": 4 },
//                     {"id": "E3", "name": "口音差异 Accent Variations", "symbolSize": 20, "x": 650, "y": 400, "label": { "show": true, position: 'bottom' }, "category": 4 },
//                     {"id": "E4", "name": "语速变化 Speech Rate Variations", "symbolSize": 20, "x": 650, "y": 450, "label": { "show": true, position: 'bottom' }, "category": 4 },
//                 ]
</script>

<style scoped>
:host {
    width: 100%; /* Ensure the component fills the parent */
    height: 100%; /* Ensure the component fills the parent */
}
</style>

