import {User} from "./auth.models";
import {Prefecture} from "./prefecture.model";
import {Commune} from "./commune.model";
import {Region} from "./region.model";
import {TypeSociete} from "./type-societe.model";
import {DomaineActivite} from "./domaine-activite.model";
import {Buyer} from "./buyer.model";
import {TypeDemande} from "./type-demande.model";
import {Entreprise} from "./entreprise.model";

export class Requests
{
  id?: number;
  name?: string;
  reference?: string;
  summary?: string;
  description?: string;
  deadline?: string;
  public_url?: string;
  submission_instructions?: string;
  expected_decission_date?: string;
  joined_total?: number;
  messages_total?: number;
  notes_total?: number;
  files_total?: number;
  created_at?: Date;
  updated_at?: Date;
  published_at?: Date;
  is_published?: boolean;
  response_total?: number;
  request_source?: string;
  slug?: string;
  is_public?: boolean;
  tags?: string;
  buyer?: Buyer;
  type?: TypeDemande;
  //groups?: SpecialGroup;
  tender_source?: string;
  attachement?: string;
  is_draft?: boolean;
  created_by?: User;
  expired_at?: Date;
  email?: string;
  modality?: string;
  categories?: Array<TypeSociete>;
  status?: string;
  restricted_suppliers?: Array<Entreprise>;
  //restricted_label?: Labelisation;
  restricted_type?: string;


}
