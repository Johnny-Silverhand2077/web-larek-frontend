import { ApiListResponse, Api } from "../base/api"; 
import {IProduct,  IApiClient, IOrderData, IOrderDataResult,} from "../../types";

export class ApiClient extends Api implements IApiClient{
    cdn: string;
    items: IProduct[];

    constructor(cdn: string, baseUrl: string, options: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) => 
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
        })))
    }

    getProduct(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((product: IProduct) => ({
            ...product,
            image: this.cdn + product.image,
        }))

    }

    postOrder(order: IOrderData): Promise<IOrderDataResult> {
        return this. post('/order', order).then((res: IOrderDataResult) => res)
    }
}