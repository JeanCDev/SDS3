import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { SaleSuccess } from "types/sales";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
  name: string;
  data: number[];
}

type ChartData = {
  labels: {
    categories: string[]
  }
  series: SeriesData[];
}
export function BarChart() {

  const [chartData, setChartData] = useState<ChartData>({
    labels: {
      categories: []
    },
    series: [
      {
        name: "",
        data: []
      }
    ]
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
      const data: SaleSuccess[] = response.data;
      const labels = data.map(x => x.sellerName);
      const series = data.map(x => round(100 * (x.deals / x.visited), 1));

      setChartData({
        labels: {
          categories: labels
        },
        series: [
          {
            name: "% de sucesso",
            data: series
          }
        ]
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      }
    },
  };

  return (
    <Chart
      options={{ ...options, xaxis: chartData.labels }}
      series={chartData.series}
      type="bar"
      height="240"
    />
  );
}