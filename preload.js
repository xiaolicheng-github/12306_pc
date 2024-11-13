const { contextBridge } = require('electron/renderer');

// 将函数暴露给渲染进程
window.myApi = {
  fetchData
};

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
});

// contextBridge.exposeInMainWorld('api', {
//   'loginConf': async (setData) => {
//     const data = await axios.get('https://www.12306.cn/index/otn/login/conf').catch(err => {
//       return err;
//     });
//     setData(data);
//   },
//   'stationNameNew': async (setData) => {
//     const data = await axios.get('https://www.12306.cn/index/script/core/common/station_name_new_v10065.js').catch(err => {
//       return err;
//     });
//     setData(data);
//   },
//   'leftTicketQuery': async (setData) => {
//     const data = await axios.get('https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date=2024-11-13&leftTicketDTO.from_station=BJP&leftTicketDTO.to_station=FZS&purpose_codes=ADULT').catch(err => {
//       return err;
//     });
//     setData(data);
//   },
// });