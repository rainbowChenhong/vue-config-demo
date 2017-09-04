<template>
    <div>
        <div class="title-nav">
            <span>配置列表</span>
            <div>
                <el-button type="primary" icon="plus" @click="addConfig()">添加</el-button>
                <el-button type="primary" icon="search" >筛选</el-button>
            </div>
        </div>
        <transition  name="search">
           <el-form>
               <el-col :span="12">
                   <el-form-item>
                   </el-form-item>
               </el-col>
           </el-form>
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
            </el-table-column>
            <el-table-column
                    sortable
                    prop="established"
                    label="成立时间"
                    min-width="150">
            </el-table-column>
            <el-table-column
                    prop="state"
                    label="操作"
                    min-width="200">
                <template scope="scope">
                    <el-button-group>
                        <el-button type="success" icon="edit" size="small"
                                  ></el-button>
                        <el-button type="danger" icon="delete" size="small"
                                  ></el-button>
                    </el-button-group>
                    <el-switch
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
                @addSuccess=""
                @updateSuccess="">

        </add-container>
    </div>
</template>

<script>
    import AddContainer from './addContainer.vue';
    export default {
        name: '',
        data () {
            return {
                tableData:[],
                dialogFormVisible:false,
                config: {},
                formSearch:{
                    currentPage:1,
                    pageSize:10
                },
                totalPage:0,
            }
        },
        components:{AddContainer},
        methods:{
            addConfig(){
                this.dialogFormVisible=true;
            },
            handleSizeChange(){

            },
            handleCurrentChange(){

            }
        }
    }
</script>

<style>
.title-nav{
    display: flex;
    padding: 25px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 3px 10px -3px #aaaaaa;
}
.pagination-container{
    width: 100%;
    text-align: right;
    padding: 25px 25px;
}
</style>