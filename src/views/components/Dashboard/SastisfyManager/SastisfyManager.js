import { Doughnut } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import {Row,Col} from 'antd'
import { Chart as ChartJS,  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend, ArcElement } from 'chart.js';

import { Line } from 'react-chartjs-2';
import useDashboard from '@api/useDashboard';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sastis.module.scss'
const cx = classNames.bind(styles)

ChartJS.register(ArcElement, Tooltip, Legend);

function SastisfyManager() {
    const {get} = useDashboard()
    const [dataBranch,setDatabranch] = useState([])
    const [dataDashboard,setdataDashboard] = useState({})

    const fetchDashboard = async () => {
      const {success,data} = await get();
      if(success) {
        setDatabranch(data.data.listBranch)
        setdataDashboard(data.data)
      }
    }
    useEffect(() => {
      fetchDashboard()
    }, [])

    const data = {
      labels: dataBranch.map(items => items["key"]),
      datasets: [
        {
          label: 'Count ',
          data: dataBranch.map(items => items["value"]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(122, 103, 83, 0.2)',

          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(122, 103, 83, 1)',

          ],
          borderWidth: 1,
        },
      ],
    };
    


    
   return ( 

    <div className='row'>
    <div className='mt-6 col-xl-4 col-lg-6 col-md-12 col-12'>
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <div><h4 class="mb-0">Category</h4>
                  </div>
                  <div class="icon-shape icon-md bg-light-primary text-primary rounded-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="18" height="18" fill="currentColor"><path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"></path></svg></div></div><div><h1 class="fw-bold">
                      {dataDashboard.dataCountBranchs}
                      </h1>
                      {/* <p class="mb-0">
                      Completed</p> */}
                      </div>
                      </div>
                      </div>
                  <div>
              </div>

          </div>
        <div className='mt-6 col-xl-4 col-lg-6 col-md-12 col-12'>
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div><h4 class="mb-0">Brand</h4>
                </div>
                <div class="icon-shape icon-md bg-light-primary text-primary rounded-2">
                  <img width="25" height="25" src="https://img.icons8.com/dusk/64/product.png" alt="product"/>
                  </div>
                  </div>
                  <div>
                    
                    <h1 class="fw-bold">
                      {dataDashboard.dataCountOrigins}
                    </h1>
                    {/* <p class="mb-0">
                    Prestige</p> */}
                    </div>
                    </div>
                  </div>
                <div>
            </div>

        </div>
        <div className='mt-6 col-xl-4 col-lg-6 col-md-12 col-12'>
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div><h4 class="mb-0">Products</h4>
                </div>
                <div class="icon-shape icon-md bg-light-primary text-primary rounded-2">
                  <img width="25" height="25" src="https://img.icons8.com/dusk/64/product.png" alt="product"/>
                  </div>
                  </div>
                  <div>
                    
                    <h1 class="fw-bold">
                      {dataDashboard.dataProduct}
                    </h1>
                    {/* <p class="mb-0">
                    Fresh</p> */}
                    </div>
                    </div>
                  </div>
                <div>
            </div>

        </div>

        <div className='mt-6 col-xl-4 col-lg-6 col-md-12 col-12'>
          <Pie data={data} />
        </div>

        <div className='mt-6 col-xl-4 col-lg-6 col-md-12 col-12'>
          <td class="align-middle text-dark">
            <div class="float-start me-3">{(dataDashboard.orderSuccess * 100).toFixed(2)}%</div>
            <div class="mt-2">
              <div style={{height: '5px'}} cx={"progress"}>
                <div role="progressbar" className={cx("progress-bar")} style={{width: `${(dataDashboard.orderSuccess * 100).toFixed(2)}%`}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
              </div>
          </td>
          <td class="align-middle text-dark"><div class="float-start me-3">{(dataDashboard.orderCancle * 100).toFixed(2)}%</div><div class="mt-2"><div style={{height: '5px'}} className={cx("progress")}><div role="progressbar" cx={"progress-bar"} style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div></div></div></td>
          <td class="align-middle text-dark"><div class="float-start me-3">{(dataDashboard.orderFailed * 100).toFixed(2)}%</div><div class="mt-2"><div style={{height: '5px'}} className={cx("progress")}><div role="progressbar" cx={"progress-bar" }style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div></div></div></td>
        </div>

        <div className='mt-6 col-xl-4 col-lg-6 col-md-12 col-12'>
                <div class="card-body p-4">
                    <h5 class="card-title mb-9 fw-semibold">Yearly Breakup</h5>
                    <div class="row align-items-center">
                      <div class="col-8">
                        <h4 class="fw-semibold mb-3">${dataDashboard.totalByYear}</h4>
                        <div class="d-flex align-items-center mb-3">
                          <span class="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                            <i class="ti ti-arrow-up-left text-success"></i>
                          </span>
                          <p class="text-dark me-1 fs-3 mb-0">+{dataDashboard.percenCreaseGP}%</p>
                          <p class="mb-0">last year</p>
                        </div>
                        <div class="d-flex align-items-center">
                          <div class="me-4">
                            <span class="round-8 bg-primary rounded-circle me-2 d-inline-block"></span>
                            <span >2024</span>
                          </div>
                          <div>
                            <span class="round-8 bg-light-primary rounded-circle me-2 d-inline-block"></span>
                            <span >2023</span>  
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>




        
    </div>
     
        

        
  
 );
}

export default SastisfyManager;