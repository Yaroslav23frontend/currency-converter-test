export interface Rate {
  data: string;
  historical: boolean;
  info: { rate: number };
  method: {
    msg: string;
    url: string;
  };
  query: { form: string; to: string; amount: number };
  result: number;
  success: boolean;
}
