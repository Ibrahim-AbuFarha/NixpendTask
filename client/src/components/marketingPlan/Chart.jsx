import React, { useContext, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ColumnContext from "../../store/context";
import { Chart as Chartjs } from "chart.js/auto";
function Chart() {
  const { getColumns, columns } = useContext(ColumnContext);

  useEffect(() => {
    if (columns.length === 0) {
      getColumns();
    }
  }, [columns, getColumns]);

  const labels = columns.map((col) => col.name);
  const columnsData = columns.map((col) => col.taskList.length);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Columns Chart",
        data: columnsData,
        backgroundColor: [
          "#645fc5",
          "#45B39D",
          "#F39C12",
          "#FF5733",
          "#138D75",
          "#C70039",
          "#900C3F",
          "#581845",
          "#D68910",
          "#B9770E",
        ],
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff", // Change x-axis text color
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff", // Change y-axis text color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#645fc5", // Change legend text color
        },
      },
    },
    layout: {
      padding: "50",
    },
  };

  return (
    <div className="p-5 w-[1000px] max-w-[1000px]">
      <Bar className="bg-[#2c2c38]" data={data} options={options} />
    </div>
  );
}

export default Chart;
