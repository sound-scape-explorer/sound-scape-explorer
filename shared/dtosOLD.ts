enum IndexImpl {
  leq_maad = 'leq_maad',
  ht = 'ht',
  hf = 'hf',
  med = 'med',
  ndsi = 'ndsi',
  aci = 'aci',
  adi = 'adi',
  bi = 'bi',
}

// todo: to remove
export interface IndexDto {
  index: number;
  impl: IndexImpl;
  offset: number;
  step: number;
  isPersist: boolean;
}
