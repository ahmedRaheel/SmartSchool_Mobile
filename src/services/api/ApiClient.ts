export interface ApiClient {
  get<T>(path:string):Promise<T>;
  post<TRequest,TResponse>(path:string,body:TRequest):Promise<TResponse>;
}
export class HttpApiClient implements ApiClient {
  constructor(private readonly baseUrl:string){}
  async get<T>(path:string){const r=await fetch(`${this.baseUrl}${path}`);if(!r.ok)throw new Error("Request failed");return r.json() as Promise<T>;}
  async post<TRequest,TResponse>(path:string,body:TRequest){const r=await fetch(`${this.baseUrl}${path}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});if(!r.ok)throw new Error("Request failed");return r.json() as Promise<TResponse>;}
}
