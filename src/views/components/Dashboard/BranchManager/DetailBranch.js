import useProduct from "@api/useProduct";
import StarRating from "@components/Rate/StarRating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fruit from '../../../../assets/img/banner-fruits.jpg'
import { toast } from "react-toastify";
import useBranch from "@api/useBranch";
import { Button, Col, Form, Input, Modal, Row, Select, message  } from "antd";

function DetailBranch() {
    const params = useParams();
    const {getBranchById} = useBranch();
    const [branch,setBranch] = useState({})
    const fetchBranch = async () => {
        const {success,data} = await getBranchById({id: params.id})
        if(data.status != "Error" && success) {
            setBranch(data.data)
        } else {
            toast.error(data.message)
        }
    }
    useEffect(() => {
        fetchBranch()
    }, [])
    return ( 
        <h4 class="fw-bold mb-3">BranchName : {branch.branchName}</h4>
    );
}

export default DetailBranch;