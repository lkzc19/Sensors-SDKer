export interface BaseTabData {
  event: string;
  time: string;
  idmv: string;
  distinct_id: string;
  login_id: string;
}

export interface OtherTabData {
  index: number;
  pKey: string;
  pValue: any;
  pType: string;
}