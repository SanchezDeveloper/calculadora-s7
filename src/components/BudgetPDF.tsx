import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { CalculatedDoor } from "@/utils/types/DoorData";
import { ExtraProduct } from "@/utils/types/ExtraProduct";
/* eslint-disable jsx-a11y/alt-text */

interface BudgetPDFProps {
  doors: CalculatedDoor[];
  extraProducts: ExtraProduct[];
  clientName: string;
  company: {
    name: string;
    cnpj: string;
    logo: string;
  };
  totalGeral: number;
  totalComDesconto: number;
  discount: number;
  dataHoje: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 24,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
    marginBottom: 16,
    textTransform: "uppercase",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  companyInfo: {
    alignItems: "flex-end",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  companyCNPJ: {
    fontSize: 10,
    color: "#000",
  },
  clientInfo: {
    marginBottom: 12,
  },
  clientText: {
    fontSize: 12,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ff6600",
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ff6600",
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#ff6600",
  },
  headerCell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
  cell: {
    flex: 1,
    padding: 6,
    fontSize: 10,
    color: "#000",
  },
  total: {
    marginTop: 12,
    textAlign: "right",
    fontSize: 12,
    fontWeight: "bold",
    color: "#ff6600",
  },
  logo: {
    width: 140,
    height: 70,
  },
});

export default function BudgetPDF({
  doors,
  extraProducts,
  clientName,
  company,
  totalGeral,
  totalComDesconto,
  discount,
  dataHoje,
}: BudgetPDFProps) {
  // Junta portas + extras em uma lista só
  const allItems = [
    ...doors.map((d) => ({
      name: d.productType,
      quantity: d.quantity,
      unitPrice: d.total / d.quantity,
      total: d.total,
    })),
    ...extraProducts.map((p) => ({
      name: p.name,
      quantity: p.quantity,
      unitPrice: p.unitPrice,
      total: p.total,
    })),
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Título */}
        <Text style={styles.title}>Orçamento</Text>

        {/* Cabeçalho */}
        <View style={styles.header}>
          {company.logo && <Image src={company.logo} style={styles.logo} />}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.companyCNPJ}>CNPJ: {company.cnpj}</Text>
          </View>
        </View>

        {/* Dados do cliente */}
        <View style={styles.clientInfo}>
          <Text style={styles.clientText}>
            <Text style={styles.bold}>Cliente:</Text> {clientName}
          </Text>
          <Text style={styles.clientText}>
            <Text style={styles.bold}>Data:</Text> {dataHoje}
          </Text>
        </View>

        {/* Tabela única */}
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.headerCell}>Produto</Text>
            <Text style={styles.headerCell}>Quantidade</Text>
            <Text style={styles.headerCell}>Valor Unitário (R$)</Text>
            <Text style={styles.headerCell}>Valor Total (R$)</Text>
          </View>

          {allItems.map((item, idx) => (
            <View style={styles.row} key={idx}>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.quantity}</Text>
              <Text style={styles.cell}>{item.unitPrice.toFixed(2)}</Text>
              <Text style={styles.cell}>{item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        {/* Totais */}
        <Text style={styles.total}>
          Total do Orçamento: R$ {totalGeral.toFixed(2)}
        </Text>

        {discount > 0 && (
          <Text style={styles.total}>
            Total à vista com {discount}% de desconto: R$ {totalComDesconto.toFixed(2)}
          </Text>
        )}
      </Page>
    </Document>
  );
}
