import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { CalculatedDoor } from "@/utils/types/DoorData";
import { ExtraProduct } from "@/utils/types/ExtraProduct";
/* eslint-disable jsx-a11y/alt-text */

interface BudgetPDFProps {
  doors: CalculatedDoor[];
  extraProducts: ExtraProduct[];
  sellerName: string;
  clientName: string;
  company: {
    name: string;
    cnpj: string;
    logo: string;
    phone: string;
    mail:string;
    site: string;
    address: string;
  };
  totalGeral: number;
  totalComDesconto: number;
  discount: number;
  dataHoje: string;
}

const styles = StyleSheet.create({
  page: {
    position: "relative",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 0,
    fontFamily: "Helvetica",
  },
  watermarkImage: {
    position: "absolute",
    top: "25%", // centraliza verticalmente
    left: "15%", // centraliza horizontalmente
    width: "70%", // ocupa boa parte da página
    opacity: 0.07, // bem translúcido
    transform: "rotate(-30deg)", // dá um toque estilizado
    zIndex: -1, // fica por trás do conteúdo
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  mainInfo: {
    padding: 24
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1f1d21", 
    padding: 12,
    borderRadius: 6,
    color: "#FFF",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyData: {
    fontSize: 10,
    color: "#e0e0e0",
    marginBottom: 1,
  },
  spanCompanyData: {
    fontWeight: "bold",
    color: "#ffa200",
  },
  clientInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    marginTop: 4
  },
  clientText: {
    fontSize: 12,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: 10,
    color: "#333",
    fontWeight: "normal",
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  headerRow: {
    backgroundColor: '#1f1d21',
    color: "#FFF"
  },
  footerRow: {
    backgroundColor: '#1f1d21',
    color: "#FFF"
  },
  headerCell: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    padding: 2,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 9,
    padding: 2,
    textAlign: 'center',
  },
  total: {
    marginVertical: 12,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
    color: "#ff6600",
  },
  logo: {
    width: 210,
    height: 105,
    objectFit: "contain",
    borderRadius: 4,
    border: "1pt solid #ffa200",
  },
  sectionTitle: {
    fontSize: 14,
    color: "#ff6600",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 4,
  },
  itemDetail: {
    fontSize: 10,
    marginBottom: 2,
  },
  signatureDiv: {
    marginTop: 50,
    fontSize: 10,
    textAlign: "center"
  },
  signatureText: {
    fontWeight: "bold"
  },
  footerStylish: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    bottom: 0,
    width: "100%",
    height: 30,
    backgroundColor: "linear-gradient(to bottom, #000000, #FFA500)"
  }, 
  footerText: {
    fontSize: 8,
    color: "#c1c1c1"
  }
});

export default function BudgetPDF({
  doors,
  extraProducts,
  sellerName,
  clientName,
  company,
  totalGeral,
  totalComDesconto,
  discount,
  dataHoje,
}: BudgetPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>       
        {/* Marca d'água */}
        {company.logo && (
          <Image src={company.logo} style={styles.watermarkImage} />
        )}

        <View style={styles.mainInfo}>
          {/* Título */}
          <Text style={styles.title}>Orçamento</Text>

          {/* Cabeçalho */}
          <View style={styles.header}>
            <View>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companyData}><Text style={styles.spanCompanyData}>CNPJ:</Text> {company.cnpj}</Text>
              <Text style={styles.companyData}><Text style={styles.spanCompanyData}>Telefone:</Text> {company.phone}</Text>
              <Text style={styles.companyData}><Text style={styles.spanCompanyData}>E-mail:</Text> {company.mail}</Text>
              <Text style={styles.companyData}><Text style={styles.spanCompanyData}>Site:</Text> {company.site}</Text>
              <Text style={styles.companyData}><Text style={styles.spanCompanyData}>Endereço:</Text> {company.address}</Text>
            </View>
            {company.logo && <Image src={company.logo} style={styles.logo} />}
          </View>

          {/* Dados do cliente */}
          <View style={styles.clientInfo}>
            <Text style={styles.clientText}>
              <Text style={styles.bold}>Vendedor:</Text> {sellerName}
            </Text> 
            <Text>|</Text>
            <Text style={styles.clientText}>
              <Text style={styles.bold}>Cliente:</Text> {clientName}
            </Text>
            <Text>|</Text>
            <Text style={styles.clientText}>
              <Text style={styles.bold}>Data:</Text> {dataHoje}
            </Text>
          </View>

          {/* Portas */}
          {doors.map((door, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              {/* Cabeçalho de cada porta */}
              <Text style={styles.sectionTitle}>
                0{door.quantity} un. -{" "}
                {door.productType === "kitSerralheiro" ? "Kit Serralheiro" : "Kit Instalado"}
                <Text style={styles.sectionSubtitle}>
                  {" "} | Medidas: {door.height.toFixed(2)}m x {door.width.toFixed(2)}m | Área do vão:{" "}
                  {door.area.toFixed(2)}m²
                </Text>
              </Text>
              {/* --- KIT INSTALADO --- */}
              {door.productType === "kitInstalado" ? (
                <View style={styles.table}>
                  <View style={[styles.row, styles.headerRow]}>
                    <Text style={styles.headerCell}>Produto</Text>
                    <Text style={styles.headerCell}>Qtd</Text>
                    <Text style={styles.headerCell}>Valor Unitário (R$)</Text>
                    <Text style={styles.headerCell}>Valor Total (R$)</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.cell}>
                      <Text>Porta de Enrolar Aut. - </Text>
                      <Text> com instalação - Motor de {door.motor}Kg ({door.motor?.toLowerCase().startsWith("ac") ? "s/ NoBreak" : "c/ NoBreak"})</Text>
                    </Text>
                    <Text style={styles.cell}>{door.quantity}</Text>
                    <Text style={styles.cell}>{(door.total / door.quantity).toFixed(2)}</Text>
                    <Text style={styles.cell}>{door.total.toFixed(2)}</Text>
                  </View>
                </View>
              ) : (
                /* --- KIT SERRALHEIRO --- */
                <View style={styles.table}>
                  <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.headerCell, { flex: 2 }]}>Descrição</Text>
                    <Text style={styles.headerCell}>Medidas</Text>
                    <Text style={styles.headerCell}>Valor Unitário (R$)</Text>
                    <Text style={styles.headerCell}>Valor Total (R$)</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 2 }]}>Lâmina ({door.laminaTransvision ? "Transvision" : "Lisa"})</Text>
                    <Text style={styles.cell}>{door.area.toFixed(2)} m²</Text>
                    <Text style={styles.cell}>{(door.priceLamina / door.area).toFixed(2)}</Text>
                    <Text style={styles.cell}>{(door.priceLamina ?? 0).toFixed(2)}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 2 }]}>Guia</Text>
                    <Text style={styles.cell}>{(door.height * 2).toFixed(2)} m</Text>
                    <Text style={styles.cell}>{(door.priceGuia ?? 0).toFixed(2)}</Text>
                    <Text style={styles.cell}>
                      {(door.height * 2 * (door.priceGuia ?? 0)).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 2 }]}>Soleira</Text>
                    <Text style={styles.cell}>{door.width.toFixed(2)} m</Text>
                    <Text style={styles.cell}>{(door.priceSoleira ?? 0).toFixed(2)}</Text>
                    <Text style={styles.cell}>
                      {(door.width * (door.priceSoleira ?? 0)).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 2 }]}>Eixo</Text>
                    <Text style={styles.cell}>{door.width.toFixed(2)} m</Text>
                    <Text style={styles.cell}>{(door.priceEixo ?? 0).toFixed(2)}</Text>
                    <Text style={styles.cell}>
                      {(door.width * (door.priceEixo ?? 0)).toFixed(2)}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={[styles.cell, { flex: 2 }]}>
                      Motor ({door.motor}) {door.engine ? `(${door.engine})` : ""}
                    </Text>
                    <Text style={styles.cell}>{door.quantity}</Text>
                    <Text style={styles.cell}>{(door.motorPrice ?? 0).toFixed(2)}</Text>
                    <Text style={styles.cell}>{(door.motorPrice ?? 0).toFixed(2)}</Text>
                  </View>
                  <View style={[styles.row, styles.footerRow]}>
                    <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>
                      Total da Porta
                    </Text>
                    <Text style={styles.cell}></Text>
                    <Text style={styles.cell}></Text>
                    <Text style={[styles.cell, { fontWeight: "bold" }]}>
                      R$ {door.total.toFixed(2)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Produtos adicionais */}
          {extraProducts.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Produtos Adicionais</Text>
              <View style={styles.table}>
                <View style={[styles.row, styles.headerRow]}>
                  <Text style={[styles.headerCell, { flex: 2 }]}>Produto</Text>
                  <Text style={styles.headerCell}>Qtd</Text>
                  <Text style={styles.headerCell}>Valor Unitário (R$)</Text>
                  <Text style={styles.headerCell}>Valor Total (R$)</Text>
                </View>
                {extraProducts.map((p, idx) => (
                  <View style={styles.row} key={idx}>
                    <Text style={[styles.cell, { flex: 2 }]}>{p.name}</Text>
                    <Text style={styles.cell}>{p.quantity}</Text>
                    <Text style={styles.cell}>{p.unitPrice.toFixed(2)}</Text>
                    <Text style={styles.cell}>{p.total.toFixed(2)}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
          {/* Totais */}
          <Text style={styles.total}>Total do Orçamento: R$ {totalGeral.toFixed(2)}</Text>
          {discount > 0 && (
            <Text style={styles.total}>
              Total à vista com {discount}% de desconto: R$ {totalComDesconto.toFixed(2)}
            </Text>
          )}
          {/* Campo de descrição */}
          <View style={styles.table}>
            <View style={[styles.row, styles.headerRow]}>
              <Text style={styles.headerCell}>Descrição</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cell}>
                {(() => {
                  const totalPortas = doors.reduce((acc, d) => acc + d.quantity, 0);

                  const temKitSerralheiro = doors.some(d => d.productType === "kitSerralheiro");
                  const temKitInstalado = doors.some(d => d.productType === "kitInstalado");

                  // Monta lista de materiais extras, se existirem
                  const extrasDescricao =
                    extraProducts.length > 0
                      ? ` Materiais adicionais incluídos: ${extraProducts
                          .map(p => `${p.quantity}x ${p.name}`)
                          .join(", ")}.`
                      : "";

                  if (temKitSerralheiro && !temKitInstalado) {
                    return `Fabricação de ${totalPortas} porta${totalPortas > 1 ? "s" : ""} — todas contendo tubo, lâminas, guias, soleira e motor.${extrasDescricao} Garantia de 1 ano dos motores.`;
                  }

                  if (temKitInstalado && !temKitSerralheiro) {
                    return `Fabricação e instalação de ${totalPortas} porta${totalPortas > 1 ? "s" : ""} — todas contendo tubo, lâminas, guias, soleira e motores.${extrasDescricao} Garantia de 1 ano do motor e da instalação.`;
                  }

                  if (temKitSerralheiro && temKitInstalado) {
                    return `Fabricação e/ou instalação de ${totalPortas} porta${totalPortas > 1 ? "s" : ""} — contendo tubo, lâminas, guias, soleira e motores.${extrasDescricao} Garantia de 1 ano conforme o tipo de kit.`;
                  }

                  return "Nenhuma porta cadastrada.";
                })()}
              </Text>
            </View>
          </View>


          {/*Campo de Assinatura */}
          <View style={styles.signatureDiv}>
            <Text style={styles.signatureText}>
              Atencionamente: S7 Portas Automáticas
            </Text>
          </View>
        </View>

          {/*Footer estilizado */}
          <View style={styles.footerStylish}>
            <Text style={styles.footerText}>
              Desenvolvido por @SanchezDev.Oficial
            </Text>
          </View>
        
      </Page>
    </Document>
  );
}
