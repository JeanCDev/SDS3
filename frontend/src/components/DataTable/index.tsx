import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { SalePage } from "types/sales";
import { formatLocalDate } from "utils/format";
import { BASE_URL } from "utils/requests";

export function DataTable() {

  const [page, setPage] = useState<SalePage>({
    first: true,
    last: false,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const [activePage, setActivePage] = useState(10);

  useEffect(() => {
    axios.get(`${BASE_URL}/sales?page=${activePage}&size=10&sort=date`).then(response => {
      setPage(response.data);
    });
  }, [activePage]);

  function changePage(index: number){
    setActivePage(index);
    console.log(activePage);
  }

  return (
    <>
      <Pagination page={page} onPageChange={changePage}/>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>Data</th>
              <th>Vendedor</th>
              <th>Clientes visitados</th>
              <th>Negócios fechados</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>

            {page.content?.map(sale => (
                <tr key={sale.id}>
                  <td>{formatLocalDate(sale.date, 'dd/MM/yyyy')}</td>
                  <td>{sale.seller.name}</td>
                  <td>{sale.visited}</td>
                  <td>{sale.deals}</td>
                  <td>{sale.amount.toFixed(2)}</td>
                </tr>
              ))
            }


          </tbody>
        </table>
      </div>
    </>
  );
}