<template>
    <el-card class="oral-test-wrapper">
        <el-container v-if="$store.state.authority === 'student'">
            <el-aside>
                <el-tree
                    :data="chapterData"
                    :props="defaultProps"
                    node-key="id"
                    :default-expand-all="true"
                    @node-click="handleNodeClick">
                </el-tree>
            </el-aside>
            <el-main>
                <el-empty description="请选择章节进行口语测评">
                    <template #image>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#el-icon-xedia-icon__xuanzekemu"></use>
                        </svg>
                    </template>
                </el-empty>
            </el-main>
        </el-container>

        <div class="oral-test-results" v-else-if="$store.state.authority === 'teacher'">
            <div v-if="!showOralTestDetail">
                <el-table
                    :data="oralTestData"
                    stripe
                    style="width: 100%">

                    <el-table-column
                    v-for="(attribute, index) in attributeList"
                    :key="index"
                    :prop="attribute.prop"
                    :label="attribute.label"
                    sortable>
                    </el-table-column>

                    <el-table-column
                        align="right">
                        <template slot="header">
                            <el-input 
                            v-model="searchQuery"
                            placeholder="搜索测评..."
                            @input="filterOralTest"
                            class="search-box"
                            size="mini"
                            ></el-input>
                        </template>
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            type="primary"
                            @click="handlePreview(scope.$index, scope.row)">查看详情</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
            <div v-else>
                <oral-test-detail-section-vue :visible.sync="showOralTestDetail" :item="{}"/>
            </div>
        </div>
    </el-card>
</template>

<script>
import '@/icons/iconCommon/iconfont'
import OralTestDetailSectionVue from '@/components/sections/OralTestDetailSection.vue'

export default {
    components: {
        OralTestDetailSectionVue
    },
    data() {
        return {
            showOralTestDetail: false,
            chapterData: [
                {
                    id: 1,
                    label: '章节 1',
                    children: [
                        { id: 2, label: '章节 1.1' },
                        { id: 3, label: '章节 1.2' }
                    ]
                },
                {
                    id: 4,
                    label: '章节 2',
                    children: [
                        {
                            id: 5,
                            label: '章节 2.1',
                            children: [
                                { id: 6, label: '章节 2.1.1' }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            attributeList: [
                {
                    prop: "studentId",
                    label: "学号",
                },
                {
                    prop: "name",
                    label: "姓名",
                },
                {
                    prop: "practiceTime",
                    label: "练习时间",
                },
                {
                    prop: "fluencyRating",
                    label: "流利度评分",
                },
                {
                    prop: "integrityScore",
                    label: "完整度评分",
                },
                {
                    prop: "pronunciationScore",
                    label: "发音评分",
                },
                {
                    prop: "intonationScore",
                    label: "语调评分",
                },
            ],
            oralTestData: [
                {
                studentId: '123',
                name: 'AAA',
                practiceTime: '123',
                fluencyRating: '123',
                integrityScore: '123',
                pronunciationScore: '123',
                intonationScore: '123'
                }
            ],
            filteredOralTestData: [],
            searchQuery: '',
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log('Clicked node:', data);
        },
        filterOralTest() {
            this.filteredOralTestData = this.oralTestDatafilter(item => {
                return item.title.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        handlePreview(index, row) {
            this.showOralTestDetail = true;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/css/div/tool-bar/generalStyle.scss';


.oral-test-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    ::v-deep .el-card__body {
        height: 100%;
        
        .el-container {
            height: 100%;

            
        }
    }

    .el-tree {
        user-select: none;

        ::v-deep .el-tree-node__label {
            font-size: 16px;
            color: #666;
        }

        ::v-deep .el-tree-node__content {
            padding-top: 4px;
            padding-bottom: 4px;

            &:hover {
                background-color: #409EFF;
            
                .el-tree-node__label {
                    color: white;
                }
            }
        }
    }

    .el-empty {
        height: 100%;
    }

    .oral-test-results {
        display: flex;
        flex-direction: column;
    }
}

</style>