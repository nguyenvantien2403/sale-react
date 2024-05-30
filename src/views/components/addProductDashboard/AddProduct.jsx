import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import useBranch from "@api/useBranch";
import useOrigin from "@api/useOrigin";
import useProduct from "@api/useProduct";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
const getBase64 = (file) =>
new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const AddProduct = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const [form] = Form.useForm();
  const { createProduct } = useProduct();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');


  const {getAllBranch} = useBranch()
  const {getAllOrigin} = useOrigin()
  // const {getAllOrigin} = useOrigin()
  const [branch, setBranch] = useState([])
  const [origin, setOrigin] = useState([])


const handleRemove = () => {
  console.log('delete');
}
  const fetchbranch = async () => {
    const {success, data} = await getAllBranch();

    if(data != null && success) {
      var databranch = data.data.map((items) => {
        return {
          value: items.id,
          label: items.branchName
        }
      });
      setBranch(databranch)
    }
  }


  const fetchOrigin = async () => {
    const { success,data} = await getAllOrigin();
    if(data != null && success) {
      var dataOrigin = data.data.map((items) => {
        return {
          value: items.id,
          label: items.originName
        }
      });
      setOrigin(dataOrigin)
    }
  }
  



  useEffect(() => {
    fetchbranch()
    fetchOrigin()
  }, [])
  const [fileList, setFileList] = useState([]);
  const [fileListUpload, setfileListUpload] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangeFile = ({ fileList: newFileList }) => {
    newFileList.forEach(items => items.status='done')
    setFileList(newFileList);
  };


  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  

  const onFinish = async (values) => {
    try {
      // Tạo đối tượng product từ các giá trị được nhập từ form
      const formData = new FormData()
      formData.append('branchId', values.branchId);
      formData.append('originId', values.originId);
      formData.append('productName', values.productName);
      formData.append('ProdcutPrice', values.productPrice);
      formData.append('ProductQuanlity', values.productQuantity);
      formData.append('productDescription', values.productDescription);
      formData.append('productMaterial', values.productMaterial);
      formData.append('productType', values.productType);
      fileList.forEach((file, index) => {
        formData.append(`ListFileImg`, file.originFileObj);
      });
      const {success,data} = await createProduct(formData, { "Content-Type": "multipart/form-data"});
      if (data.status != 'Error' && success) {
          setModal2Open(false);
          toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("loi")
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};

 const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
    };

  return (
    <div>
      <Button
        type="primary"
        value="large"
        style={{
          marginTop: "40px",
          display: "flex",
          alignItems: "center",
          background: "#1fbf39",
          marginBottom: "20px",
        }}
        onClick={() => setModal2Open(true)}
      >
        <PlusSquareOutlined /> Add
      </Button>

      <Modal
        width={'60%'}
        title="Create new Product"
        centered
        visible={modal2Open}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ layout: "horizontal" }}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true, message: "Please input product name!" }]}
              >
                <Input placeholder="Product Name" />
              </Form.Item>
            </Col>


            <Col span={8}>
              <Form.Item
                label="Branch"
                name="branchId"
                rules={[{ required: true, message: "Please input Branch!" }]}
              >
                <Select
                  placeholder="Please select"
                  onChange={handleChange}
                  style={{
                    width: '100%'
                  }}
                  options={branch}
                  />
              </Form.Item>
             

          </Col>
         
          <Col span={8}>
            <Form.Item
              label="Origin"
              name="originId"
              rules={[{ required: true, message: "Please input Origin" }]}
            >
              <Select
                placeholder="Please select"
                onChange={handleChange}
                style={{
                  width: '100%',
                }}
                options={origin}
              />

            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              label="Price"
              name="productPrice"
              rules={[{ required: true, message: "Please input product price!" }]}
            >
              <Input placeholder="Price" type="text" />
            </Form.Item>
          </Col>
         
          <Col span={8}>
            <Form.Item
              label="Quantity"
              name="productQuantity"
              rules={[
                { required: true, message: "Please input product quantity!"},
              ]}
            >
              <Input placeholder="Quantity" type="text" />
            </Form.Item>
          </Col>
          
          <Col span={8}>
            <Form.Item
              label="Description"
              name="productDescription"
              rules={[
                { required: true, message: "Please input product description!" },
              ]}
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
          
          </Col>
          
          <Col span={8}>
          
            <Form.Item
              label="Material"
              name="productMaterial"
              rules={[
                { required: true, message: "Please input product material!" },
              ]}
            >
              <Input placeholder="Material" />
            </Form.Item>

          </Col>
          
          
          
         
          
         
         
          <Col span={8}>
            <Form.Item
              label="Type"
              name="productType"
              rules={[{ required: true, message: "Please input product type!" }]}
            >
              <Input placeholder="Type" />
            </Form.Item>
          </Col>
         
          
       
          <Col span={8}>
            

          <Form.Item
              label="List File Image"
              name="listFileImg"
              getValueFromEvent={e => {
                if (Array.isArray(e)) {
                  var elist = [];
                  console.log( e.fileList);
                  e.fileList.forEach(element => {
                    elist.push(element.originFileObj)
                  })
                } 
               
                return elist
              }}
            >

            <Upload
              listType="picture-card"
              name="listFileImg"
              fileList={fileList}
              onRemove={() => {
                handleRemove();
              }}
              onPreview={handlePreview}
              onChange={handleChangeFile}
            >
              {fileList.length < 0 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
            </Form.Item>
          </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddProduct;
