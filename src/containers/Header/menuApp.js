export const adminMenu = [
  { 
    //Quản lý người dùng  
    name: 'menu.admin.menu',
    menus: [
      // {
      //   name: 'menu.admin.crud', link: '/system/user-manage',
      // },
      {
        name: 'menu.admin.crud-redux', link: '/system/user-redux',
      },
      { //Quản lý doctor description
        name: 'menu.admin.manage-doctor', link: '/system/manage-doctor',
      },
      { //Quản lý doctor schedule
        name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
      },
      // {
      //   name: 'menu.admin.manage-admin', link: '/system/user-admin',
      // },
    ]
  },
  // { //Quản lý phòng khám  
  //   name: 'menu.admin.clinic',
  //   menus: [
  //     {
  //       name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
  //     },
  //   ]
  // },
  // { //Quản lý chuyên khoa  
  //   name: 'menu.admin.specialty',
  //   menus: [
  //     {
  //       name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
  //     },
  //   ]
  // },
  // { //Quản lý cẩm nang
  //   name: 'menu.admin.handbook',
  //   menus: [
  //     {
  //       name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
  //     },
  //   ]
  // },
];
export const doctorMenu = [
  { //Quản lý doctor schedule
    name: 'menu.admin.menu',
    menus: [
      {
        name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
      }
    ]
  },
];