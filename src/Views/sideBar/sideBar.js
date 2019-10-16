import React, { useContext, useEffect } from "react";
import { Menu, Icon } from "antd";
import { AppContext } from "../appLayout";

import { getLocalStorage } from "../../utils/apiModule";

const SideBar = () => {
  const { reducerState, dispatch } = useContext(AppContext);
  useEffect(() => {
    async function getLocalData() {
      try {
        const localData = await getLocalStorage("data");
        let data = JSON.parse(localData);
        if (data) {
          dispatch({ type: "ADD_DATA", data: [...data] });
        }
      } catch {
        console.log("ERROR in getting data from localStorage");
      }
    }
    getLocalData();
  }, [dispatch]);
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.SubMenu
        key="sub1"
        title={
          <span>
            <Icon type="history" />
            <span>History</span>
          </span>
        }
      >
        {reducerState.data.length ? (
          reducerState.data.map((item, i) => {
            return (
              <Menu.Item
                key={i}
                onClick={() =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    data: {
                      amount: item.principal.amount,
                      numMonths: item.numPayments
                    }
                  })
                }
              >
                <p style={{ color: "#fff", fontSize: "10px" }}>
                  amount: ${item.principal ? item.principal.amount : 0} months:{" "}
                  {item.numPayments}
                </p>
              </Menu.Item>
            );
          })
        ) : (
          <Menu.Item>
            <p style={{ color: "#fff", fontSize: "10px" }}>No stored value</p>
          </Menu.Item>
        )}
      </Menu.SubMenu>
    </Menu>
  );
};

export default SideBar;
