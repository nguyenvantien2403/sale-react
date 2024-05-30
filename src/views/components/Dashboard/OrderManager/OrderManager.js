import { Link } from "react-router-dom"
import DetailOrder from "./DetailOrder"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
const { default: useOrder } = require("@api/useOrder")
const { Table, Pagination, Space, Button } = require("antd")
const { useState, useEffect } = require("react")
const { toast } = require("react-toastify")
const OrderManager = () => {
    const {getAll} = useOrder()
    const [orders, setOrder] = useState([])
    const [loading, setLoading] = useState(true)
    const [total,setTotal] = useState()
    const [tableParams, setTableParams] = useState({
        pagination: {
            pageIndex: 1,
            pageSize: 10
        }
    })
    

    const fetchData = async () => {
        const {success,data} = await getAll(tableParams.pagination);
        console.log(data);
        if(success && data.status != 'Error') {
            setOrder(data.data.items)
            setLoading(false)
            setTotal(data.data.totalCount)
        }else {
            toast.error(data.message)
        }
    }
    useEffect(() => {
        fetchData()    
    }, [JSON.stringify(tableParams), loading])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
          });
          if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setOrder([]);
          }
    }

    const onShowSizeChange  = (current,pageSize) => {
        setTableParams({
            pagination: {
                pageIndex: current,
                pageSize: pageSize
            }
        })
    }
    const columns = [

        {
            title: 'FullName',
            render: (data) => {
                return (<p>{`${data.firstName} ${data.lastName}`}</p>)
            }
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Price',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Link to={record.id}>
                        <Button type='primary' title='Detail Order'>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Button>
                    </Link>
                     
                </Space>
            ),
        },
        
    ]
    return (

        <>
         <Table 
                dataSource={orders}   
                columns={columns}
                pagination={false}
                loading={loading}
                onChange={handleTableChange}
        />

        <Pagination showSizeChanger
                onChange={onShowSizeChange} 
                style={{textAlign: 'center',marginTop: '1.5rem'}} 
                defaultCurrent={tableParams.pagination.pageIndex} 
                total={total}  />
        </>
       
    )
} 

export default OrderManager