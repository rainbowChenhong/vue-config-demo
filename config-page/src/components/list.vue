<template>
    <div>
        <div class="title-nav">
            <span>配置列表</span>
            <div>
                <el-button type="primary" icon="plus" @click="addConfig()">添加</el-button>
                <el-button type="primary" icon="search" @click="searchShow = !searchShow">筛选</el-button>
            </div>
        </div>
        <transition name="search">
            <div class="search-content "  v-show="searchShow">
                <el-form :model="formSearch" ref="formSearch">
                    <el-row :gutter="20">
                        <el-col :span="7">
                            <el-form-item label="公司名称：" :label-width="formLabelWidth" prop="companyName">
                                    <el-input placeholder="请输入公司名称"
                                              v-model="formSearch.companyName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="公司地址：" :label-width="formLabelWidth" prop="address">
                                <el-select v-model="formSearch.address" placeholder="请选择公司地址">
                                    <el-option
                                            v-for="item in address"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="总人数：" :label-width="formLabelWidth" prop="total">
                                <el-input placeholder="请输入总人数"
                                          v-model="formSearch.total"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="7">
                            <el-form-item label="子公司名称：" :label-width="formLabelWidth" prop="subsidiary">
                                <el-select v-model="formSearch.subsidiary" placeholder="请选择子公司名称"
                                >
                                    <el-option
                                            v-for="item in subsidiary"
                                            :key="item.key"
                                            :label="item.value"
                                            :value="item.key">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="成立时间：" :label-width="formLabelWidth" prop="established">
                                <el-date-picker
                                        v-model="formSearch.established"
                                        type="date"
                                        placeholder="选择日期"
                                        @change="getEstablished"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item>
                                <el-button @click="resetForm('formSearch')">重置</el-button>
                                <el-button type="primary" @click="submitForm('formSearch')">确定</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </transition>
        <el-table class="content-list" :data="tableData">
            <el-table-column
                    prop="companyName"
                    label="公司名称"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="公司地址"
                    min-width="150">
                <template scope="scope">
                    {{getAddressText(scope.row.address)}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="total"
                    label="总人数"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="subsidiary"
                    label="子公司"
                    min-width="150">
                <template scope="scope">
                    {{getSubsidiaryText(scope.row.subsidiary)}}
                </template>
            </el-table-column>
            <el-table-column
                    sortable
                    prop="established"
                    label="成立时间"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    sortable
                    prop="remark"
                    label="备注"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="操作"
                    min-width="200">
                <template scope="scope">
                    <el-button-group>
                        <el-button type="success" icon="edit" size="small"
                                   @click="showDialog(scope.row)"  ></el-button>
                        <el-button type="danger" icon="delete" size="small"
                                   @click="deleteConfig(scope.row._id)"></el-button>
                    </el-button-group>
                    <el-switch
                            @change="updateConfig(scope.row)"
                            v-model="scope.row.status"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination
                    layout="prev, pager, next"
                    :total="totalPage"
                    :page-size="formSearch.pageSize"
                    @size-change="handleSizeChange"
                    :current-page.sync="formSearch.currentPage"
                    @current-change="handleCurrentChange">
            </el-pagination>
        </div>
        <add-container
                :dialogFormVisible="dialogFormVisible"
                :dataConfig="config"
                @dialogClose="dialogFormVisible=false"
                @addSuccess="resetForm('formSearch')"
                @updateSuccess="requestList(formSearch)">

        </add-container>
    </div>
</template>

<script>
    import AddContainer from './addContainer.vue';
    import API from './../api/index';
    import {addressText, subsidiaryText, address, subsidiary} from './../utils/index';
    export default {
        name: '',
        data () {
            return {
                tableData: [],
                dialogFormVisible: false,
                searchShow: false,
                config: {},
                formSearch: {
                    companyName: '',
                    address: '',
                    established: '',
                    subsidiary: '',
                    currentPage: 1,
                    pageSize: 10
                },
                totalPage: 0,
                formLabelWidth: '100px',
                address: address,
                subsidiary: subsidiary,
            }
        },
        components: {AddContainer},
        mounted(){
            this.requestList()
        },
        methods: {
            addConfig(){
                this.config = {}
                this.dialogFormVisible = true;
            },
            requestList(data){
                API.queryList(data).then((res) => {
                    this.totalPage = res.count;
                    if (res.data) {
                        this.tableData = res.data;
                        return
                    }
                    this.tableData = []
                })
            },
            initQueryList(){
                this.formSearch.currentPage=1;
                this.requestList(this.formSearch);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.initQueryList();
                this.searchShow = false;
            },
            submitForm(formName){
                this.initQueryList();
                this.searchShow = false;

            },
            handleCurrentChange(val){
                this.formSearch.currentPage = val;
                this.requestList(this.formSearch);
            },
            handleSizeChange(){
                this.initQueryList()
            },
            getAddressText(item){
                return addressText[item]
            },
            getSubsidiaryText(item){
                return subsidiaryText[item]
            },
            updateConfig(row){
                API.updateCompany({'id': row._id, 'status': row.status}).then((res) => {
                    let str = '';
                    if (status) {
                        str = '开启成功'
                    } else {
                        str = '关闭成功'
                    }
                    this.$message({
                        showClose: true,
                        message: str,
                        type: 'success'
                    });
                });
            },
            getEstablished(val){
                this.formSearch.established=val;
            },
            deleteConfig(id){
                this.$confirm('是否确认删除该条记录？')
                    .then(_ => {
                        API.deleteCompany({'id': id}).then((res) => {
                            this.requestList(this.formSearch);
                            this.$message({
                                showClose: true,
                                message: '删除成功',
                                type: 'success'
                            });
                        });
                    })
                    .catch(_ => {
                    });

            },
            showDialog(row){
                this.dialogFormVisible = true;
                this.config = row;
            },
        }
    }
</script>

<style>
    .title-nav {
        display: flex;
        padding: 25px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 3px 10px -3px #aaaaaa;
        position: relative;
        z-index:10;
    }

    .pagination-container {
        width: 100%;
        text-align: right;
        padding: 25px 25px;
    }

    .search-content {
        position: absolute;
        top: 86px;
        width: 100%;
        padding: 10px 25px 0px;
        z-index: 9;
        background: #ffffff;
    }

    .search-content .el-select, .search-content .el-date-editor {
        width: 100%;
    }
    /*过渡*/
    .search-enter-active, .search-leave-active {
        transition: all .5s ease
    }

    .search-enter, .search-leave-to {
        opacity: 0;
        transform: translateY(-75px);
    }

</style>