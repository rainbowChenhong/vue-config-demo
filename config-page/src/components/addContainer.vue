<template>
    <add
            :dialogFormVisible="dialogFormVisible"
            :dataConfig="dataConfig"
            v-if="dialogFormVisible"
            v-model="dialogFormVisible"
            @dialogClose="onClose"
            @addSuccess="onSave"
            @updateSuccess="onUpdate"></add>
</template>

<script>
    import Add from './add.vue'
    export default {
        name: '',
        data () {
            return {}
        },
        components:{Add},
        props:{
            dialogFormVisible: Boolean,
            dataConfig:Object,
        },
        methods:{
            onClose(){
                this.$emit('dialogClose');
            },
            onSave(){
                this.$emit('dialogClose');
                this.$emit('addSuccess');
            },
            onUpdate(){
                this.$emit('dialogClose');
                this.$emit('updateSuccess');
            }
        }
    }
</script>

<style>

</style>