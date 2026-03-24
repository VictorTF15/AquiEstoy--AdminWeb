import type {
  Caso,
  CasoCategoriaRelation,
  CasoCategoriaRelationListResponse,
  CasoListResponse,
  CasoMapa,
  CasoStats,
  CasoWriteResponse,
} from "../../types/casos";
import type { Categoria, CategoriaListResponse } from "../../types/categorias";
import type {
  Donacion,
  DonacionListResponse,
  MisDonacionesResponse,
} from "../../types/donaciones";
import type {
  PaginatedResponse,
  User,
  UserWriteResponse,
} from "../../types/users";
import type {
  Evidencia,
  EvidenciaListResponse,
} from "../../types/evidencias";
import type {
  Conversacion,
  ConversacionListResponse,
} from "../../types/conversaciones";
import type {
  Mensaje,
  MensajeListResponse,
} from "../../types/mensajes";
import type {
  Reporte,
  ReporteListResponse,
  Sancion,
  SancionListResponse,
} from "../../types/moderacion";
import type {
  DocumentoOCR,
  DocumentoOCRListResponse,
  DocumentoOCRProcessResponse,
  LogOCR,
  LogOCRListResponse,
} from "../../types/ocr";
import type {
  EstadoCasoCatalog,
  EstadoCasoListResponse,
  EstadoOCRCatalog,
  EstadoOCRListResponse,
  EstadoReporteCatalog,
  EstadoReporteListResponse,
  TipoMensajeCatalog,
  TipoMensajeListResponse,
  TipoSancionCatalog,
  TipoSancionListResponse,
  TipoUsuarioCatalog,
  TipoUsuarioListResponse,
} from "../../types/catalogos";

export interface ResponseTypeMap {
   DeleteResponse: { message: string };
    MessageResponse: { message: string };

        User: User;
        UserWrite: UserWriteResponse;
        UserList: PaginatedResponse<User>;

        CaseCategoryRelation: CasoCategoriaRelation;
        CaseCategoryRelationList: CasoCategoriaRelationListResponse;

        Case: Caso;
        CaseWrite: CasoWriteResponse;
        CaseList: CasoListResponse;
        CaseStats: CasoStats;
        CaseMapList: CasoMapa[];
        CategoryResponse: Categoria;
        CategoryListResponse: CategoriaListResponse;

        Donation: Donacion;
        DonationList: DonacionListResponse;
        MyDonations: MisDonacionesResponse;

        Evidencia: Evidencia;
        EvidenciaList: EvidenciaListResponse;

        Conversacion: Conversacion;
        ConversacionList: ConversacionListResponse;

        Mensaje: Mensaje;
        MensajeList: MensajeListResponse;

        Reporte: Reporte;
        ReporteList: ReporteListResponse;

        Sancion: Sancion;
        SancionList: SancionListResponse;

        DocumentoOCR: DocumentoOCR;
        DocumentoOCRList: DocumentoOCRListResponse;
        DocumentoOCRProcessResponse: DocumentoOCRProcessResponse;

        LogOCR: LogOCR;
        LogOCRList: LogOCRListResponse;

        EstadoCaso: EstadoCasoCatalog;
        EstadoCasoList: EstadoCasoListResponse;
        EstadoOCR: EstadoOCRCatalog;
        EstadoOCRList: EstadoOCRListResponse;
        EstadoReporte: EstadoReporteCatalog;
        EstadoReporteList: EstadoReporteListResponse;
        TipoMensaje: TipoMensajeCatalog;
        TipoMensajeList: TipoMensajeListResponse;
        TipoSancion: TipoSancionCatalog;
        TipoSancionList: TipoSancionListResponse;
        TipoUsuario: TipoUsuarioCatalog;
        TipoUsuarioList: TipoUsuarioListResponse;
  
}

export type ResponseType<T extends keyof ResponseTypeMap> = ResponseTypeMap[T];
