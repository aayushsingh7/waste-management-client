"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [selectedRequest, setSelectedRequest] = useState({});
  const [viewRequest, setViewRequest] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);

  const addData = (isNew, type, data) => {
    if (!isNew) {
      if (type == "pendingReq") {
        setPendingRequests((oldData) => {
          return [data, ...oldData];
        });
      } else if (type == "requestHistory") {
        setRequestHistory((oldData) => {
          return [data, ...oldData];
        });
      }
    } else {
      if (type == "user") {
        setUser(data);
      } else if (type == "pendingReq") {
        setPendingRequests(data);
      } else if (type == "requestHistory") {
        setRequestHistory(data);
      }
    }
  };

  const deleteData = (type, dataId) => {
    if (type == "requestHistory") {
      setRequestHistory((oldData) => {
        return oldData.filter((data) => data._id !== dataId);
      });
    } else if (type == "pendingReq") {
      setPendingRequests((oldData) => {
        return oldData.filter((data) => data._id !== dataId);
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        selectedRequest,
        user,
        viewRequest,
        createNew,
        pendingRequests,
        requestHistory,
        setSelectedRequest,
        setCreateNew,
        setViewRequest,
        addData,
        deleteData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  return context;
}
