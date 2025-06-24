export interface BaseTabData {
  event: string;
  item_type: string;
  item_id: string;
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