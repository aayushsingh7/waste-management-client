import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useAppContext } from "@/context/ContextAPI";
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
  const { setCreateNew } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});

  const handleUserInput = (e) => {
    let name = e.target.name;
    console.log(e.target.value);
    setRecordDetails((oldDetails) => {
      return { ...oldDetails, [name]: e.target.value };
    });
  };

  const craeteNewRecord = async () => {
    setLoading(true);
    try {
    } catch (err) {
      console.log(err);
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
            name="title"
            type="text"
            placeholder="Enter Title"
            style={{
              background: "#222222",
              borderRadius: "10px",
              width: "100%",
              fontSize: "0.7rem",
              marginBottom: "15px",
              padding: "15px",
            }}
          />
        </div>
        <Button
          disabled={loading}
          onClick={craeteNewRecord}
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
