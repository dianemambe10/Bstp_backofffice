import {User} from "./auth.models";
import {TypeSociete} from "./type-societe.model";
import {Prefecture} from "./prefecture.model";
import {Commune} from "./commune.model";
import {DomaineActivite} from "./domaine-activite.model";
import {Region} from "./region.model";

export class Entreprise {
  address?:  string;
  aguipe_document?:  string;
  approx_turnover?:  string;
  attend_workshop?:  string;
  categories?:  DomaineActivite[];
  commune?:  Commune;
  conflict_of_interrest?:  string;
  created_at?:  string;
  credit_checks?:  string;
  criminal_offence?:  string;
  debarred?:  string;
  declare_true?:  string;
  description?:  string;
  disable_number?:  string;
  email?:  string;
  employee_disabled?:  string;
  etat_financier_document?:  string;
  expired_date?:  string;
  expiry_reminder?:  string;
  facebook_url?:  string;
  good_service_provided?:  string;
  id?:  string;
  industry_qualifications?:  string;
  instagram_url?:  string;
  is_active?:  string;
  linkedin_url?:  string;
  local_content?:  string;
  local_content_file?:  string;
  logo?:  string;
  logo_height?:  string;
  logo_ppoi?:  string;
  logo_width?:  string;
  name?:  string;
  nif_document?:  string;
  ninea?:  string;
  number_of_branches?:  string;
  number_of_employees?:  string;
  ownership_under_35?:  string;
  ownership_women?:  string;
  phone_number?:  string;
  prefecture?:  Prefecture;
  quitus_fiscal_document?:  string;
  quitus_social_document?:  string;
  rccm?:  string;
  rccm_document?:  string;
  region?:  Region;
  registered_by?:  User;
  slug?:  string;
  status?:  string;
  statut_document?:  string;
  tier?:  string;
  tiktok_url?:  string;
  type?:  TypeSociete;
  udpated_at?:  string;
  understand_risk?:  string;
  website?:  string;
  woman_ownership_percentage?:  string;
  year_of_registration?:  string;

}

export class EntrepriseInfo {
  address?:  string;
  aguipe_document?:  string;
  approx_turnover?:  string;
  attend_workshop?:  string;
  categories?:  string;
  commune?:  Commune;
  conflict_of_interrest?:  string;
  created_at?:  string;
  credit_checks?:  string;
  criminal_offence?:  string;
  debarred?:  string;
  declare_true?:  string;
  description?:  string;
  disable_number?:  string;
  email?:  string;
  employee_disabled?:  string;
  etat_financier_document?:  string;
  expired_date?:  string;
  expiry_reminder?:  string;
  facebook_url?:  string;
  good_service_provided?:  string;
  id?:  string;
  industry_qualifications?:  string;
  instagram_url?:  string;
  is_active?:  string;
  linkedin_url?:  string;
  local_content?:  string;
  local_content_file?:  string;
  logo?:  string;
  logo_height?:  string;
  logo_ppoi?:  string;
  logo_width?:  string;
  name?:  string;
  nif_document?:  string;
  ninea?:  string;
  number_of_branches?:  string;
  number_of_employees?:  string;
  ownership_under_35?:  string;
  ownership_women?:  string;
  phone_number?:  string;
  prefecture?:  string;
  quitus_fiscal_document?:  string;
  quitus_social_document?:  string;
  rccm?:  string;
  rccm_document?:  string;
  region?:  Region;
  registered_by?:  User;
  slug?:  string;
  status?:  string;
  statut_document?:  string;
  tier?:  string;
  tiktok_url?:  string;
  type?:  TypeSociete;
  udpated_at?:  string;
  understand_risk?:  string;
  website?:  string;
  woman_ownership_percentage?:  string;
  year_of_registration?:  string;

}