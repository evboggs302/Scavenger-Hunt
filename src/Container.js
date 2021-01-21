import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function Information() {
  const [tele, setTele] = useState("");
  const [txt, setTxt] = useState("");
  const [format, setFormat] = useState(false);
  const [sent, setSent] = useState(false);
  const [verification, setVerificaiton] = useState("");

  const testValues = () => {
    let telVals = tele.length === 10;
    let txtVals = txt.trim().length;
    if (telVals && txtVals) {
      setFormat(true);
    } else {
      setFormat(false);
    }
  };
  const sendTxt = (num) => {
    axios
      .post("/api/sendtxt", { recipient: num, sms_msg: txt })
      .then((res) => {
        console.log("res data", res.data);
        if (res.status === 200) {
          setVerificaiton(res.data);
        }
      });
  };

  

  useEffect(() => {
    testValues();
  }, [tele, txt]);

  useEffect(() => {
    if (sent) {
      setTxt("");
      setTele("");
      setTimeout(() => {
        setSent(false);
      }, 5000);
    }
  }, [sent]);

  return (
    <span className="container">
      {/* <div>
        <input
          placeholder="PHONE NUMBER"
          value={tele}
          onChange={(e) => setTele(e.target.value)}
        />
      </div> */}
      <div>
        <textarea value={txt} onChange={(e) => setTxt(e.target.value)} />
      </div>
      <div>
        {sent ? (
          <span>
            <h3>MESSAGE SENT</h3>
            <div>TO: {verification.to}</div>
            <div>FROM: {verification.from}</div>
            <div>DATE: {verification.dateUpdated}</div>
            <div>SID: {verification.sid}</div>
          </span>
        ) : (
          <button onClick={sendTxt}>SEND</button>
        )}
      </div>
    </span>
  );
}

export default Information;
