import React, { useEffect, useState } from 'react';
import { Button, Select, Space, Table, Tag } from 'antd';
import useProduct from '@api/useProduct';
import { toast } from 'react-toastify';
import { Pagination } from 'antd';
import AddProduct from '@views/components/addProductDashboard/AddProduct';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd'
import Delete from './DeleteProduct';
import Detail from './Detail';
import Edit from './Edit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';




  
function ProductManager() {






        
    const { getAll } = useProduct()

    const [product, setProduct] = useState([])

    const [loading, setLoading] = useState(false);



    const [total, setTotal] = useState();
    const [tableParams, setTableParams] = useState({
      pagination: {
        pageIndex: 1,
        pageSize: 10,
      },
    });


    





    const fetchData = async () => {
        const {success,data} = await getAll(tableParams.pagination);
        if(!success || data.status == 'Error') {
            toast.error('Có lỗi xảy ra')
        } else {

            console.log(data.data.items);
            setProduct(data.data.items)
            setLoading(false);
            setTotal(data.data.totalCount)
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
          setProduct([]);
        }
      };
    const onShowSizeChange = (current, pageSize) => {
        setTableParams({pagination: {
            pageIndex: current,
            pageSize: pageSize
        }})
    };

    

      
    const columns = [
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price ($)',
            dataIndex: 'prodcutPrice',
            key: 'prodcutPrice',
        },
        {
            title: 'Number',
            dataIndex: 'productQuanlity',
            key: 'productQuanlity',
        },
    
        {
            title: 'BranchName',
            dataIndex: 'branchName',
            key: 'branchName',
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
        },
        {
            title: 'Views',
            dataIndex: 'views',
            key: 'views',
        },
        {
            title: 'Sold',
            dataIndex: 'productSold',
            key: 'productSold',
        },
        {

            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Delete id={record.id} state={loading} action={setLoading} />
                    <Link to={record.id}>
                        <Button type='primary' title='Detail Product'>
                            <FontAwesomeIcon icon={faCircleInfo} />
                        </Button>
                    </Link>
                    <Link to={`/dashboard/product/edit/${record.id}`}>
                        <Button title='Edit Product' style={{
                            backgroundColor: 'brown'
                        }}>
                            <FontAwesomeIcon icon={faPenToSquare} style={{color: "white"}} />
                        </Button>
                    </Link>
                </Space>
            ),
        },
        ];

    return ( 
        <>

            <AddProduct />
            <Table 
                dataSource={product} columns={columns}     
                pagination={false}
                loading={loading}
                onChange={handleTableChange}
            />
            <Pagination  
                showSizeChanger
                onChange={onShowSizeChange} 
                style={{textAlign: 'center',marginTop: '1.5rem'}} 
                defaultCurrent={tableParams.pagination.pageIndex} 
                total={total} 
            />  
        </> 
    );
}

export default ProductManager;