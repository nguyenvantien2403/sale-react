import useOrder from '@api/useOrder';
import { render } from '@testing-library/react';
import { Button,Modal,Form,Row, Col,Input, Select, Space, Table, Tag, Dropdown  } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function DetailOrder() {
    const params = useParams();
    const {getDetail,edit} = useOrder();
    const [order,setOrders] = useState({})
    const [loading,setLoading] = useState(true)
    const fetchData = async () => {
      const {success,data} = await getDetail(params)
      if (success && data.status != 'Error') {
        toast.success(data.message)
        setOrders(data.data)
        setLoading(false)
      } else {
        toast.error(data.message)
      }
    }

    const [modal2Open, setModal2Open] = useState(false);


    const [status, setStatus] = useState('');
    const handleSetStatus = async () => {
      const {success,data} = await edit({id: order.id},status)
      if(success && data.status != 'Error') {
        toast.success(data.message)
        setTimeout(() => {
          setModal2Open(false)
          setLoading(false)
        }, 2500 );
      } else {
        toast.error(data.message)
      }
    }
    const handChangeValue  = (value) => {
      setStatus(value)
    }
    useEffect(()=> {
      fetchData()
    }, [loading])
    const columns = [
      {
        title: 'Product',
        dataIndex: 'productName',
        key: 'name',
      },
      {
        title: 'Count',
        dataIndex: 'count',
        key: 'age',
      },
      {
        title: 'Total',
        dataIndex: 'total',
        key: 'age',
        render: (_, record) => (
          (<p>{record.count * record.price}</p>)
        )
      },
    ];
    return ( 
      <div> 
        <fieldset>
          <legend>
            <p>Order detail Information</p>
          </legend>

          <Row>
            <Col span={16}>
            <span>
              <p>User: {order.firstName} {order.lastName}</p>
              <p>Phone: {order.mobile} </p>
              <p>Note : {order.orderNotes} </p>
              <p>Create Date : {order.createat} </p>
              <p>Email : {order.email} </p>
              <p>Address : {order.address} </p>
              <p>Total : {order.totalPrice} </p>
              <p>Status :     <Tag color="volcano">{order.status} </Tag> </p>
            </span>
            </Col>

            <Col span={3}>
              <Button  type="primary" value="large" style={{background: 'green'}}  onClick={() => setModal2Open(true)}>
                  Update status
              </Button>
              <Modal
                 width={'50%'}
                 centered
                 visible={modal2Open}
                 onCancel={() => setModal2Open(false)}
                 onOk={() => handleSetStatus()}
              >
                <Select
                    placeholder="Chang status"
                    defaultValue={order.status}
                    onChange={handChangeValue}
                    options={[
                      {
                        value: 'DANGCHUANBI',
                        label: 'Đang chuẩn bị',
                      },
                      {
                        value: 'CHOXACNHAN',
                        label: 'Chờ xác nhận',
                      },
                      {
                        value: 'DANGIAO',
                        label: 'Đang giao',
                      },
                      {
                        value: 'DANHAN',
                        label: 'Đã nhận',
                      },
                      {
                        value: 'DAGUI',
                        label: 'Đã gửi',
                      },
                      {
                        value: 'DATHANHTOAN',
                        label: 'Đã thanh toán',
                      },
                      {
                        value: 'THANHCONG',
                        label: 'Thành công',
                      },
                      {
                        value: 'DAHUY',
                        label: 'Đã hủy',
                      },
                      {
                        value: 'THATBAI',
                        label: 'Thất bại',
                      },
                    ]}
                  />
              </Modal>
            </Col>
          </Row>

          <span>
          <Table dataSource={order.cartDtos} columns={columns} />
          </span>
        </fieldset>


     
     </div> );
}

export default DetailOrder;