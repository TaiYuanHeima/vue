<template>
  <div>
    <h1>菜单管理</h1>
    <tree-table :data="lila" :columns="columns" border/>
  </div>
</template>

<script>
  import treeTable from "../../TreeTable";
  import {
    userList
  } from '../../../api/api';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: "menu.vue",
    components: { treeTable },
    data() {
      return {
        columns: [
          {
            text: "菜单",
            value: "name",
            width: 200
          },
          {
            text: "ID",
            value: "id"
          },
          {
            text: "url",
            value: "url"
          },
          {
            text: "操作",
            value: ""
          }
        ],
        lila:[],
        data: [
          {
            id: 0,
            event: "事件1",
            timeLine: 50,
            comment: "无"
          },
          {
            id: 1,
            event: "事件110",
            timeLine: 100,
            comment: "无",
            child: [
              {
                id: 2,
                event: "事件2",
                timeLine: 10,
                comment: "无"
              },
              {
                id: 3,
                event: "事件3",
                timeLine: 90,
                comment: "无",
                child: [
                  {
                    id: 4,
                    event: "事件4",
                    timeLine: 5,
                    comment: "无"
                  },
                  {
                    id: 5,
                    event: "事件5",
                    timeLine: 10,
                    comment: "无"
                  },
                  {
                    id: 6,
                    event: "事件6",
                    timeLine: 75,
                    comment: "无",
                    child: [
                      {
                        id: 7,
                        event: "事件7",
                        timeLine: 50,
                        comment: "无",
                        child: [
                          {
                            id: 71,
                            event: "事件71",
                            timeLine: 25,
                            comment: "xx"
                          },
                          {
                            id: 72,
                            event: "事件72",
                            timeLine: 5,
                            comment: "xx"
                          },
                          {
                            id: 73,
                            event: "事件73",
                            timeLine: 20,
                            comment: "xx"
                          }
                        ]
                      },
                      {
                        id: 8,
                        event: "事件8",
                        timeLine: 25,
                        comment: "无"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      };
    },
    mounted: function () {
      console.log(2);
      $(window).resize();
      this.loadmenu();
    },
    methods: {
      addClass: function (index, event) {
        this.current = index;
        //获取点击对象
        var el = event.currentTarget;
      },
      loadmenu(){
        var _this = this;
        axios.get('/menu/getMenuByParentId/0',qs.stringify()).then(function (resp) {
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.lila = data;
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
