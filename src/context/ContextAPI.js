"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState({});
  const [selectedRequest, setSelectedRequest] = useState({ items: [] });
  const [viewRequest, setViewRequest] = useState(false);
  const [verifyingUser, setVerifyingUser] = useState(true);
  const [createNew, setCreateNew] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [requestHistory, setRequestHistory] = useState([]);
  const [showNavbar, setShowNavbar] = useState(false);
  const [showHomeNavbar, setShowHomeNavbar] = useState(false);

  const addData = (isNew, type, data) => {
    if (!isNew) {
      if (type == "pendingReq") {
        setPendingRequests((oldData) => {
          let isExists = oldData.find((d) => d._id == data._id);
          if (isExists) {
            return oldData.map((d) => {
              if (d._id == data._id) {
                return data;
              } else {
                return d;
              }
            });
          } else {
            return [data, ...oldData];
          }
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

  const changeSeller = (buyer, productId) => {
    setPendingRequests((oldData) => {
      return oldData.map((data) => {
        if (data._id == productId) {
          return {
            ...data,
            buyer: buyer,
          };
        } else {
          return data;
        }
      });
    });
  };

  return (
    <AppContext.Provider
      value={{
        showHomeNavbar,
        showNavbar,
        verifyingUser,
        selectedRequest,
        user,
        viewRequest,
        createNew,
        pendingRequests,
        requestHistory,
        setShowNavbar,
        setSelectedRequest,
        setCreateNew,
        setViewRequest,
        addData,
        deleteData,
        setVerifyingUser,
        changeSeller,
        setShowHomeNavbar,
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
