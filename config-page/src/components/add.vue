<template>
    <div>
        <el-dialog title="添加配置信息"
                   v-model="dialogFormVisible"
                   :show-close="false"
                   :modal-append-to-body="false"
                   :close-on-click-modal="false">
            <el-form class="add-config" :model="form"  ref="form" :rules="rules">
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
                                  ></el-input>
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
                        <el-date-picker
                                v-model="form.established"
                                type="date"
                                placeholder="选择日期"
                                @change="getEstablished"
                               >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item  label="备注：" :label-width="formLabelWidth" >
                        <el-input placeholder="请输入备注"
                                  v-model="form.remark"
                                  ></el-input>
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
    import {address,subsidiary} from './../utils/index';
    import API from './../api/index';
    export default {
        name: '',
        data () {
            let validateEstablished=(rule, value, callback)=>{
                if(!value){
                    callback(new Error('请选择成立时间'));
                }
                callback()
            };
            return {
                form:{
                    companyName:'',
                    address:'',
                    established:'',
                    subsidiary:'',
                    status:true,
                    remark:''
                },
                formLabelWidth: '120px',
                address:address,
                subsidiary:subsidiary,
                rules:{
                    companyName: [{required: true, message: '请输入公司名字', trigger: 'change'}],
                    address: [{required: true, message: '请选择公司地址', trigger: 'change'}],
                    total: [{required: true, message: '请输入总人数', trigger: 'change'}],
                    subsidiary:[{required: true, message: '请选择子公司名称', trigger: 'change'}],
                    established:[{validator: validateEstablished, trigger: 'change'}],
                    }

            }
        },
        props: {
            dialogFormVisible: Boolean,
            dataConfig: Object,
        },
        mounted(){
            if(this.dataConfig.companyName!==undefined){
                this.form={...this.dataConfig}
            }
        },
        methods:{
            getEstablished(val){
              this.form.established=val;
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
                this.$refs[formName].resetFields();
                this.$emit('dialogClose');
            },
            submitForm(formName){
                this.$refs[formName].validate((valid) =>{
                    if (valid) {
                        if (!this.dataConfig.companyName){
                            API.addCompany(this.form).then((res)=>{
                                this.$message({
                                    showClose: true,
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$emit('dialogClose');
                                this.$emit('addSuccess');
                                this.resetForm('form')
                            });
                        }else{
                            this.form.id = this.dataConfig._id;
                            this.updateConfig(this.form);
                        }

                    }
                })
            },
            updateConfig(data){
                API.updateCompany(data).then((res) => {
                    this.$message({
                        showClose: true,
                        message: '更新成功',
                        type: 'success'
                    });
                    this.$emit('dialogClose');
                    this.$emit('updateSuccess');
                    this.resetForm('form')
                }).catch((err) => {
                    this.$message({
                        showClose: true,
                        message: err.mes,
                        type: 'error'
                    });
                });
            },
        }
    }
</script>

<style>
.add-config{
    overflow: hidden;
}
</style>