<template>
    <div>
      <span>
        <p></p>
      </span>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <div style="width:100%;text-align:center">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                  <el-input placeholder="请输入部门名称" v-model="filters.name" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addUser">新增</el-button>
                </el-form-item>
            </el-form>
            </div>
        </el-col>

      <div style="width:100%;text-align:center">
        <el-table :data="deptList" style="width: 100%"@selection-change="handleSelectionChange()">
            <el-table-column type="selection"  width="55"></el-table-column>
            <el-table-column prop="id" label="id" width="150">
            </el-table-column>
            <el-table-column prop="name" label="部门名字" width="150">
            </el-table-column>
            <el-table-column prop="pid" label="父ID" width="50">
            </el-table-column>
            <el-table-column prop="note" label="机构描述" width="150">
            </el-table-column>
            <el-table-column prop="createDate" label="创建日期" width="180">
            </el-table-column>
            <el-table-column prop="createBy" label="创建人" width="100">
            </el-table-column>
            <el-table-column prop="updateBy" label="修改人" width="100">
            </el-table-column>
            <!--第二步  开始进行修改和查询操作-->
            <el-table-column label="操作" align="center" min-width="200">

                <template slot-scope="scope">

                    <el-button  @click="checkDetail(scope.row)">查看详情</el-button>

                    <el-button type="primary" @click="modifyUser(scope.row)">修改</el-button>

                    <el-button type="danger" @click="deleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <!--编辑与增加的页面-->


        </el-table>
        <div style="margin-top: 10px;margin-left:10px;text-align:left">
          <el-button type="danger">批量删除</el-button>
        </div>
      </div>
        <!--新增界面-->
        <el-dialog title="记录" :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false">
            <el-form :model="addFormData" :rules="rules2" ref="addFormData" label-width="0px" class="demo-ruleForm login-container">
                <el-form-item prop="name">
                    <el-tag type="success">部门名称</el-tag>
                    <el-input type="text" v-model="addFormData.name" auto-complete="off" placeholder="部门名称"></el-input>
                </el-form-item>
                <el-form-item prop="code">
                  <el-tag type="success">部门编号</el-tag>
                  <el-input type="text" v-model="addFormData.code" auto-complete="off" placeholder="部门编号"></el-input>
                </el-form-item>
                <el-form-item prop="note">
                    <el-tag type="success">机构描述</el-tag>
                    <el-input type="text" v-model="addFormData.note" auto-complete="off" placeholder="机构描述"></el-input>
                </el-form-item>
              <el-form-item prop="pid">
                <el-tag type="success" size="50">父级ID</el-tag>
                <el-input type="text" v-model="addFormData.pid" auto-complete="off" placeholder="PID"></el-input>
              </el-form-item>
              <el-form-item prop="createBy">
                <el-tag type="success" size="50">创建人/修改人</el-tag>
                <el-input type="text" v-model="addFormData.createBy" auto-complete="off" placeholder="updateBy"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click.native="dialogVisible = false,addFormData={id:'',name:'',note:''}">取 消</el-button>
                <el-button v-if="isView" type="primary" @click.native="addSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import {
        userList
    } from '../api/api';
    import axios from 'axios';
    import qs from 'qs';
    export default {
        name: 'home',
        data() {
            return {
                deptList: [],
              multipleSelection: [],
                addFormReadOnly: true,
                dialogVisible: false,
                isView: true,
                addFormData: {
                    id: '',
                    name: '',
                    note: '',
                    pid: '',
                    code: '',
                    updateBy: ''
                },
                rules2: {
                    name: [{
                        required: true,
                        message: '部门名称不能为空',
                        trigger: 'blur'
                    }],
                    note: [{
                        required: true,
                        message: '机构描述不能为空',
                        trigger: 'blur'
                    }],
                  pid: [{
                    required: true,
                    message: '父级ID不能为空',
                    trigger: 'blur'
                  }],
                  code: [{
                    required: true,
                    message: '部门编号不能为空',
                    trigger: 'blur'
                  }],
                  createBy: [{
                    required: true,
                    message: '创建/修改人不能为空',
                    trigger: 'blur'
                  }]
                },
                filters: {
                    name: ''
                }
            }
        },
        mounted: function () {
            this.loadData();
        },

        methods: {
            loadData() {
                let param = {filter:this.filters.name};
                axios.post('/dept/list',qs.stringify(param)).then((result) => {
                    var _data = result.data;
                    this.deptList = _data
                });


            },
            getUsers() {
                this.loadData();
            },
            addUser() {
                this.addFormData = {
                    id: '',
                    name: '',
                    note: ''
                };
                this.isView = true;
                this.dialogVisible = true;
                //    this.addFormReadOnly = false;
            },
            checkDetail(rowData) {
                this.addFormData = Object.assign({}, rowData);
                this.isView = false;
                this.dialogVisible = true;

                //    this.addFormReadOnly = true;
            },
            modifyUser(rowData) {
                this.addFormData = Object.assign({}, rowData);
                this.isView = true;
                this.dialogVisible = true;
                //    this.addFormReadOnly = false;
            },
            deleteUser(rowData) {

                this.$confirm('是否删除这条记录', '信息删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'})
                  .then(()=>{
                    var params = {
                      deptid: rowData.id
                    };
                    axios.post("/dept/delete", qs.stringify(params)).then((result) => {
                      console.info(result);
                      if (result.data.success) {
                        this.$message({
                          type: 'info',
                          message: `已删除`
                        });
                      } else {
                        this.$message({
                          type: 'info',
                          message: `删除失败`
                        });

                      }
                      this.loadData();
                    });
                  }).catch(action => {
                  this.$message({
                    type: 'info',
                    message: action === 'cancel'
                      ? '放弃删除并离开页面'
                      : '停留在当前页面'
                  })
                });
                    /*callback: action => {
                        var params = {
                            deptid: rowData.id
                        };
                        axios.post("/dept/delete", qs.stringify(params)).then((result) => {
                            console.info(result);
                            if (result.data.success) {
                                this.$message({
                                    type: 'info',
                                    message: `已删除`
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: `删除失败`
                                });

                            }
                            this.loadData();
                        });

                    }
                });*/

            },
          handleSelectionChange(val) {
            this.multipleSelection = val;
            alert(this.multipleSelection);
          },
            //增加一条记录
            addSubmit() {

                //先判断表单是否通过了判断
                this.$refs.addFormData.validate((valid) => {
                    //代表通过验证 ,将参数传回后台
                    if (valid) {
                        let param = Object.assign({}, this.addFormData);
                        axios.post("/dept/submit", qs.stringify(param)).then((result) => {
                            if (result.data.success) {
                                this.$message({
                                    type: 'info',
                                    message: '添加成功',
                                });
                                this.loadData();
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '添加失败',
                                });
                            }
                            this.dialogVisible = false;
                        });
                    }

                });
            }

        }

    }
</script>

<style>
    body {
        background: #DFE9FB;
    }
</style>
