import React from 'react';
import PropTypes from 'prop-types';
import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';

const CompanyPDF = ({ data }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{data.companyName} Annual Reports</Text>
            <Text style={styles.date}>Date: {currentDate}</Text>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.headerText}>Financial Data</Text>
            </View>
            {Object.entries(data).map(([key, value]) => (
              <View style={styles.tableRow} key={key}>
                <Text style={styles.attribute}>{key}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.footerContainer}>

            <Text style={styles.title}>InvestAI Team</Text>
            <Text style={styles.date}>Signature</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    flexGrow: 1,
  },
  titleContainer: {
    margin:" 4% 0 4% 0" ,
    fontSize:"14px"
  },
  footerContainer: {
    margin:" 4% 0 4% 60%" ,
    fontSize:"13px"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    marginTop:"1%" ,
  },
  tableContainer: {
    width: '100%',
    border: '1px solid #000000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #000000',
    padding: 5,
  },
  headerText: {
    flex: 1,
    fontWeight: '600',
    fontSize:"14px"
  },
  attribute: {
    flex: 1,
    textAlign: 'left',
    fontSize:"12px"
  },
  value: {
    flex: 1,
    textAlign: 'left',
    fontSize:"12px"
  },
});

CompanyPDF.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CompanyPDF;
