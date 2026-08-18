import { ApiClient } from "./ApiClient";
export class MockApiClient implements ApiClient {
 async get<T>(_path:string){await new Promise(r=>setTimeout(r,180));return {} as T;}
 async post<TRequest,TResponse>(_path:string,body:TRequest){await new Promise(r=>setTimeout(r,180));return body as unknown as TResponse;}
}
