<template>
  <div class="wrapper">

    <!-- Main Header -->
    <header class="main-header">

      <!-- Logo -->
      <a href="#" class="logo">
        <!-- mini logo for sidebar mini 50x50 pixels -->
        <span class="logo-mini"><b>B</b></span>
        <!-- logo for regular state and mobile devices -->
        <span class="logo-lg"><b>Bettem</b></span>
      </a>

      <!-- Header Navbar -->
      <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
          <span class="sr-only">Toggle navigation</span>
        </a>
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Messages: style can be found in dropdown.less-->
            <li class="dropdown messages-menu">
              <!-- Menu toggle button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-envelope-o"></i>
                <span class="label label-success">4</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 4 messages</li>
                <li>
                  <!-- inner menu: contains the messages -->
                  <ul class="menu">
                    <li><!-- start message -->
                      <a href="#">
                        <div class="pull-left">
                          <!-- User Image -->
                          <img src="../assets/logo.png" class="img-circle" alt="User Image">
                        </div>
                        <!-- Message title and timestamp -->
                        <h4>
                          Support Team
                          <small><i class="fa fa-clock-o"></i> 5 mins</small>
                        </h4>
                        <!-- The message -->
                        <p>Why not buy a new awesome theme?</p>
                      </a>
                    </li>
                    <!-- end message -->
                  </ul>
                  <!-- /.menu -->
                </li>
                <li class="footer"><a href="#">See All Messages</a></li>
              </ul>
            </li>
            <!-- /.messages-menu -->

            <!-- Notifications Menu -->
            <li class="dropdown notifications-menu">
              <!-- Menu toggle button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-bell-o"></i>
                <span class="label label-warning">10</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 10 notifications</li>
                <li>
                  <!-- Inner Menu: contains the notifications -->
                  <ul class="menu">
                    <li><!-- start notification -->
                      <a href="#">
                        <i class="fa fa-users text-aqua"></i> 5 new members joined today
                      </a>
                    </li>
                    <!-- end notification -->
                  </ul>
                </li>
                <li class="footer"><a href="#">View all</a></li>
              </ul>
            </li>
            <!-- Tasks Menu -->
            <li class="dropdown tasks-menu">
              <!-- Menu Toggle Button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <i class="fa fa-flag-o"></i>
                <span class="label label-danger">9</span>
              </a>
              <ul class="dropdown-menu">
                <li class="header">You have 9 tasks</li>
                <li>
                  <!-- Inner menu: contains the tasks -->
                  <ul class="menu">
                    <li><!-- Task item -->
                      <a href="#">
                        <!-- Task title and progress text -->
                        <h3>
                          Design some buttons
                          <small class="pull-right">20%</small>
                        </h3>
                        <!-- The progress bar -->
                        <div class="progress xs">
                          <!-- Change the css width attribute to simulate progress -->
                          <div class="progress-bar progress-bar-aqua" style="width: 20%" role="progressbar"
                               aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only">20% Complete</span>
                          </div>
                        </div>
                      </a>
                    </li>
                    <!-- end task item -->
                  </ul>
                </li>
                <li class="footer">
                  <a href="#">View all tasks</a>
                </li>
              </ul>
            </li>
            <!-- User Account Menu -->
            <li class="dropdown user user-menu">
              <!-- Menu Toggle Button -->
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                <!-- The user image in the navbar-->
                <img src="../assets/logo.png" class="user-image" alt="User Image">
                <!-- hidden-xs hides the username on small devices so only the image appears. -->
                <span class="hidden-xs">Admin</span>
              </a>
              <ul class="dropdown-menu">
                <!-- The user image in the menu -->
                <li class="user-header">
                  <img src="../assets/logo.png" class="img-circle" alt="User Image">

                  <p>
                    Admin - Web Developer
                    <small>Member since Nov. 2012</small>
                  </p>
                </li>
                <!-- Menu Body -->
                <li class="user-body">
                  <div class="row">
                    <div class="col-xs-4 text-center">
                      <a href="#">Followers</a>
                    </div>
                    <div class="col-xs-4 text-center">
                      <a href="#">Sales</a>
                    </div>
                    <div class="col-xs-4 text-center">
                      <a href="#">Friends</a>
                    </div>
                  </div>
                  <!-- /.row -->
                </li>
                <!-- Menu Footer-->
                <li class="user-footer">
                  <div class="pull-left">
                    <a href="#" class="btn btn-default btn-flat">Profile</a>
                  </div>
                  <div class="pull-right">
                    <a href="#" class="btn btn-default btn-flat">Sign out</a>
                  </div>
                </li>
              </ul>
            </li>
            <!-- Control Sidebar Toggle Button -->
            <li>
              <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- Left side column. contains the logo and sidebar -->
    <aside class="main-sidebar">

      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">

        <!-- Sidebar user panel (optional) -->
        <div class="user-panel">
          <div class="pull-left image">
            <img src="../assets/logo.png" class="img-circle" alt="User Image">
          </div>
          <div class="pull-left info">
            <p>Admin</p>
            <!-- Status -->
            <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
          </div>
        </div>

        <!--search form (Optional)-->
        <form action="#" method="get" class="sidebar-form">
          <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
          </div>
        </form>

        <!--<ul class="sidebar-menu" data-widget="tree">
          <li class="active">
            <router-link to="/begin"><i class="fa fa-link"></i> <span>&nbsp;&nbsp;&nbsp;首页</span></router-link>
          </li>
          &lt;!&ndash; Optionally, you can add icons to the links &ndash;&gt;
          <li >
            <router-link to="/emp"><i class="fa fa-link"></i> <span>员工管理</span></router-link>
          </li>
          <li>
            <router-link to="/sys"><i class="fa fa-link"></i> <span>部门管理</span></router-link>
          </li>
          <li>
            <router-link to="/sys"><i class="fa fa-link"></i> <span>角色管理</span></router-link>
          </li>
          <li>
            <router-link to="/sys"><i class="fa fa-link"></i> <span>菜单管理</span></router-link>
          </li>
          <li class="treeview">
            <a href="#"><i class="fa fa-link"></i> <span>权限管理</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link to="/sys">一级权限</router-link>
              </li>
              <li>
                <router-link to="/sys">二级权限</router-link>
              </li>
            </ul>
          </li>
        </ul>-->
        <ul class="sidebar-menu" data-widget="tree" v-for="(todo, index) in lilist">
          <li v-if="!todo.type" v-on:click="addClass(index,$event)" v-bind:class="{ active:index==current}">
            <router-link :to="todo.url"><i class="fa fa-link"></i> <span>&nbsp;<span>{{ todo.name }}</span></span></router-link>
          </li>
          <li v-if="todo.type" class="treeview" v-on:click="addClass(name,$event)" v-bind:class="{ active:index==current}">
            <a href="#"><i class="fa fa-link"></i> <span>{{todo.name}}</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu" >
              <li v-for="(tod,index) in todo.children" v-bind:class="{ active:index==current}">
                <router-link :to="tod.url">{{tod.name}}</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <!-- /.sidebar-menu -->
      </section>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <!--<div class="content-wrapper">
      &lt;!&ndash; Content Header (Page header) &ndash;&gt;
      <section class="content-header">
        <h1>
          Page Header
          <small>Optional description</small>
        </h1>
        <ol class="breadcrumb">
          <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
          <li class="active">Here</li>
        </ol>
      </section>

      &lt;!&ndash; Main content &ndash;&gt;
      <section class="content container-fluid">

        &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
          | Your Page Content Here |
          &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;
        &lt;!&ndash; 路由导航 &ndash;&gt;

        &lt;!&ndash; 路由出口 &ndash;&gt;

      </section>

      &lt;!&ndash; /.content &ndash;&gt;
    </div>-->
    <div class="content-wrapper" style="border-style:solid; border-color:transparent;background-color: white">
      <!-- Main content -->
      <router-view style="margin-top:20px; padding:0px"></router-view>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
      <!-- To the right -->
      <div class="pull-right hidden-xs">
        Anything you want
      </div>
      <!-- Default to the left -->
      <strong>Copyright &copy; 2019 <a href="#">Company</a>.</strong> All rights reserved.
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Create the tabs -->
      <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
        <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
        <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
      </ul>
      <!-- Tab panes -->
      <div class="tab-content">
        <!-- Home tab content -->
        <div class="tab-pane active" id="control-sidebar-home-tab">
          <h3 class="control-sidebar-heading">Recent Activity</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:;">
                <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                <div class="menu-info">
                  <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                  <p>Will be 23 on April 24th</p>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->

          <h3 class="control-sidebar-heading">Tasks Progress</h3>
          <ul class="control-sidebar-menu">
            <li>
              <a href="javascript:;">
                <h4 class="control-sidebar-subheading">
                  Custom Template Design
                  <span class="pull-right-container">
                    <span class="label label-danger pull-right">70%</span>
                  </span>
                </h4>

                <div class="progress progress-xxs">
                  <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                </div>
              </a>
            </li>
          </ul>
          <!-- /.control-sidebar-menu -->

        </div>
        <!-- /.tab-pane -->
        <!-- Stats tab content -->
        <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
        <!-- /.tab-pane -->
        <!-- Settings tab content -->
        <div class="tab-pane" id="control-sidebar-settings-tab">
          <form method="post">
            <h3 class="control-sidebar-heading">General Settings</h3>

            <div class="form-group">
              <label class="control-sidebar-subheading">
                Report panel usage
                <input type="checkbox" class="pull-right" checked>
              </label>

              <p>
                Some information about this general settings option
              </p>
            </div>
            <!-- /.form-group -->
          </form>
        </div>
        <!-- /.tab-pane -->
      </div>
    </aside>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed
    immediately after the control sidebar -->
    <div class="control-sidebar-bg"></div>
  </div>
</template>
<script>
  import {
    userList
  } from '../api/api';
  import axios from 'axios';
  import qs from 'qs';
  export default {
    name: 'index',
    /*data: function () {
      return
        role: 0
    },*/
    data() {
      return {
        current: 0,
        todos: [
          {text: '首页', path: '/home', isParent: 0, children: []},
          {text: '员工管理', path: '/emp', isParent: 0, children: []},
          {text: '部门管理', path: '/sys', isParent: 0, children: []},
          {text: '权限管理', path: '/sys', isParent: 1, children: [
              { isParent: 0, path:'/sys', text: "父节点11" }, { isParent: 0, path:'/sys', text: "父节点12" }
            ]}
        ],
        lilist:[],
        da: []
      }

    },
    mounted: function () {
      console.log(2);
      $(window).resize();
      this.da= this.FlatToNested(this.lilist);
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
            _this.lilist = data;
          }
        })
      },
      FlatToNested: function (data, option) {
        option = option || {};
        var idProperty = option.idProperty || 'id';
        var nameProperty = option.nameProperty || 'name';
        var urlProperty = option.nameProperty || 'url';
        var parentProperty = option.parentProperty || 'pid';
        var childrenProperty = option.childrenProperty || 'children';
        let res = [],
          tmpMap = [];
        for (let i = 0; i < data.length; i++) {
          tmpMap[data[i][idProperty]] = data[i];
          if (tmpMap[data[i][parentProperty]] && data[i][idProperty] != data[i][parentProperty]) {
            if (!tmpMap[data[i][parentProperty]][childrenProperty])
              tmpMap[data[i][parentProperty]][childrenProperty] = [];
            data[i][nameProperty] = data[i][nameProperty];
            data[i][urlProperty] = data[i][urlProperty];
            tmpMap[data[i][parentProperty]][childrenProperty].push(data[i]);
          } else {
            data[i][nameProperty] = data[i][nameProperty];
            data[i][urlProperty] = data[i][urlProperty];
            res.push(data[i]);
          }
        }
        return res;
      }
    }
  }
</script>
