import * as XLSX from "xlsx";

export function convertXLSXToStudents(binaryString) {

  const csvData = readXLSXFile(binaryString);
  return convertToStudentsRawData(csvData);
}

const readXLSXFile = (binaryString) => {
  const workbook = XLSX.read(binaryString, { type: 'binary', WTF: false });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(worksheet, { header: 1 });
}

const convertToStudentsRawData = (csvData) => {
  const csvHeader = csvData[0];
  return csvData.slice(1).map((row) =>
    row.reduce((student, value, key) => ({ ...student, [csvHeader[key]]: value }), {})
  );
}