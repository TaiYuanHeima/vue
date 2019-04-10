<template>
  <div style="margin-left:20px">
    <el-container>
      <el-header style="padding: 0px;display:flex;justify-content:space-between;align-items: center">
        <div style="display: inline">
          <el-input
            placeholder="通过员工名搜索员工,记得回车哦..."
            clearable
            @change="keywordsChange"
            style="width: 300px;margin: 0px;padding: 0px;"
            size="mini"
            :disabled="advanceSearchViewVisible"
            @keyup.enter.native="searchEmp"
            prefix-icon="el-icon-search"
            v-model="keywords">
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchEmp">搜索
          </el-button>
          <el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"
                     @click="showAdvanceSearchView"><i
            class="fa fa-lg" v-bind:class="[advanceSearchViewVisible ? faangledoubleup:faangledoubledown]"
            style="margin-right: 5px"></i>高级搜索
          </el-button>
        </div>
        <div style="margin-left: 5px;margin-right: 20px;display: inline">
          <!--<el-upload
            :show-file-list="false"
            accept="application/vnd.ms-excel"
            action="/employee/basic/importEmp"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError" :disabled="fileUploadBtnText=='正在导入'"
            :before-upload="beforeFileUpload" style="display: inline">
            <el-button size="mini" type="success" :loading="fileUploadBtnText=='正在导入'"><i class="fa fa-lg fa-level-up"
                                                                                          style="margin-right: 5px"></i>{{fileUploadBtnText}}
            </el-button>
          </el-upload>
          <el-button type="success" size="mini" @click="exportEmps"><i class="fa fa-lg fa-level-down"
                                                                       style="margin-right: 5px"></i>导出数据
          </el-button>-->
          <el-button type="primary" size="mini" icon="el-icon-plus"
                     @click="showAddEmpView">
            添加员工
          </el-button>
        </div>
      </el-header>
      <el-main style="padding-left: 0px;padding-top: 0px">
        <div>
          <transition name="slide-fade">
            <div
              style="margin-bottom: 10px;border: 1px;border-radius: 5px;border-style: solid;padding: 5px 0px 5px 0px;box-sizing:border-box;border-color: #20a0ff"
              v-show="advanceSearchViewVisible">
              <el-row>
                <!--<el-col :span="5">
                  政治面貌:
                  <el-select v-model="emp.politicId" style="width: 130px" size="mini" placeholder="政治面貌">
                    <el-option
                      v-for="item in politics"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>-->
                <!--<el-col :span="4">
                  民族:
                  <el-select v-model="emp.nationId" style="width: 130px" size="mini" placeholder="请选择民族">
                    <el-option
                      v-for="item in nations"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>-->
                <!--<el-col :span="4">
                  &nbsp;&nbsp;职位:
                  <el-select v-model="emp.posId" style="width: 130px" size="mini" placeholder="请选择职位">
                    <el-option
                      v-for="item in positions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>-->
                <!--<el-col :span="4">
                  职称:
                  <el-select v-model="emp.jobLevelId" style="width: 130px" size="mini" placeholder="请选择职称">
                    <el-option
                      v-for="item in joblevels"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-col>-->
                <!--<el-col :span="7">
                  聘用形式:
                  <el-radio-group v-model="emp.engageForm">
                    <el-radio label="劳动合同">劳动合同</el-radio>
                    <el-radio style="margin-left: 15px" label="劳务合同">劳务合同</el-radio>
                  </el-radio-group>
                </el-col>-->
                <el-col :span="5" style="margin-left:30px">
                  所属部门:
                  <el-popover
                    v-model="showOrHidePop2"
                    placement="right"
                    title="请选择部门"
                    trigger="manual">
                    <el-tree :data="deps" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                             @node-click="handleNodeClick2"></el-tree>
                    <div slot="reference"
                         style="width: 130px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"
                         @click="showDepTree2" v-bind:style="{color: depTextColor}">{{emp.deptName}}
                    </div>
                  </el-popover>
                </el-col>
                <el-col :span="5" >
                  <el-button icon="el-icon-search" type="primary" size="mini" @click="searchEmp">搜索</el-button>
                  <el-button size="mini" @click="cancelSearch">取消</el-button>
                </el-col>
              </el-row>
              <!--<el-row style="margin-top: 10px">

                &lt;!&ndash;<el-col :span="10">
                  入职日期:
                  <el-date-picker
                    v-model="loginTimeScope"
                    unlink-panels
                    size="mini"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-col>&ndash;&gt;

              </el-row>-->
            </div>
          </transition>
          <el-table
            :data="emps"
            v-loading="tableLoading"
            border
            stripe
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              type="selection"
              align="left"
              width="30">
            </el-table-column>
            <el-table-column
              prop="name"
              align="center"
              label="姓名"
              width="90">
            </el-table-column><!--属性 fixed 隐藏线-->
            <el-table-column
              prop="username"
              width="100"
              align="center"
              label="账号">
            </el-table-column>
            <el-table-column
              prop="password"
              width="100"
              align="center"
              label="密码">
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              width="60">
            </el-table-column>
            <el-table-column
              prop="tel"
              width="100"
              align="center"
              label="电话号码">
            </el-table-column>
            <el-table-column
              prop="email"
              width="180"
              align="center"
              label="电子邮件">
            </el-table-column>
            <el-table-column
              prop="dept.name"
              align="center"
              width="150"
              label="所属部门">
            </el-table-column>
            <el-table-column
              width="200"
              prop="loginTime"
              align="center"
              label="最近登录">
              <template slot-scope="scope" v-if="scope.row.loginTime!=null">{{ scope.row.loginTime | formatDateTime}}</template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="230">
              <template slot-scope="scope">
                <el-button @click="showEditEmpView(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px"
                           size="max">编辑
                </el-button>
                <!--<el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary"
                           size="mini">查看高级资料
                </el-button>-->
                <el-button type="danger" style="padding: 3px 4px 3px 4px;margin: 2px" size="max"
                           @click="deleteEmp(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-button type="danger" size="mini" v-if="emps.length>0" :disabled="multipleSelection.length==0"
                       @click="deleteManyEmps">批量删除
            </el-button>
            <el-pagination
              background
              :page-size="10"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>
    <el-form :model="emp" :rules="rules" ref="addEmpForm" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding: 0px;"
          :close-on-click-modal="false"
          :visible.sync="dialogVisible"
          width="77%">
          <el-row>
            <el-col :span="6">
              <div>
                <el-form-item label="姓名:" prop="name">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.name" size="mini" style="width: 150px"
                            placeholder="请输入员工姓名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="账号:" prop="username">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.username" size="mini" style="width: 150px"
                            placeholder="请输入账号"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="密码:" prop="password">
                  <el-input prefix-icon="el-icon-edit" v-model="emp.password" size="mini" style="width: 150px"
                            placeholder="请输入密码"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <el-form-item label="性别:" prop="gender">
                  <el-radio-group v-model="emp.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio style="margin-left: 15px" label="女">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="5">
              <div>
                <el-form-item label="电子邮箱:" prop="email">
                  <el-input prefix-icon="el-icon-message" v-model="emp.email" size="mini" style="width: 150px"
                            placeholder="电子邮箱地址..."></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div style="margin-left:20px">
                <el-form-item label="所属部门:" prop="deptId">
                  <el-popover
                    v-model="showOrHidePop"
                    placement="right"
                    title="请选择部门"
                    trigger="manual">
                    <el-tree :data="deps" :default-expand-all="true" :props="defaultProps" :expand-on-click-node="false"
                             @node-click="handleNodeClick"></el-tree>
                    <div slot="reference"
                         style="width: 150px;height: 26px;display: inline-flex;font-size:13px;border: 1px;border-radius: 5px;border-style: solid;padding-left: 13px;box-sizing:border-box;border-color: #dcdfe6;cursor: pointer;align-items: center"
                         @click.left="showDepTree" v-bind:style="{color: depTextColor}">{{emp.deptName}}
                    </div>
                  </el-popover>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <el-form-item label="电话号码:" prop="phone">
                  <el-input prefix-icon="el-icon-phone" v-model="emp.tel" size="mini" style="width: 200px"
                            placeholder="电话号码..."></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
    <el-button size="mini" @click="cancelEidt">取 消</el-button>
    <el-button size="mini" type="primary" @click="addEmp('addEmpForm')">确 定</el-button>
  </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>
<script>
  import {
    userList
  } from '../../api/api';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    data() {
      return {
        emps: [],
        keywords: '',
        loginTimeScope: '',
        faangledoubleup: 'fa-angle-double-up',
        faangledoubledown: 'fa-angle-double-down',
        dialogTitle: '',
        multipleSelection: [],
        depTextColor: '#c0c4cc',
        nations: [],
        totalCount: -1,
        currentPage: 1,
        deps: [],
        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        dialogVisible: false,
        tableLoading: false,
        advanceSearchViewVisible: false,
        showOrHidePop: false,
        showOrHidePop2: false,
        emp: {
          name: '',
          username:'',
          sex: '',
          email: '',
          tel: '',
          deptId: '',
          deptName: '所属部门...',
          password: ''
        },
        rules: {
          name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
          username: [{required: true, message: '必填:账号', trigger: 'blur'}],
          password: [{required: true, message: '必填:密码', trigger: 'blur'}],
          sex: [{required: true, message: '必填:性别', trigger: 'blur'}],
          email: [{required: true, message: '必填:电子邮箱', trigger: 'blur'}, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          tel: [{required: true, message: '必填:电话号码', trigger: 'blur'}],
          deptId: [{required: true, message: '必填:部门', trigger: 'change'}]
        }
      };
    },
    mounted: function () {
      this.initData();
      this.loadEmps();
    },
    methods: {
      exportEmps(){
        window.open("/employee/basic/exportEmp", "_parent");
      },
      cancelSearch(){
        this.advanceSearchViewVisible = false;
        this.emptyEmpData();
        this.loginTimeScope = '';
        this.loadEmps();
      },
      showAdvanceSearchView(){
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
          this.emptyEmpData();
          this.loginTimeScope = '';
          this.loadEmps();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteManyEmps(){
        this.$confirm('此操作将删除[' + this.multipleSelection.length + ']条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var ids = '';
          for (var i = 0; i < this.multipleSelection.length; i++) {
            ids += this.multipleSelection[i].id + ",";
          }
          this.doDelete(ids);
        }).catch(() => {
        });
      },
      deleteEmp(row){
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.id);
        }).catch(() => {
        });
      },
      doDelete(ids){
        this.tableLoading = true;
        var _this = this;
        axios.delete('/user/emp/deleteList/'+ids).then((resp) => {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.loadEmps();
          }
        })
      },
      keywordsChange(val){
        if (val == '') {
          this.loadEmps();
        }
      },
      searchEmp(){
        this.loadEmps();
      },
      currentChange(currentChange){
        this.currentPage = currentChange;
        this.loadEmps();
      },
      loadEmps(){
        var _this = this;
        this.tableLoading = true;
        var params = {
          page: this.currentPage,
          size: 10,
          keywords: this.keywords,
          deptId: this.emp.deptId
        };
        axios.post('/user/userPage',qs.stringify(params)).then((resp) => {
          this.tableLoading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.emps = data.users;
            _this.totalCount = data.count;
//            _this.emptyEmpData();
          }
        })
      },
      addEmp(formName){
        var _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            /*if (this.emp.id) {
              //更新
              this.tableLoading = true;
              axios.post('/user/submit',qs.stringify(this.emp)).then((resp) => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            } else {*/
              //添加
              this.tableLoading = true;
              axios.post('/user/submit',qs.stringify(this.emp)).then((resp) => {
                _this.tableLoading = false;
                if (resp && resp.status == 200) {
                  var data = resp.data;
                  _this.dialogVisible = false;
                  _this.emptyEmpData();
                  _this.loadEmps();
                }
              })
            // }
          } else {
            return false;
          }
        });
      },
      cancelEidt(){
        this.dialogVisible = false;
        this.emptyEmpData();
      },
      showDepTree(){
        this.showOrHidePop = !this.showOrHidePop;
      },
      showDepTree2(){
        this.showOrHidePop2 = !this.showOrHidePop2;
      },
      handleNodeClick(data) {
        this.emp.deptName = data.name;
        this.emp.deptId = data.id;
        this.showOrHidePop = false;
        this.depTextColor = '#606266';
      },
      handleNodeClick2(data) {
        this.emp.deptName = data.name;
        this.emp.deptId = data.id;
        this.showOrHidePop2 = false;
        this.depTextColor = '#606266';
      },
      initData(){
        var _this = this;
        axios.get('/dept/gepDetByPid/-1',qs.stringify()).then((resp) => {
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.deps = data;
          }
        })
      },
      showEditEmpView(row){
        console.log(row)
        this.dialogTitle = "编辑员工";
        // this.emp = row;
        this.emp.id=row.id;
        this.emp.name=row.name;
        this.emp.deptId=row.deptId;
        this.emp.username=row.username;
        this.emp.password=row.password;
        this.emp.sex=row.sex;
        this.emp.tel=row.tel;
        this.emp.email=row.email;
        //  this.emp.deptId = row.dept.id;
        this.emp.deptName = row.dept.name;
         // this.emp.dept=null;
        this.dialogVisible = true;
      },
      showAddEmpView(){
        this.dialogTitle = "添加员工";
        this.dialogVisible = true;
        var _this = this;

      },
      emptyEmpData(){
        this.emp = {
          name: '',
          username: '',
          password: '',
          sex: '',
          email: '',
          tel: '',
          deptId: '',
          deptName: '所属部门...'
        }
      }
    }
  };
</script>
<style>
  .el-dialog__body {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .slide-fade-enter-active {
    transition: all .8s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
