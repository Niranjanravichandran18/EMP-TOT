import { useEffect, useState } from "react";
import Axios from "axios";
import { Chart as ChartJs, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJs.register(Tooltip, Title, ArcElement, Legend);

function Graphs() {
  const [totalCandidates, setTotalCandidates] = useState("");
  const [data, setData] = useState({
    datasets: [
      {
        data: ["10", "20", "30"],
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
    labels: ["Rejected", "In Progress", "Placed"],
  });
  
   useEffect(() => {
    Axios.get("http://localhost:3001/total_candidates").then((res)=>{
    setTotalCandidates(res.data[0])
}).catch(err=>{
    console.log(err)
})
    const fetchData = async () => {
      Axios("http://localhost:3001/emp_graphs")
        .then((response) => {
          let res = response.data;
          return res;
        })
        .then((res) => {
          var label = [];
          var data1 = [];

          for (var key in res) {
            label.push(key);
            data1.push(res[key]);
          }

          setData({
            datasets: [
              {
                data: data1,
                backgroundColor: [
                  "#008ffb",
                  "#00e396",
                  "#fac858",
                  "#775dd0",
                  "#73c0de",
                  "#feb019",
                  "#c7219c",
                  "#ff4560",
                  "#91cc75",
                  "#5470c6",
                  "#22cac3",
                  "#fad848",
                ],
              },
            ],
            labels: label,
          });
        })
        .catch((e) => {
          console.log("error", e);
        });
    };
    fetchData();
  }, []);

  <br />
  return (
    <div className="row">
       <div className="col-lg-5">
      <h3 className="text-center">
        Total Number Of Candidates Applied : {totalCandidates.total}
      </h3>
      </div>
      <div className="col-lg-3 col-12">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Graphs;
