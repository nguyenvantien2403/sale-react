import CardItem from "@components/CardItem/CardItem";
import PriceRangeInput from "@components/PriceRangeInput/PriceRangeInput";
import React, { useEffect, useState } from "react";
import useProduct from "@api/useProduct";
import { toast } from "react-toastify";
import useBranch from "@api/useBranch";
import StarRating from "@components/Rate/StarRating";
import { Link } from "react-router-dom";
const ShopList = () => {
  const [dataProduct, setData] = useState([]);
  const [branchProduct, setBranch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages,setTotalPage] = useState(0);
  const [branchName, setBranchSearch] = useState(null);
  const [rangeValue, setRangeValue] = useState(0);
  const [nameSearch, setNameSearch] = useState(null);
  const [sortValue,setSortValue] = useState("DES");
  const { getAll } = useProduct();
  const { getBranch } = useBranch();
  const fetchProduct = async () => {
    const {success,data} = await getAll({
      pageIndex: currentPage,
      pageSize: 10,
      ProductName: nameSearch,
      BranchId: branchName,
      SortBy: sortValue,
      
    });

    if(success && data.status != 'Error') {
      setData(data.data.items)
      setTotalPage(data.data.totalPage)
    } else {
      toast.error(data.data.message)
    }
  }

  
  const handleSort = (e) => {
    setSortValue(e.target.value)
  }

  const fetchBranch = async () => {
    const {success,data} = await getBranch({
      BranchName: "",
    });
    if(success && data.status != 'Error') {
      setBranch(data.data.items)
    } else {
      toast.error(data.message)
    }
  }
  const hanleChangeNameSearch = (e) => {//hanleChangeNameSearch: Cập nhật trạng thái nameSearch khi giá trị đầu vào tìm kiếm thay đổi
    setNameSearch(e.target.value)
  }
  const handleSearch = () => { //handleSearch: Gọi hàm fetchProduct để tìm kiếm sản phẩm dựa trên tên.
    fetchProduct()
  }
  const hanleGetByBranch = (v) => {//hanleGetByBranch: Cập nhật trạng thái branchName khi chọn một chi nhánh.
    setBranchSearch(v);
  }
  useEffect(() => {
    fetchProduct();
    fetchBranch()
  }, [branchName,nameSearch,currentPage,sortValue,rangeValue]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };   //Mỗi khi branchName, nameSearch, currentPage, sortValue hoặc rangeValue thay đổi, fetchProduct và fetchBranch sẽ được gọi để lấy dữ liệu mới.
  return (
    <>
      <div class="container-fluid fruite py-5">
        <div class="container py-5">
          <h1 class="mb-4">Fresh fruits shop</h1>
          <div class="row g-4">
            <div class="col-lg-12">
              <div class="row g-4">
                <div class="col-xl-3">
                  <div class="input-group w-100 mx-auto d-flex">
                    <input
                      type="search"
                      class="form-control p-3"
                      placeholder="keywords"
                      aria-describedby="search-icon-1"
                      onChange={(e) => hanleChangeNameSearch(e)}
                    />
                    <span id="search-icon-1" class="input-group-text p-3" style={{cursor: 'pointer'}} onClick={handleSearch}>
                      <i class="fa fa-search"></i>
                    </span>
                  </div>
                </div>
                <div class="col-6"></div>
                <div class="col-xl-3">
                  <div class="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                    <label for="fruits">Default Sorting:</label>
                    <select
                      id="fruits"
                      name="fruitlist"
                      class="border-0 form-select-sm bg-light me-3"
                      form="fruitform"
                      onChange={(e) =>　{
                        handleSort(e)
                      }}
                    >
                      <option value="DES">HIGHT to LOW</option>
                      <option value="ASC">LOW to HIGHT</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row g-4">
                <div class="col-lg-3">
                  <div class="row g-4">
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <h4>Categories</h4>
                        <ul class="list-unstyled fruite-categorie">
                          {
                            branchProduct.map((items,key) => {
                              return (
                              <li key={items.id} >
                                <div class="d-flex justify-content-between fruite-name" onClick={() => hanleGetByBranch(items.id)} style={{cursor: 'pointer'}}>
                                  <div>
                                    <i class="fas fa-apple-alt me-2" ></i>{items.branchName}
                                  </div>
                                  <span>({items.countProduct})</span>
                                </div> 
                              </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <PriceRangeInput data={rangeValue} fnc={(v) => setRangeValue(v)} />
                    </div>
                  
                    <div class="col-lg-12">
                      <h4 class="mb-3">Featured products</h4>

                      {dataProduct.slice(0,3).map((items,key) => {
                        return (
                          <div class="d-flex align-items-center justify-content-start" key={key}>
                              <div
                                class="rounded me-4"
                                style={{ width: "100px", height: "100px" }}
                              >
                                <img
                                  src={items.listFile.length > 0 ?items.listFile[0].fileName  : "img/featur-1.jpg"}
                                  class="img-fluid rounded"
                                  alt=""
                                />
                              </div>
                              <div>
                                <h6 class="mb-2">{items.productName}</h6>
                                <StarRating rate={items.rate} />
                                <div class="d-flex mb-2">
                                  <h5 class="fw-bold me-2">{items.prodcutPrice} $</h5>
                                </div>
                              </div>
                            </div>
                        )
                      })}
                     
                  
                      <div class="d-flex justify-content-center my-4">
                        <div class="btn border border-secondary px-4 py-3 rounded-pill text-primary w-100">
                          Vew More
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-12">
                      <div class="position-relative">
                        <img
                          src="img/banner-fruits.jpg"
                          class="img-fluid w-100 rounded"
                          alt=""
                        />
                        <div
                          class="position-absolute"
                          style={{
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <h3 class="text-secondary fw-bold">
                            Fresh <br /> Fruits <br /> Banner
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-9">
                  <div class="row g-4 justify-content-center">
                    {dataProduct.map((fruit,index) => {
                      return (
                            <CardItem
                              imgSrc={fruit.listFile[0]?.fileName}
                              key={fruit.id}
                              id={fruit.id}
                              name={fruit.productName}
                              description={fruit.productDescription}
                              price={fruit.prodcutPrice}
                          />
                      );
                    })}
                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a
                          href="#"
                          className="rounded"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          «
                        </a>
                        {Array.from({ length: totalPages}, (_, index) => (
                          <a
                            key={index}
                            href="#"
                            className={
                              currentPage === index + 1
                                ? "active rounded"
                                : "rounded"
                            }
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </a>
                        ))}
                        <a
                          href="#"
                          className="rounded"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          »
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopList;
