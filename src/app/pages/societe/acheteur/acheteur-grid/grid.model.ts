import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";
import {User} from "../../../../core/models/auth.models";

export interface GridModel {
  id?: any;
  name	?:   any;
  nature_of_business?:   any;
  contact_person?:   any;
  rccm?:   any;
  registration_date?:   any;
  designation?:   any;
  phone_number?:   any;
  email?:   any;
  region?: Region;
  prefecture?: Prefecture;
  commune?: Commune;
  address?:   any;
  status?:   any;
  logo?:   any;
  description?:   any;
  website?:   any;
  show_on_website?:   any;
  members?:   any;
  number_of_branches?:   any;
  sectors?: DomaineActivite;
  e_procurement_system	?:   any;
  type?: TypeSociete;
  slug?:   any;
  user?: User;
}
