<template>
  <div style="margin-left:20px">
    <div style="text-align: left;">
      <el-input
        placeholder="输入菜单名称搜索菜单..."
        style="width: 500px;margin: 0px;padding: 0px;"
        size="mini"
        prefix-icon="el-icon-search"
        v-model="keywords">
      </el-input>
      <el-button icon="fa fa-plus" type="primary" size="mini" style="font-size: 12px;padding:4px;" @click="handleAdd">新增</el-button>
    </div>
    <div>
     <!-- <el-tree
        :props="defaultProps"
        :data="treeData"
        ref="tree"
        :filter-node-method="filterNode"
        v-loading="treeLoading"
        style="width: 500px;margin-top: 10px"
        :render-content="renderContent">
      </el-tree>-->
      <!--表格树内容栏-->
      <el-table :data="treeData" stripe size="mini" style="width: 98%;margin-top: 10px;"
                v-loading="treeLoading" element-loading-text="--|||--" ref="tree" :filter-node-method="filterNode">
        <el-table-column
          prop="id" header-align="center" align="center" width="80" label="ID" v-if="hideRow">
        </el-table-column>
        <table-tree-column
          prop="name" header-align="center" width="150" label="名称">
        </table-tree-column>
        <el-table-column header-align="center" align="center" label="图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon || ''"></i>
          </template>
        </el-table-column>
        <el-table-column prop="type" header-align="center" align="center" label="类型">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === 0" size="small">目录</el-tag>
            <el-tag v-else-if="scope.row.type === 1" size="small" type="success">菜单</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="parentName" header-align="center" align="center" width="120" label="上级菜单">
        </el-table-column>
        <el-table-column
          prop="url" header-align="center" align="center" width="150"
          :show-overflow-tooltip="true" label="菜单URL">
        </el-table-column>
        <el-table-column
          prop="num" header-align="center" align="center" label="排序">
        </el-table-column>
        <el-table-column fixed="right" header-align="center" align="center" width="185" label="操作">
          <template slot-scope="scope">
            <kt-button icon="fa fa-edit" label="编辑"  @click="handleEdit(scope.row)"/>
            <kt-button icon="fa fa-trash" label="删除" type="danger" @click="handleDelete(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: left">
        <el-dialog
          title="添加部门"
          :visible.sync="dialogVisible"
          width="25%">
          <div>
            <span>上级部门</span>
            <el-select v-model="pDep" style="width: 200px" placeholder="请选择" size="mini">
              <el-option
                v-for="item in allDeps"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div style="margin-top: 10px">
            <span>部门名称</span>
            <el-input size="mini" style="width: 200px;" v-model="depName" placeholder="请输入部门名称..." @keyup.enter.native="addDep"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取消</el-button>
            <el-button size="small" type="primary" @click="addDep">添加</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 新增修改界面 -->
    <el-dialog :title="!dataForm.id ? '新增' : '修改'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" @keyup.enter.native="submitForm()"
               label-width="80px" :size="size" style="text-align:left;">
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="dataForm.type">
            <el-radio v-for="(type, index) in menuTypeList" :label="index" :key="index">{{ type }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="menuTypeList[dataForm.type] + '名称'" prop="name">
          <el-input v-model="dataForm.name" :placeholder="menuTypeList[dataForm.type] + '名称'"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentName">
          <popup-tree-input
            :data="popupTreeData" :props="popupTreeProps" :prop="dataForm.parentName==null||dataForm.parentName==''?'顶级菜单':dataForm.parentName"
            :nodeKey="''+dataForm.parentId" :currentChangeHandle="handleTreeSelectChange">
          </popup-tree-input>
        </el-form-item>
        <el-form-item v-if="dataForm.type === 1" label="菜单路径" prop="url">
          <el-row>
            <el-col :span="22">
              <el-input v-model="dataForm.url" placeholder="菜单路由"></el-input>
            </el-col>
            <el-col :span="2" class="icon-list__tips">
              <el-tooltip placement="top" effect="light" style="padding: 10px;">
                <div slot="content">
                  <p>URL格式：</p>
                  <p>1.常规业务开发的功能URL，如用户管理，Views目录下页面路径为 /Sys/User, 此处填写 /sys/user。</p>
                  <p>2.嵌套外部网页，如通过菜单打开百度网页，此处填写 http://www.baidu.com，http:// 不可省略。</p>
                  <p>示例：用户管理：/sys/user 嵌套百度：http://www.baidu.com 嵌套网页：http://127.0.0.1:8000</p></div>
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item v-if="dataForm.type !== 2" label="排序编号" prop="num">
          <el-input-number v-model="dataForm.num" controls-position="right" :min="0" label="排序编号"></el-input-number>
        </el-form-item>
        <el-form-item v-if="dataForm.type !== 2" label="菜单图标" prop="icon">
          <el-row>
            <el-col :span="22">
              <!-- <el-popover
                ref="iconListPopover"
                placement="bottom-start"
                trigger="click"
                popper-class="mod-menu__icon-popover">
                <div class="mod-menu__icon-list">
                  <el-button
                    v-for="(item, index) in dataForm.iconList"
                    :key="index"
                    @click="iconActiveHandle(item)"
                    :class="{ 'is-active': item === dataForm.icon }">
                    <icon-svg :name="item"></icon-svg>
                  </el-button>
                </div>
              </el-popover> -->
              <el-input v-model="dataForm.icon" v-popover:iconListPopover :readonly="false" placeholder="菜单图标名称（如：fa fa-home fa-lg）" class="icon-list__input"></el-input>
            </el-col>
            <el-col :span="2" class="icon-list__tips">
              <fa-icon-tooltip />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label="menuTypeList[dataForm.type] + '备注'" prop="note">
          <el-input v-model="dataForm.note" :placeholder="menuTypeList[dataForm.type] + '备注'"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="size"  @click="dialogVisible = false">取消</el-button>
        <el-button :size="size"  type="primary" @click="submitForm()">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    userList
  } from '../../../api/api';
  import axios from 'axios';
  import qs from 'qs';
  import TableTreeColumn from "../../utils/TreeTable/TableTreeColumn";
  import PopupTreeInput from "../../utils/PopupTreeInput/";
  import KtButton from "../../utils/KtButton/KtButton";
  export default {
    components:{
      TableTreeColumn,
      PopupTreeInput,
      KtButton
    },
    data() {
      return {
        keywords: '',
        depName: '',
        treeLoading: false,
        dialogVisible: false,
        allDeps: [],
        pDep: '',
        treeData: [],
        defaultProps: {
          label: 'name',
          isLeaf: 'leaf',
          children: 'children'
        },
        size: "small",
        popupTreeData: [],
        popupTreeProps: {
          label: "name",
          children: "children"
        },
        dialogVisible: false,
        menuTypeList: ["目录", "菜单"],
        dataForm: {
          id: 0,
          type: 1,
          name: "",
          parentId: 0,
          parentName: "",
          url: "",
          num: 0,
          icon: "",
          enabled:1,
          note:""
        },
      }
    },
    mounted: function () {
      this.treeLoading = true;
      this.loadTreeData();
    },
    watch: {
      keywords(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      },
      showAddDepView(data, event){
        this.loadAllDeps();
        this.dialogVisible = true;
        this.pDep = data.id;
        event.stopPropagation()
      },
      loadAllDeps(){
        var _this = this;
        axios.get('/dept/deps',qs.stringify()).then((resp) => {
          if (resp && resp.status == 200) {
            _this.allDeps = resp.data;
          }
        });
      },
      loadTreeData(){
        var _this = this;
        axios.get('/menu/getMenuByParentId/0',qs.stringify()).then((resp) => {
          _this.treeLoading = false;
          if (resp && resp.status == 200) {
            _this.treeData =resp.data ;
            _this.popupTreeData = this.getParentMenuTree(resp.data);
          }
        })
      },
      addDep(){
        var _this = this;
        this.dialogVisible = false;
        this.treeLoading = true;
        var params = {
          name: this.depName,
          pid: this.pDep
        };
        axios.post('/dept/dep',qs.stringify(params)).then((resp) => {
          _this.treeLoading = false;
          if (resp && resp.status == 200) {
            var respData = resp.data;
            _this.depName = '';
            _this.setDataToTree(_this.treeData,_this.pDep,respData.msg)
          }
        })
      },
      setDataToTree(treeData,pId,respData){
        for(var i=0;i<treeData.length;i++) {
          var td = treeData[i];
          if(td.id==pId) {
            treeData[i].children=treeData[i].children.concat(respData);
            return;
          }else{
            this.setDataToTree(td.children, pId, respData);
          }
        }
      },
      deleteDep(data, event){
        var _this = this;
        if (data.children.length>0) {
          this.$message({
            message: '该部门下尚有其他部门，不能被删除!',
            type: 'warning'
          });
        } else {
          this.$confirm('删除[' + data.name + ']部门, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            _this.treeLoading = true;
            var params = {
              deptid: data.id
            };
            axios.post('/dept/delete',qs.stringify(params)).then((resp) => {
              _this.treeLoading = false;
              if (resp && resp.status == 200) {
                var respData = resp.data;

                _this.deleteLocalDep(_this.treeData, data);
              }
            });
          }).catch(() => {
            _this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        }
        event.stopPropagation()
      },
      deleteLocalDep(treeData,data){
        for(var i=0;i<treeData.length;i++) {
          var td = treeData[i];
          if(td.id==data.id) {
            treeData.splice(i, 1);
            return;
          }else{
            this.deleteLocalDep(td.children, data);
          }
        }
      },
      renderContent(h, {node, data, store}) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
        <el-button style="font-size: 12px;" type="primary" size="message" style="padding:3px" on-click={ () => this.showAddDepView(data,event) }>添加部门</el-button>
        <el-button style="font-size: 12px;" type="danger" size="mini" style="padding:3px" on-click={ () => this.deleteDep(data,event) }>删除部门</el-button>
        </span>
        </span>);
      },
      // 显示新增界面
      handleAdd: function() {
        this.dialogVisible = true;
        this.dataForm = {
          id: null,
          type: 1,
          typeList: ["目录", "菜单", "按钮"],
          name: "",
          parentId: 0,
          parentName: "",
          url: "",
          perms: "",
          orderNum: 0,
          icon: "",
          iconList: []
        }
      },
      // 获取上级菜单树
      getParentMenuTree: function(tableTreeDdata) {
        let parent = {
          parentId: 0,
          name: "顶级菜单",
          children: tableTreeDdata
        };
        return [parent];
      },
      // 菜单树选中
      handleTreeSelectChange(data, node) {
        this.dataForm.parentId = data.id;
        this.dataForm.parentName = data.name;
      },
      // 表单提交
      submitForm() {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            let params = Object.assign({}, this.dataForm);
            axios.post('/menu/submit',qs.stringify(params)).then(res => {
              this.editLoading = false;
              if (res.status == 200) {
                this.$message({ message: "操作成功", type: "success" });
                //this.$refs["dataForm"].resetFields();
                this.dialogVisible = false;
              } else {
                this.$message({
                  message: "操作失败, " + res.msg,
                  type: "error"
                });
              }
              this.loadTreeData();
            });
          });
      },
      // 显示编辑界面
      handleEdit: function(row) {
        this.dialogVisible = true;
        Object.assign(this.dataForm, row);
      },
      // 删除
      handleDelete(row) {
        var _this = this;
        if (row.children.length>0) {
          this.$message({
            message: '该菜单下尚有其他菜单，不能被删除!',
            type: 'warning'
          });
        }else{
          this.$confirm("确认删除选中记录吗？", "提示", {
            type: "warning"
          }).then(() => {
            let params = {menuid:row.id};
            axios.post('/menu/delete',qs.stringify(params)).then(res => {
              if (res.data.status == 200) {
                this.loadTreeData();
                this.$message({ message: res.data.msg, type: "success" });
              }else{
                this.$message({ message: res.data.msg, type: "error" });
              }

            });
          });
        }
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value) !== -1;
      }
    }
  }
</script>
<style scoped></style>
