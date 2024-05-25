<template>
    <div class="page-table">
        <div class="table-scroll-container">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                @row-click="handleRowClick"
                :row-class-name="rowClassName"
                @selection-change="handleSelectionChange"
                ref="multipleTable">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="account_id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="telephone_number"
                    label="电话号码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="密码"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="user_type"
                    label="用户类型"
                    width="180">
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
import { getAccountsAPI } from '@/services/api/accountManager/getAccount';

export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            selectedRows: [],
            lastSelectedRow: null,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            // 从服务器获取数据
            const paginationInfo = {
                page: this.currentPage,
                pageSize: this.pageSize
            };

            getAccountsAPI(paginationInfo, this.$store.state.token)
                .then(response => {
                    const responseBody = response.data
                    this.total = responseBody.total
                    this.tableData = responseBody.data;
                })
                .catch(error => {
                    this.$message({
                        type: "error",
                        message: `${error}`
                    });
                });
        },
        handleCurrentChange(newPage) {
            this.currentPage = newPage;
            this.fetchData();
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.fetchData();
        },
        handleRowClick(row, event, column) {
            this.$refs.multipleTable.toggleRowSelection(row);
        },
        handleSelectionChange(val) {
            this.selectedRows = val;
            if (val.length > 0) {
                this.lastSelectedRow = val[val.length - 1]; // 保存最后一个选中的行
            } else {
                this.lastSelectedRow = null; // 如果没有行被选中，则重置
            }

            this.$emit('selected-rows-change', this.selectedRows);
        },
        rowClassName({row, rowIndex}) {
            if (this.selectedRows.includes(row)) {
                return 'highlight-row';
            }
            return '';
        }
    }
};
</script>

<style lang="scss" scoped>
.page-table {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .table-scroll-container {
        flex: 1 1 auto; 
        height: 500px;
        overflow-y: auto;
    }

    .el-pagination {
        flex: 0 0 auto;
    }
}


::v-deep .highlight-row {
    color: #409EFF;

    &:hover {
        color: #409EFF; 
    }
}
</style>
