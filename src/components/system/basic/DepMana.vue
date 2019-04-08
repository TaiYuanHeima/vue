<template>
  <div style="margin-left:0px">
    <div style="text-align: left;">
      <el-input
        placeholder="输入部门名称搜索部门..."
        style="width: 500px;margin: 0px;padding: 0px;"
        size="mini"
        prefix-icon="el-icon-search"
        v-model="keywords">
      </el-input>
    </div>
    <div>
      <el-tree
        :props="defaultProps"
        :data="treeData"
        ref="tree"
        :filter-node-method="filterNode"
        v-loading="treeLoading"
        style="width: 500px;margin-top: 10px"
        :render-content="renderContent">
      </el-tree>
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
  </div>
</template>
<script>
  import {
    userList
  } from '../../../api/api';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: 'home',
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
        }
      }
    },
    mounted: function () {
      this.treeLoading = true;
      this.loadTreeData();
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
        _this.allDeps =[{
          "id": "1",
          "name": "股东会",
          "parentId": "-1",
          "enabled": true,
          "children": [],
          "parent": true
        }, {
          "id": "4",
          "name": "董事会",
          "parentId": "1",
          "enabled": true,
          "children": [],
          "parent": true
        }, {
          "id": "5",
          "name": "总办",
          "parentId": "4",
          "enabled": true,
          "children": [],
          "parent": true
        }, {
          "id": "8",
          "name": "财务部",
          "parentId": "5",
          "enabled": true,
          "children": [],
          "parent": false
        }, {
          "id": "78",
          "name": "市场部",
          "parentId": "5",
          "enabled": true,
          "children": [],
          "parent": true
        }];
      },
      loadTreeData(){
        var _this = this;
        axios.get('/dept/gepDetByPid/-1',qs.stringify()).then((resp) => {
          _this.treeLoading = false;
          if (resp && resp.status == 200) {
            _this.treeData =resp.data ;
          }
        })
      },
      addDep(){
        var _this = this;
        this.dialogVisible = false;
        this.treeLoading = true;
        var params = {
          name: this.depName,
          parentId: this.pDep
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
            _this.deleteRequest("/system/basic/dep/" + data.id).then(resp=> {
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
      renderContent(h, {node, data, store}) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
          <span>{node.label}</span>
        </span>
        <span>
        <el-button style="font-size: 12px;" type="primary" size="mini" style="padding:3px" on-click={ () => this.showAddDepView(data,event) }>添加部门</el-button>
        <el-button style="font-size: 12px;" type="danger" size="mini" style="padding:3px" on-click={ () => this.deleteDep(data,event) }>删除部门</el-button>
        </span>
        </span>);
      }

      }



  }
</script>

