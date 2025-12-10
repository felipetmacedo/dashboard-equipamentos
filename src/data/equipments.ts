import { Equipment } from "@/types";

export const equipments: Equipment[] = [
  {
    identificador: "E0003",
    modelo: "Monitor Cardíaco P500",
    fabricante: "MedTech",
    setor: "UTI 1",
    status: "Em Manutenção",
    dataAquisicao: "2010-03-15",
    custo: 45000.00,
    totalCustoExterno: 18200.00,
    prioridadeScore: 95,
    ordemServicoIds: ["OS2025001", "OS2024112", "OS2023055"]
  },
  {
    identificador: "E0008",
    modelo: "Bomba de Infusão XL-100",
    fabricante: "BioPump",
    setor: "Emergência",
    status: "Operacional",
    dataAquisicao: "2018-08-20",
    custo: 12000.00,
    totalCustoExterno: 5500.00,
    prioridadeScore: 88,
    ordemServicoIds: ["OS2025010"]
  },
  {
    identificador: "E0012",
    modelo: "Ventilador Pulmonar V900",
    fabricante: "RespiroCorp",
    setor: "UTI 2",
    status: "Baixado",
    dataAquisicao: "2008-11-05",
    custo: 150000.00,
    totalCustoExterno: 78000.00,
    prioridadeScore: 98,
    ordemServicoIds: ["OS2024101", "OS2023098", "OS2022015"]
  },
  {
    identificador: "E0017",
    modelo: "Raio X Móvel 3000",
    fabricante: "ImageRay",
    setor: "Radiologia",
    status: "Operacional",
    dataAquisicao: "2015-01-25",
    custo: 250000.00,
    totalCustoExterno: 3200.00,
    prioridadeScore: 85,
    ordemServicoIds: ["OS2025033"]
  },
  {
    identificador: "E0025",
    modelo: "Desfibrilador LifeSave",
    fabricante: "ElectroCare",
    setor: "UTI 1",
    status: "Operacional",
    dataAquisicao: "2011-06-10",
    custo: 18000.00,
    totalCustoExterno: 10500.00,
    prioridadeScore: 90,
    ordemServicoIds: ["OS2024090", "OS2023077"]
  },
  {
    identificador: "E0030",
    modelo: "Analisador Laboratorial",
    fabricante: "LabMaster",
    setor: "Laboratório",
    status: "Operacional",
    dataAquisicao: "2022-09-01",
    custo: 80000.00,
    totalCustoExterno: 0.00,
    prioridadeScore: 10,
    ordemServicoIds: []
  },
  {
    identificador: "E0035",
    modelo: "Foco Cirúrgico LED",
    fabricante: "LightPro",
    setor: "Centro Cirúrgico",
    status: "Operacional",
    dataAquisicao: "2020-05-12",
    custo: 28000.00,
    totalCustoExterno: 1500.00,
    prioridadeScore: 25,
    ordemServicoIds: ["OS2024060"]
  },
  {
    identificador: "E0041",
    modelo: "Cadeira de Rodas Motorizada",
    fabricante: "MoveEasy",
    setor: "Fisioterapia",
    status: "Operacional",
    dataAquisicao: "2023-02-14",
    custo: 5500.00,
    totalCustoExterno: 0.00,
    prioridadeScore: 5,
    ordemServicoIds: []
  }
];

