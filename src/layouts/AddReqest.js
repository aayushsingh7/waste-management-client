import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppContext } from "@/context/ContextAPI";
import Notification from "@/libs/notification";
import { getSocket } from "@/libs/socket";
import styles from "@/styles/layouts/AddRequest.module.css";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function getMonthEndDate() {
  const today = new Date();
  // Create date for first day of next month, then subtract one day
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDay.toISOString();
}

const AddRequest = ({}) => {
  const { setCreateNew, user } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    qty: "",
  });

  const [requestDetails, setRequestDetails] = useState({
    status: "pending",
    image: "",
    seller: user._id,
    name: "",
    locationTxt: user.locationTxt,
    description: user.description,
    items: [],
  });

  const addNewItem = () => {
    setRequestDetails((oldData) => {
      return {
        ...oldData,
        items: [newItem, ...oldData.items],
      };
    });
    setNewItem({
      name: "",
      qty: "",
    });
  };

  const handleUserInput = (e) => {
    let name = e.target.name;
    setRequestDetails((oldDetails) => {
      return { ...oldDetails, [name]: e.target.value };
    });
  };

  const createNewRequest = async () => {
    setLoading(true);
    try {
      const newRequest = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            seller: user._id,
            name: requestDetails.name,
            description: requestDetails.description,
            locationTxt: user.locationTxt,
            location: JSON.stringify(user.location),
            image: requestDetails.image,
            items: JSON.stringify(requestDetails.items),
          }),
          credentials: "include",
        }
      );
      const response = await newRequest.json();
      if (newRequest.status == 201) {
        const socket = getSocket();
        socket.emit("new_request", response.data, [
          response.data.seller._id,
          response.data.buyer._id,
        ]);
        Notification.success("New request added successfully.");
        setCreateNew(false);
        // addData(false, "pendingReq", response.data);
      } else {
        Notification.error("Somthing went wrong, try again.");
      }
    } catch (err) {
      Notification.error("Somthing went wrong, try again later.");
    }
    setLoading(false);
  };

  return (
    <div className={styles.rgb_container}>
      <div className={styles.add_record}>
        <div className={styles.header}>
          <h4>Add Request</h4>
          <Button
            disabled={loading ? true : false}
            onClick={() => setCreateNew(false)}
            style={{ background: "var(--primary-background)" }}
          >
            <AiOutlineClose />
          </Button>
        </div>
        <div className={styles.inputs_container}>
          <Input
            onChange={(e) => handleUserInput(e)}
            name="name"
            type="text"
            placeholder="Enter Title (if any)"
            style={{
              background: "#222222",
              borderRadius: "10px",
              width: "100%",
              fontSize: "0.7rem",
              marginBottom: "15px",
              padding: "15px",
            }}
          />

          <Input
            onChange={(e) => handleUserInput(e)}
            name="description"
            type="text"
            placeholder="Enter A Short Description (if any)"
            style={{
              background: "#222222",
              borderRadius: "10px",
              width: "100%",
              fontSize: "0.7rem",
              marginBottom: "15px",
              padding: "15px",
            }}
          />

          <Input
            onChange={(e) => handleUserInput(e)}
            name="locationTxt"
            value={user.locationTxt}
            readOnly
            type="text"
            style={{
              background: "#222222",
              borderRadius: "10px",
              width: "100%",
              fontSize: "0.7rem",
              marginBottom: "15px",
              padding: "15px",
            }}
          />

          <div className={styles.addItem}>
            <div className={styles.inputs}>
              <Input
                onChange={(e) =>
                  setNewItem({ name: e.target.value, qty: newItem.qty })
                }
                name="name"
                value={newItem.name}
                type="text"
                placeholder="Item Name"
                style={{
                  background: "#222222",
                  borderRadius: "10px",
                  width: "100%",
                  fontSize: "0.7rem",
                  marginBottom: "15px",
                  padding: "15px",
                }}
              />
              <Input
                onChange={(e) =>
                  setNewItem({ name: newItem.name, qty: e.target.value })
                }
                name="qty"
                value={newItem.qty}
                type="text"
                placeholder="Item Qty (approx)"
                style={{
                  background: "#222222",
                  borderRadius: "10px",
                  width: "100%",
                  fontSize: "0.7rem",
                  marginBottom: "15px",
                  padding: "15px",
                }}
              />
              <Button
                disabled={loading}
                onClick={addNewItem}
                style={{
                  padding: "15px",
                  height: "50px",
                  background: "var(--active-background)",
                  fontSize: "0.7rem",
                  borderRadius: "10px",
                  flexShrink: "0",
                }}
              >
                Add Item
              </Button>
            </div>
            {requestDetails.items.map((item) => {
              return (
                <div key={Math.random() * 10000000} className={styles.items}>
                  <span>{item.name}</span>
                  <span>{item.qty}</span>
                  <AiOutlineClose
                    style={{ color: "var(--primary-color)", fontSize: "23px" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Button
          disabled={loading}
          onClick={createNewRequest}
          style={{
            padding: "20px",
            background: "var(--active-background)",
            fontSize: "0.8rem",
            borderRadius: "10px",
          }}
        >
          {loading ? "Adding Requeset..." : "Add Request"}
        </Button>
      </div>
    </div>
  );
};

export default AddRequest;
