import { data } from 'jquery'
import useRequest from './useRequest'
const useProduct = () => {
	const { createPostRequest, createGetRequest, createDeleteRequest, cancel } = useRequest('Product')
	const getAll = (data) => createPostRequest({
		endpoint: '/getall',
		data: data
	})
    const getAllById = (id) => createGetRequest({
		endpoint: '/find-by-id',
		params: {id: id}
	})
    const getBestSale = () => createGetRequest({
		endpoint: '/getBestSale',
		params: null
	})
	const createProduct  = (data,headers) => createPostRequest({
		endpoint: '/create',
		data: data,
		headers: headers
	})
	
	const deleteProduct = (params) => createDeleteRequest({
		endpoint: '/delete',
		params: params
	})
	
	return {
		getAll,
		getBestSale,
        getAllById,
		createProduct,
		deleteProduct
	}
}

export default useProduct