import type {
  CreateCaso,
  CreateCasoCategoriaRelation,
  ReplaceCaso,
  ReplaceCasoCategoriaRelation,
  UpdateCaso,
  UpdateCasoCategoriaRelation,
} from "../../types/casos";
import type { CreateCategoria, UpdateCategoria } from "../../types/categorias";
import type {
  CreateDonacion,
  ReplaceDonacion,
  UpdateDonacion,
} from "../../types/donaciones";
import type {
  ChangeUserPassword,
  CreateUser,
  ReplaceUser,
  UpdateUser,
} from "../../types/users";
import type {
  CreateEvidencia,
  ReplaceEvidencia,
  UpdateEvidencia,
} from "../../types/evidencias";
import type {
  CreateConversacion,
  ReplaceConversacion,
  UpdateConversacion,
} from "../../types/conversaciones";
import type {
  CreateMensaje,
  ReplaceMensaje,
  UpdateMensaje,
} from "../../types/mensajes";
import type {
  CreateReporte,
  ReplaceReporte,
  UpdateReporte,
  CreateSancion,
  ReplaceSancion,
  UpdateSancion,
} from "../../types/moderacion";
import type {
  CreateDocumentoOCR,
  ReplaceDocumentoOCR,
  UpdateDocumentoOCR,
  UploadDocumentoOCR,
} from "../../types/ocr";

export interface RequestPayloadMap {
  CreateUser: CreateUser;
  ReplaceUser: ReplaceUser;
  UpdateUser: UpdateUser;
  ChangeUserPassword: ChangeUserPassword;

  CreateCase: CreateCaso;
  ReplaceCase: ReplaceCaso;
  UpdateCase: UpdateCaso;

  CreateCaseCategoryRelation: CreateCasoCategoriaRelation;
  ReplaceCaseCategoryRelation: ReplaceCasoCategoriaRelation;
  UpdateCaseCategoryRelation: UpdateCasoCategoriaRelation;

  CreateDonation: CreateDonacion;
  ReplaceDonation: ReplaceDonacion;
  UpdateDonation: UpdateDonacion;

  CreateEvidencia: CreateEvidencia;
  ReplaceEvidencia: ReplaceEvidencia;
  UpdateEvidencia: UpdateEvidencia;

  CreateConversacion: CreateConversacion;
  ReplaceConversacion: ReplaceConversacion;
  UpdateConversacion: UpdateConversacion;

  CreateMensaje: CreateMensaje;
  ReplaceMensaje: ReplaceMensaje;
  UpdateMensaje: UpdateMensaje;

  CreateReporte: CreateReporte;
  ReplaceReporte: ReplaceReporte;
  UpdateReporte: UpdateReporte;

  CreateSancion: CreateSancion;
  ReplaceSancion: ReplaceSancion;
  UpdateSancion: UpdateSancion;

  CreateDocumentoOCR: CreateDocumentoOCR;
  ReplaceDocumentoOCR: ReplaceDocumentoOCR;
  UpdateDocumentoOCR: UpdateDocumentoOCR;
  UploadDocumentoOCR: UploadDocumentoOCR;

  CreateCategory: CreateCategoria;
  UpdateCategory: UpdateCategoria;
  Empty: never;
}

export type PayloadType<T extends keyof RequestPayloadMap> =
  RequestPayloadMap[T];
