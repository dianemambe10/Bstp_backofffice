import {User} from "../../../../core/models/auth.models";
import {Region} from "../../../../core/models/region.model";
import {Prefecture} from "../../../../core/models/prefecture.model";
import {Commune} from "../../../../core/models/commune.model";
import {DomaineActivite} from "../../../../core/models/domaine-activite.model";
import {TypeSociete} from "../../../../core/models/type-societe.model";

export interface ListModel {
  id?: any;
  name	?:   any;
  phone_number?:   any;
  email?:   any;
  region?: Region;
  prefecture?: Prefecture;
  commune?: Commune;
  address?:   any;
  website?:   any;
  type?: any;
  slug?:   any;
  status: any;
}
