import React, { useState, useReducer } from "react";
import { Layout, Icon } from "antd";

import "./appLayout.css";

import MainView from "./mainView/mainView";
import SideBar from "./sideBar/sideBar";

export const AppContext = React.createContext();
const initialState = {
  data: [],
  params: {
    amount: 500,
    numMonths: 6
  },
  responseData: {}
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        data: [...state.data, ...action.data]
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        params: {
          ...state.params,
          ...action.data
        }
      };
    default:
      return state;
  }
};
const AppLayout = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [reducerState, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="AppLayout" style={{ height: "100vh" }}>
      <AppContext.Provider value={{ reducerState, dispatch }}>
        <Layout style={{ height: "100%" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo" />
            <SideBar />
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Icon
                className="trigger"
                type={collapsed ? "menu-unfold" : "menu-fold"}
                onClick={() => setCollapsed(prevState => !prevState)}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <MainView />
            </Content>
          </Layout>
        </Layout>
      </AppContext.Provider>
    </div>
  );
};

export default AppLayout;
