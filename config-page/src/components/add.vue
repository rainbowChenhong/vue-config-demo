<template>
    <div>
        <el-dialog title="添加配置信息"
                   v-model="dialogFormVisible"
                   :show-close="false"
                   :modal-append-to-body="false"
                   :close-on-click-modal="false">
            <el-form class="add-config">
                <el-col :span="12">
                    <el-form-item label="公司名称：" :label-width="formLabelWidth" prop="companyName">
                        <el-input placeholder="请输入公司名称"
                                  v-model="form.companyName"
                                  :disabled="dataConfig.companyName!=undefined"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="公司地址：" :label-width="formLabelWidth" prop="address">
                        <el-select v-model="form.address" placeholder="请选择公司地址"
                                   :disabled="dataConfig.companyName!=undefined">
                            <el-option
                                    v-for="item in address"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="总人数：" :label-width="formLabelWidth" prop="total">
                        <el-input placeholder="请输入总人数"
                                  v-model="form.total"
                                  :disabled="dataConfig.companyName!=undefined"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="子公司名称：" :label-width="formLabelWidth" prop="subsidiary">
                        <el-select v-model="form.subsidiary" placeholder="请选择子公司名称"
                                   :disabled="dataConfig.companyName!=undefined">
                            <el-option
                                    v-for="item in subsidiary"
                                    :key="item.key"
                                    :label="item.value"
                                    :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="成立时间：" :label-width="formLabelWidth" prop="established">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.established" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('form')">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: '',
        data () {
            return {
                form:{
                    formLabelWidth:'100px',
                    companyName:'',
                    address:'',
                    established:'',
                    subsidiary:'',

                },
                formLabelWidth: '120px',
                address:[],
                subsidiary:[],
            }
        },
        props: {
            dialogFormVisible: Boolean,
            dataConfig: Object,
        },
        methods:{
            resetForm(){
                this.$emit('dialogClose');
            },
            submitForm(){

            }
        }
    }
</script>

<style>
.add-config{
    overflow: hidden;
}
</style>