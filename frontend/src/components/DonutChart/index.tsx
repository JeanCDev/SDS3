import axios from "axios";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { SaleSum } from "types/sales";
import { BASE_URL } from "utils/requests";
import {useState} from 'react';

type ChartData ={
  labels: string[]
  series: number[]
}

export function DonutChart() {

  const [chartData, setChartData] = useState<ChartData>({series: [], labels: []});

  useEffect(() =>{
    axios.get(`${BASE_URL}/sales/amount-by-seller`).then((response) => {
      const data: SaleSum[] = response.data;
      const labels = data.map(x => x.sellerName);
      const series = data.map(x => x.sum);
  
      setChartData({labels, series});
    });
  }, []);

  const options = {
    legend: {
      show: true
    }
  }

  return (
    <Chart 
      options={{...options, labels: chartData.labels}}
      series={chartData.series}
      type="donut"
      height="240"
    />
  );
}