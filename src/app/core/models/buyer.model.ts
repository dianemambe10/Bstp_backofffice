import {User} from "./auth.models";
import {Prefecture} from "./prefecture.model";
import {Commune} from "./commune.model";
import {Region} from "./region.model";
import {TypeSociete} from "./type-societe.model";
import {DomaineActivite} from "./domaine-activite.model";

export class Buyer
{
  id?: number;
  name	?: string;
  nature_of_business?: string;
  contact_person?: string;
  rccm?: string;
  registration_date?: string;
  designation?: string;
  phone_number?: string;
  email?: string;
  region?: number;
  prefecture?: number;
  commune?: Commune;
  address?: string;
  status?: string;
  logo?: string;
  description?: string;
  website?: string;
  show_on_website?: string;
  members?: string;
  number_of_branches?: string;
  sectors?: DomaineActivite[];
  e_procurement_system	?: string;
  type?: TypeSociete;
  slug?: string;
  user?: User;

}
